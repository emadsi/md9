// /controller/ReservationController.java
package com.md9.controller;

import com.md9.model.Reservation;
import com.md9.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping("/new")
    public Reservation createReservation(@RequestParam Reservation reservation) {
        return reservationService.createReservation(reservation);
    }

    @GetMapping("/all")
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @DeleteMapping("/cancel/{id}")
    public void cancelReservation(@PathVariable String id) {
        reservationService.cancelReservation(id);
    }

    @GetMapping("/available-slots")
    public ResponseEntity<List<String>> getAvailableTimeslots(@RequestParam("date") String date) {
        List<String> availableSlots = reservationService.getAvailableTimeslots(date);
        return ResponseEntity.ok(availableSlots);
    }
}