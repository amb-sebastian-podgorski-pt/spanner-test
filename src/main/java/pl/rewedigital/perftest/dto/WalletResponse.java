package pl.rewedigital.perftest.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record WalletResponse(
    UUID id,
    String name,
    String currency,
    BigDecimal balance
) {
}