package com.md9.controller;

import com.md9.model.Cancellation;
import com.md9.repository.CancellationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/cancellations")
public class CancellationController {
    private final CancellationRepository cancellationRepository;

    @Autowired
    public CancellationController(CancellationRepository cancellationRepository) {
        this.cancellationRepository = cancellationRepository;
    }

    @GetMapping("/report")
    public List<Cancellation> generateCancellationsReport() {
        return cancellationRepository.findAll();
    }
}
