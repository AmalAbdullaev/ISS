package com.app.iss.domain;



import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import com.app.iss.domain.enumeration.VidStrahovaniya;

/**
 * A Record.
 */
@Entity
@Table(name = "record")
public class Record implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 10, max = 10)
    @Column(name = "id_dogovora", length = 10, nullable = false)
    private String idDogovora;

    @Enumerated(EnumType.STRING)
    @Column(name = "vid_strahovaniya")
    private VidStrahovaniya vidStrahovaniya;

    @Column(name = "strahovaya_summa")
    private Integer strahovayaSumma;

    @Column(name = "tarifnaya_stavka")
    private Integer tarifnayaStavka;

    @Column(name = "filial")
    private String filial;

    @Column(name = "strahovoy_platej")
    private Integer strahovoyPlatej;

    @Column(name = "procent")
    private Integer procent;

    @Column(name = "data_zaklucheniya")
    private ZonedDateTime dataZaklucheniya;

    @Column(name = "srok_istecheniya")
    private ZonedDateTime srokIstecheniya;

    @Column(name = "strahovoy_sluchay")
    private String strahovoySluchay;

    @Column(name = "stoimost_vgod")
    private Integer stoimostVgod;

    @NotNull
    @Size(min = 10, max = 10)
    @Column(name = "id_client", length = 10, nullable = false)
    private String idClient;

    @Column(name = "fio_client")
    private String fioClient;

    @Column(name = "passport_client")
    private String passportClient;

    @Column(name = "telephone_client")
    private String telephoneClient;

    @Column(name = "address_client")
    private String addressClient;

    @NotNull
    @Size(min = 10, max = 10)
    @Column(name = "kod_agent", length = 10, nullable = false)
    private String kodAgent;

    @Column(name = "fio_agent")
    private String fioAgent;

    @Column(name = "telephone_agent")
    private String telephoneAgent;

    @Column(name = "passport_agent")
    private String passportAgent;

    @Column(name = "address_agent")
    private String addressAgent;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdDogovora() {
        return idDogovora;
    }

    public Record idDogovora(String idDogovora) {
        this.idDogovora = idDogovora;
        return this;
    }

    public void setIdDogovora(String idDogovora) {
        this.idDogovora = idDogovora;
    }

    public VidStrahovaniya getVidStrahovaniya() {
        return vidStrahovaniya;
    }

    public Record vidStrahovaniya(VidStrahovaniya vidStrahovaniya) {
        this.vidStrahovaniya = vidStrahovaniya;
        return this;
    }

    public void setVidStrahovaniya(VidStrahovaniya vidStrahovaniya) {
        this.vidStrahovaniya = vidStrahovaniya;
    }

    public Integer getStrahovayaSumma() {
        return strahovayaSumma;
    }

    public Record strahovayaSumma(Integer strahovayaSumma) {
        this.strahovayaSumma = strahovayaSumma;
        return this;
    }

    public void setStrahovayaSumma(Integer strahovayaSumma) {
        this.strahovayaSumma = strahovayaSumma;
    }

    public Integer getTarifnayaStavka() {
        return tarifnayaStavka;
    }

    public Record tarifnayaStavka(Integer tarifnayaStavka) {
        this.tarifnayaStavka = tarifnayaStavka;
        return this;
    }

    public void setTarifnayaStavka(Integer tarifnayaStavka) {
        this.tarifnayaStavka = tarifnayaStavka;
    }

    public String getFilial() {
        return filial;
    }

    public Record filial(String filial) {
        this.filial = filial;
        return this;
    }

    public void setFilial(String filial) {
        this.filial = filial;
    }

    public Integer getStrahovoyPlatej() {
        return strahovoyPlatej;
    }

    public Record strahovoyPlatej(Integer strahovoyPlatej) {
        this.strahovoyPlatej = strahovoyPlatej;
        return this;
    }

    public void setStrahovoyPlatej(Integer strahovoyPlatej) {
        this.strahovoyPlatej = strahovoyPlatej;
    }

    public Integer getProcent() {
        return procent;
    }

    public Record procent(Integer procent) {
        this.procent = procent;
        return this;
    }

    public void setProcent(Integer procent) {
        this.procent = procent;
    }

    public ZonedDateTime getDataZaklucheniya() {
        return dataZaklucheniya;
    }

    public Record dataZaklucheniya(ZonedDateTime dataZaklucheniya) {
        this.dataZaklucheniya = dataZaklucheniya;
        return this;
    }

    public void setDataZaklucheniya(ZonedDateTime dataZaklucheniya) {
        this.dataZaklucheniya = dataZaklucheniya;
    }

    public ZonedDateTime getSrokIstecheniya() {
        return srokIstecheniya;
    }

    public Record srokIstecheniya(ZonedDateTime srokIstecheniya) {
        this.srokIstecheniya = srokIstecheniya;
        return this;
    }

    public void setSrokIstecheniya(ZonedDateTime srokIstecheniya) {
        this.srokIstecheniya = srokIstecheniya;
    }

    public String getStrahovoySluchay() {
        return strahovoySluchay;
    }

    public Record strahovoySluchay(String strahovoySluchay) {
        this.strahovoySluchay = strahovoySluchay;
        return this;
    }

    public void setStrahovoySluchay(String strahovoySluchay) {
        this.strahovoySluchay = strahovoySluchay;
    }

    public Integer getStoimostVgod() {
        return stoimostVgod;
    }

    public Record stoimostVgod(Integer stoimostVgod) {
        this.stoimostVgod = stoimostVgod;
        return this;
    }

    public void setStoimostVgod(Integer stoimostVgod) {
        this.stoimostVgod = stoimostVgod;
    }

    public String getIdClient() {
        return idClient;
    }

    public Record idClient(String idClient) {
        this.idClient = idClient;
        return this;
    }

    public void setIdClient(String idClient) {
        this.idClient = idClient;
    }

    public String getFioClient() {
        return fioClient;
    }

    public Record fioClient(String fioClient) {
        this.fioClient = fioClient;
        return this;
    }

    public void setFioClient(String fioClient) {
        this.fioClient = fioClient;
    }

    public String getPassportClient() {
        return passportClient;
    }

    public Record passportClient(String passportClient) {
        this.passportClient = passportClient;
        return this;
    }

    public void setPassportClient(String passportClient) {
        this.passportClient = passportClient;
    }

    public String getTelephoneClient() {
        return telephoneClient;
    }

    public Record telephoneClient(String telephoneClient) {
        this.telephoneClient = telephoneClient;
        return this;
    }

    public void setTelephoneClient(String telephoneClient) {
        this.telephoneClient = telephoneClient;
    }

    public String getAddressClient() {
        return addressClient;
    }

    public Record addressClient(String addressClient) {
        this.addressClient = addressClient;
        return this;
    }

    public void setAddressClient(String addressClient) {
        this.addressClient = addressClient;
    }

    public String getKodAgent() {
        return kodAgent;
    }

    public Record kodAgent(String kodAgent) {
        this.kodAgent = kodAgent;
        return this;
    }

    public void setKodAgent(String kodAgent) {
        this.kodAgent = kodAgent;
    }

    public String getFioAgent() {
        return fioAgent;
    }

    public Record fioAgent(String fioAgent) {
        this.fioAgent = fioAgent;
        return this;
    }

    public void setFioAgent(String fioAgent) {
        this.fioAgent = fioAgent;
    }

    public String getTelephoneAgent() {
        return telephoneAgent;
    }

    public Record telephoneAgent(String telephoneAgent) {
        this.telephoneAgent = telephoneAgent;
        return this;
    }

    public void setTelephoneAgent(String telephoneAgent) {
        this.telephoneAgent = telephoneAgent;
    }

    public String getPassportAgent() {
        return passportAgent;
    }

    public Record passportAgent(String passportAgent) {
        this.passportAgent = passportAgent;
        return this;
    }

    public void setPassportAgent(String passportAgent) {
        this.passportAgent = passportAgent;
    }

    public String getAddressAgent() {
        return addressAgent;
    }

    public Record addressAgent(String addressAgent) {
        this.addressAgent = addressAgent;
        return this;
    }

    public void setAddressAgent(String addressAgent) {
        this.addressAgent = addressAgent;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Record)) {
            return false;
        }
        return id != null && id.equals(((Record) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Record{" +
            "id=" + getId() +
            ", idDogovora='" + getIdDogovora() + "'" +
            ", vidStrahovaniya='" + getVidStrahovaniya() + "'" +
            ", strahovayaSumma=" + getStrahovayaSumma() +
            ", tarifnayaStavka=" + getTarifnayaStavka() +
            ", filial='" + getFilial() + "'" +
            ", strahovoyPlatej=" + getStrahovoyPlatej() +
            ", procent=" + getProcent() +
            ", dataZaklucheniya='" + getDataZaklucheniya() + "'" +
            ", srokIstecheniya='" + getSrokIstecheniya() + "'" +
            ", strahovoySluchay='" + getStrahovoySluchay() + "'" +
            ", stoimostVgod=" + getStoimostVgod() +
            ", idClient='" + getIdClient() + "'" +
            ", fioClient='" + getFioClient() + "'" +
            ", passportClient='" + getPassportClient() + "'" +
            ", telephoneClient='" + getTelephoneClient() + "'" +
            ", addressClient='" + getAddressClient() + "'" +
            ", kodAgent='" + getKodAgent() + "'" +
            ", fioAgent='" + getFioAgent() + "'" +
            ", telephoneAgent='" + getTelephoneAgent() + "'" +
            ", passportAgent='" + getPassportAgent() + "'" +
            ", addressAgent='" + getAddressAgent() + "'" +
            "}";
    }
}
