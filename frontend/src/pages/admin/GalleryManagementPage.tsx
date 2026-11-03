
import { useEffect, useState } from "react";
import "../../App.css";

export default function GalleryManagementPage() {
    const [activeTab, setActiveTab] = useState("All Media");
    const [galleryItems, setGalleryItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [galleryError, setGalleryError] = useState("");


    useEffect(() => {
        const fetchGallery = async () => {
            try {
                setIsLoading(true);
                setGalleryError("");

                const response = await fetch(
                    "http://localhost:5000/api/admin/gallery",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message || "Unable to load gallery media."
                    );
                }

                setGalleryItems(result.data || []);
            } catch (error) {
                console.error("Gallery loading error:", error);

                setGalleryError(
                    error instanceof Error
                        ? error.message
                        : "Something went wrong while loading the gallery."
                );
            } finally {
                setIsLoading(false);
            }
        };
        fetchGallery();
    }, []);

    const tabs = ["All Media", "Images", "Videos", "Published", "Drafts"];

    return (
        <div className="admin-gallery-page">
            <div className="admin-gallery-header">
                <div>
                    <p className="admin-eyebrow">CONTENT MANAGEMENT</p>
                    <h1>Gallery</h1>
                    <p>Manage the photographs and videos displayed on your website.</p>
                </div>

                <button className="admin-primary-button">
                    + Add Media
                </button>
            </div>

            <div className="admin-gallery-stats">
                <div className="admin-gallery-stat">
                    <span>Total Media</span>
                    <strong>0</strong>
                </div>

                <div className="admin-gallery-stat">
                    <span>Images</span>
                    <strong>0</strong>
                </div>

                <div className="admin-gallery-stat">
                    <span>Videos</span>
                    <strong>0</strong>
                </div>

                <div className="admin-gallery-stat">
                    <span>Published</span>
                    <strong>0</strong>
                </div>
            </div>

            <div className="admin-gallery-content">
                <div className="admin-gallery-tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={activeTab === tab ? "active" : ""}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab} (
                            {tab === "All Media"
                                ? galleryItems.length
                                : tab === "Images"
                                    ? galleryItems.filter((item) => item.media_type === "image").length
                                    : tab === "Videos"
                                        ? galleryItems.filter((item) => item.media_type === "video").length
                                        : tab === "Published"
                                            ? galleryItems.filter((item) => item.is_published === true).length
                                            : galleryItems.filter((item) => item.is_published === false).length}
                            )
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="admin-gallery-empty">
                        <p>Loading gallery media...</p>
                    </div>
                ) : galleryError ? (
                    <div className="admin-gallery-empty">
                        <p>{galleryError}</p>
                    </div>
                ) : galleryItems.filter((item) => {
                    if (activeTab === "All Media") return true;
                    if (activeTab === "Images") return item.media_type === "image";
                    if (activeTab === "Videos") return item.media_type === "video";
                    if (activeTab === "Published") return item.is_published === true;
                    if (activeTab === "Drafts") return item.is_published === false;
                    return true;
                }).length === 0 ? (
                    <div className="admin-gallery-empty">
                        <h3>
                            {activeTab === "All Media"
                                ? "No media added yet"
                                : `No ${activeTab.toLowerCase()} found`}
                        </h3>

                        <p>
                            {activeTab === "All Media"
                                ? "Your uploaded images and videos will appear here."
                                : "There are no gallery items in this category yet."}
                        </p>
                    </div>
                ) : (
                    <div className="admin-gallery-grid">
                        {galleryItems
                            .filter((item) => {
                                if (activeTab === "All Media") return true;
                                if (activeTab === "Images") return item.media_type === "image";
                                if (activeTab === "Videos") return item.media_type === "video";
                                if (activeTab === "Published") return item.is_published === true;
                                if (activeTab === "Drafts") return item.is_published === false;
                                return true;
                            })
                            .map((item) => (
                                <div className="admin-gallery-card" key={item.id}>
                                    {item.media_type === "video" ? (
                                        <video
                                            src={item.media_url}
                                            controls
                                            className="admin-gallery-card-media"
                                        />
                                    ) : (
                                        <img
                                            src={item.media_url}
                                            alt={item.title}
                                            className="admin-gallery-card-media"
                                        />
                                    )}

                                    <div className="admin-gallery-card-info">
                                        <h3>{item.title}</h3>
                                        <p>{item.category}</p>
                                        <span>
                                            {item.is_published ? "Published" : "Draft"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}
