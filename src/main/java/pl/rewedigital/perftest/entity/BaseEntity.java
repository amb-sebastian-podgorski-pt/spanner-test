package pl.rewedigital.perftest.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@SuperBuilder
@MappedSuperclass
public class BaseEntity {

    public BaseEntity() {
        this.id = UUID.randomUUID();
    }

    @Id
    // @JdbcTypeCode(Types.VARCHAR)
    private UUID id;

    @CreatedDate
    @Column(updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column
    private Instant updatedAt;

    @Version
    private Long version;

    @PrePersist
    public void prePersist() {
        createdAt = Instant.now();
        updatedAt = Instant.now();

    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = Instant.now();
    }
}