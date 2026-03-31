package com.thrsl.auth_service;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private JwtService jwtService;

    @Value("${app.frontend-redirect-url:http://localhost:4200/oauth2/callback}")
    private String frontendRedirectUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        // Extract the email to use as the JWT subject
        String email = oAuth2User.getAttribute("email");

        // GitHub fallback: use login@github.com if email is null
        if (email == null) {
            email = oAuth2User.getAttribute("login") + "@github.com";
        }

        // Generate our internal JWT token
        String token = jwtService.generateToken(email);

        // Redirect to frontend with the token as a query parameter
        String targetUrl = frontendRedirectUrl + "?token=" + token;
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
