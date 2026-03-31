package com.thrsl.products_service;

import com.thrsl.products_service.model.Category;
import com.thrsl.products_service.model.SparePart;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private AuthClient authClient;

    // Hardcoded mock data for Future Tech Robotics
    private List<Category> categories = Arrays.asList(
        new Category("c1", "Humanoid Robots", "Advanced bipedal robots with AI integration", "humanoid.png"),
        new Category("c2", "UAV Drones", "High-speed and surveillance aerial vehicles", "drone.png"),
        new Category("c3", "Industrial Arms", "Precision robotic arms and cobots", "arm.png")
    );

    private List<SparePart> parts = Arrays.asList(
        new SparePart("p1", "c1", "Titanium Alloy Knee Joint", "Max Load 500kg, Zero Backlash", 1200.0, "joint.png"),
        new SparePart("p2", "c1", "AI Vision Sensor", "Stereo depth mapping, 120fps", 850.0, "vision.png"),
        new SparePart("p3", "c2", "Carbon Fiber Propeller Set", "Ultra lightweight, 10 inch", 150.0, "prop.png"),
        new SparePart("p4", "c2", "BLDC High-Torque Motor", "3000KV, 6S Lipo Support", 320.0, "motor.png"),
        new SparePart("p5", "c3", "Harmonic Drive Gearbox", "1:100 Ratio, High precision", 2100.0, "gearbox.png")
    );

    @GetMapping("/categories")
    public List<Category> getCategories() {
        return categories;
    }

    @GetMapping("/categories/{categoryId}/parts")
    public List<SparePart> getPartsByCategory(@PathVariable String categoryId) {
        return parts.stream()
                .filter(p -> p.getCategoryId().equals(categoryId))
                .collect(Collectors.toList());
    }

    @GetMapping("/status")
    public String getStatus() {
        String authStatus = authClient.getAuthStatus();
        return "Robotics Product Service is responding! 🤖 | Internal Call: [ " + authStatus + " ]";
    }
}
