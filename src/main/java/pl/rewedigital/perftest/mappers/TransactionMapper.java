package pl.rewedigital.perftest.mappers;

import lombok.experimental.UtilityClass;
import pl.rewedigital.perftest.dto.TransactionResponse;
import pl.rewedigital.perftest.entity.TransactionEntity;

@UtilityClass
public class TransactionMapper {

    public static TransactionResponse mapToResponse(TransactionEntity transaction) {
        return new TransactionResponse(
                transaction.getId(),
                transaction.getAmount(),
                transaction.getCreatedAt(),
                transaction.getUpdatedAt(),
                WalletMapper.mapToResponse(transaction.getWallet()),
                PersonMapper.mapToResponse(transaction.getPerson())
        );
    }
}
