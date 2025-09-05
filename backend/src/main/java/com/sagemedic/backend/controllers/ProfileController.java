package com.sagemedic.backend.controllers;

import com.sagemedic.backend.entities.Profile;
import com.sagemedic.backend.repository.ProfileRepository;
import com.sagemedic.backend.repository.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    private final ProfileService service;

    public ProfileController(ProfileService service){
        this.service = service;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getProfile(@PathVariable String userId){
        Optional<Profile> profile = service.getProfile(userId);
        return profile.isPresent() ? ResponseEntity.ok(profile.get()) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> createProfile(@RequestBody Profile profile){
        Optional<Profile> existing = service.getProfile(profile.getUserId());
        if(existing.isPresent()){
            return ResponseEntity.badRequest().body("Profile already exist");
        }

        return ResponseEntity.ok(service.createProfile(profile));
    }
}
