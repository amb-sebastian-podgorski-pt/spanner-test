package pl.rewedigital.perftest.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.rewedigital.perftest.dto.*;
import pl.rewedigital.perftest.service.PersonService;
import pl.rewedigital.perftest.service.TransactionService;
import pl.rewedigital.perftest.service.WalletService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/persons")
@RequiredArgsConstructor
public class PersonController {

    private final PersonService personService;
    private final WalletService walletService;
    private final TransactionService transactionService;

    @PostMapping
    public ResponseEntity<PersonResponse> createPerson(@RequestBody final PersonRequest personRequest) {
        return ResponseEntity.ok(personService.createPerson(personRequest));
    }

    @GetMapping("/{personId}/wallets")
    public ResponseEntity<List<WalletResponse>> getPersonWallets(@PathVariable final UUID personId) {
        return ResponseEntity.ok(personService.getWallets(personId));
    }

    @PostMapping("/{personId}/wallets")
    public ResponseEntity<WalletResponse> createWallet(@PathVariable final UUID personId, @RequestBody final WalletRequest walletRequest) {
        return ResponseEntity.ok(walletService.createWallet(personId, walletRequest));
    }

    @PostMapping("/{personId}/transactions")
    public ResponseEntity<TransactionResponse> createTransaction(@PathVariable final UUID personId, @RequestBody final TransactionRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(transactionService.createTransaction(personId, request));
    }
}