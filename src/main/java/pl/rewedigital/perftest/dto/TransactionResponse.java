package pl.rewedigital.perftest.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record TransactionResponse(
        UUID id,
        BigDecimal amount,
        Instant createdAt,
        Instant updatedAt,
        WalletResponse walletResponse,
        PersonResponse personResponse) {
}