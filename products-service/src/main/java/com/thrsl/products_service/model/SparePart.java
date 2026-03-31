package com.thrsl.products_service.model;

public class SparePart {
    private String id;
    private String categoryId;
    private String name;
    private String specs;
    private double price;
    private String imageUrl;

    public SparePart() {}

    public SparePart(String id, String categoryId, String name, String specs, double price, String imageUrl) {
        this.id = id;
        this.categoryId = categoryId;
        this.name = name;
        this.specs = specs;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getCategoryId() { return categoryId; }
    public void setCategoryId(String categoryId) { this.categoryId = categoryId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSpecs() { return specs; }
    public void setSpecs(String specs) { this.specs = specs; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
