package pl.rewedigital.perftest.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.rewedigital.perftest.dto.TransactionResponse;
import pl.rewedigital.perftest.dto.WalletRequest;
import pl.rewedigital.perftest.dto.WalletResponse;
import pl.rewedigital.perftest.service.WalletService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/wallets")
@RequiredArgsConstructor
public class WalletController {

    private final WalletService walletService;

    @PostMapping
    public ResponseEntity<WalletResponse> createWallet(@RequestBody final WalletRequest walletRequest) {
        return ResponseEntity.ok(walletService.createWallet(walletRequest));
    }

    @GetMapping("/{walletId}")
    public ResponseEntity<WalletResponse> getWalletById(@PathVariable final UUID walletId) {
        return ResponseEntity.ok(walletService.getWalletById(walletId));
    }

    @GetMapping("/{walletId}/transactions")
    public ResponseEntity<List<TransactionResponse>> getWalletTransactions(@PathVariable final UUID walletId) {
        return ResponseEntity.ok(walletService.getWalletTransactions(walletId));
    }
}