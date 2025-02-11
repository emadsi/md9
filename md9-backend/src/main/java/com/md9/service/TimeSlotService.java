package com.md9.service;

import com.md9.model.DisabledTimeslot;
import com.md9.model.Timeslot;
import com.md9.repository.DisabledTimeslotRepository;
import com.md9.repository.ReservationRepository;
import com.md9.repository.TimeslotRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class TimeslotService {
    @Autowired
    private TimeslotRepository timeslotRepository;

    @Autowired
    private DisabledTimeslotRepository disabledTimeslotRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    // public TimeslotService(TimeslotRepository timeslotRepository, DisabledTimeslotRepository disabledTimeslotRepository, ReservationRepository reservationRepository) {
    //     this.timeslotRepository = timeslotRepository;
    //     this.reservationRepository = reservationRepository;
    //     this.disabledTimeslotRepository = disabledTimeslotRepository;
    // }

    @Transactional
    public void addTimeslot(String from, String to, String fieldId) {
        LocalTime startTime = LocalTime.parse(from);
        LocalTime endTime = LocalTime.parse(to);
       

        // Fetch existing time slots and add the new one in order
        List<Timeslot> timeslots = timeslotRepository.findAll();
        Integer timeslotsLength = timeslots.size();
        timeslots.add(new Timeslot((timeslotsLength).toString(), startTime, endTime, fieldId));
        timeslots.sort((ts1, ts2) -> ts1.getStartTime().compareTo(ts2.getStartTime()));

        // Save updated time slots and update reservations
        for (int i = 0; i < timeslots.size(); i++) {
            timeslots.get(i).setId(String.format("%d", i + 1));
            timeslotRepository.save(timeslots.get(i));
        }

        // Update reservations collection
        for (int i = 0; i < timeslots.size(); i++) {
            reservationRepository.updateTimeslotIds(timeslots.get(i).getId(), String.format("%d", i + 1));
        }

        // for (int i = 0; i < timeslots.size(); i++) {
        //     timeslots.get(i).setId(String.valueOf(i + 1));
        //     timeslotRepository.save(timeslots.get(i));
        // }
    }

    @Transactional
    public void blockTimeslot(String timeslotId, LocalDate date) {
        DisabledTimeslot disabledTimeslot = new DisabledTimeslot(String.format("%d", disabledTimeslotRepository.findAll().size() + 1), timeslotId, date, "blocked");
        disabledTimeslotRepository.save(disabledTimeslot);
    }

    @Transactional
    public void blockAllTimeslots(LocalDate date) {
        List<Timeslot> timeslots = timeslotRepository.findAll();
        for (Timeslot timeslot : timeslots) {
            DisabledTimeslot disabledTimeslot = new DisabledTimeslot(String.format("%d", disabledTimeslotRepository.findAll().size() + 1), timeslot.getId(), date, "blocked");
            disabledTimeslotRepository.save(disabledTimeslot);
        }
    }

    // Fetch all time slots
    @Transactional
    public List<Timeslot> getAllTimeslots() {
        return timeslotRepository.findAll();
    }

    // Delete a time slot by ID
    @Transactional
    public void deleteTimeslot(String id) {
        timeslotRepository.deleteById(id);
    }
}
