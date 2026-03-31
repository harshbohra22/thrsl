package com.thrsl.auth_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserCredentialRepository repository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // Determine the provider (google, github)
        String registrationId = userRequest.getClientRegistration().getRegistrationId().toUpperCase();

        // Extract email from OAuth2 attributes
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String providerId = oAuth2User.getAttribute("sub"); // Google uses "sub"

        // GitHub uses "id" as a number, not "sub"
        if ("GITHUB".equals(registrationId)) {
            providerId = String.valueOf(oAuth2User.getAttribute("id"));
            // GitHub doesn't always return email in the primary attributes
            if (email == null) {
                email = oAuth2User.getAttribute("login") + "@github.com";
            }
        }

        // Upsert: find existing user by email or create a new one
        Optional<UserCredential> existingUser = repository.findByEmail(email);
        if (existingUser.isEmpty()) {
            UserCredential newUser = new UserCredential();
            newUser.setName(name != null ? name : email);
            newUser.setEmail(email);
            newUser.setPassword(null); // Social users don't have a password
            newUser.setProvider(registrationId);
            newUser.setProviderId(providerId);
            repository.save(newUser);
        }

        return oAuth2User;
    }
}
