package pl.rewedigital.perftest.mappers;

import lombok.experimental.UtilityClass;
import pl.rewedigital.perftest.dto.WalletResponse;
import pl.rewedigital.perftest.entity.WalletEntity;

@UtilityClass
public class WalletMappers {

    public static WalletResponse mapToResponse(final WalletEntity wallet) {
        return new WalletResponse(wallet.getId(), wallet.getName(), wallet.getCurrency(), wallet.getBalance());
    }
}
