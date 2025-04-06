package pl.rewedigital.perftest.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.rewedigital.perftest.dto.TransactionRequest;
import pl.rewedigital.perftest.dto.TransactionResponse;
import pl.rewedigital.perftest.entity.PersonEntity;
import pl.rewedigital.perftest.entity.TransactionEntity;
import pl.rewedigital.perftest.entity.WalletEntity;
import pl.rewedigital.perftest.mappers.TransactionMapper;
import pl.rewedigital.perftest.repository.TransactionRepository;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final PersonService personService;
    private final TransactionRepository repository;

    @Transactional
    public TransactionResponse createTransaction(UUID personId, TransactionRequest request) {
        final PersonEntity person = personService.getPersonById(personId);
        final WalletEntity wallet = person.getWallets().stream()
                .filter(it -> it.getCurrency().equals(request.currency()))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);

        wallet.setBalance(wallet.getBalance().add(request.amount()));

        final TransactionEntity transaction = repository.save(buildTransaction(request, wallet, person));
        return TransactionMapper.mapToResponse(transaction);
    }

    private static TransactionEntity buildTransaction(TransactionRequest request, WalletEntity currentWallet, PersonEntity person) {
        final TransactionEntity transaction = new TransactionEntity();
        transaction.setAmount(request.amount());
        transaction.setWallet(currentWallet);
        transaction.setPerson(person);
        transaction.setCurrency(request.currency());
        return transaction;
    }
}
