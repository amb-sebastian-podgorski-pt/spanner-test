package pl.rewedigital.perftest.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.rewedigital.perftest.dto.TransactionRequest;
import pl.rewedigital.perftest.dto.TransactionResponse;
import pl.rewedigital.perftest.service.TransactionService;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping
    public ResponseEntity<TransactionResponse> create(@RequestBody final TransactionRequest request) {
        return ResponseEntity.ok(transactionService.create(request));
    }

}