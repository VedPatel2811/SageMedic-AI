package com.sagemedic.backend.repository;

import com.sagemedic.backend.entities.Profile;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {
    private final ProfileRepository repository;

    public ProfileService(ProfileRepository repository){
        this.repository = repository;
    }

    public Optional<Profile> getProfile(String userId){
        return repository.findByUserId(userId);
    }

    public Profile createProfile(Profile profile){
        return repository.save(profile);
    }
}
