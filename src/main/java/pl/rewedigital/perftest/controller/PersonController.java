package pl.rewedigital.perftest.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.rewedigital.perftest.dto.PersonRequest;
import pl.rewedigital.perftest.dto.PersonResponse;
import pl.rewedigital.perftest.dto.WalletResponse;
import pl.rewedigital.perftest.service.PersonService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/persons")
@RequiredArgsConstructor
public class PersonController {

    private final PersonService personService;

    @PostMapping
    public ResponseEntity<PersonResponse> createPerson(@RequestBody final PersonRequest personRequest) {
        return ResponseEntity.ok(personService.createPerson(personRequest));
    }

    @GetMapping("/{personId}/wallets")
    public ResponseEntity<List<WalletResponse>> getPersonWallets(@PathVariable final UUID personId) {
        return ResponseEntity.ok(personService.getWallets(personId));
    }
}