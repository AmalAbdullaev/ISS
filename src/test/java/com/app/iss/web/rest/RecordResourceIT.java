package com.app.iss.web.rest;

import com.app.iss.IssApp;
import com.app.iss.domain.Record;
import com.app.iss.repository.RecordRepository;
import com.app.iss.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.app.iss.web.rest.TestUtil.sameInstant;
import static com.app.iss.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.app.iss.domain.enumeration.VidStrahovaniya;
/**
 * Integration tests for the {@Link RecordResource} REST controller.
 */
@SpringBootTest(classes = IssApp.class)
public class RecordResourceIT {

    private static final String DEFAULT_ID_DOGOVORA = "AAAAAAAAAA";
    private static final String UPDATED_ID_DOGOVORA = "BBBBBBBBBB";

    private static final VidStrahovaniya DEFAULT_VID_STRAHOVANIYA = VidStrahovaniya.LIFE;
    private static final VidStrahovaniya UPDATED_VID_STRAHOVANIYA = VidStrahovaniya.MEDICAL;

    private static final Integer DEFAULT_STRAHOVAYA_SUMMA = 1;
    private static final Integer UPDATED_STRAHOVAYA_SUMMA = 2;

    private static final Integer DEFAULT_TARIFNAYA_STAVKA = 1;
    private static final Integer UPDATED_TARIFNAYA_STAVKA = 2;

    private static final String DEFAULT_FILIAL = "AAAAAAAAAA";
    private static final String UPDATED_FILIAL = "BBBBBBBBBB";

    private static final Integer DEFAULT_STRAHOVOY_PLATEJ = 1;
    private static final Integer UPDATED_STRAHOVOY_PLATEJ = 2;

    private static final Integer DEFAULT_PROCENT = 1;
    private static final Integer UPDATED_PROCENT = 2;

    private static final ZonedDateTime DEFAULT_DATA_ZAKLUCHENIYA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATA_ZAKLUCHENIYA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_SROK_ISTECHENIYA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_SROK_ISTECHENIYA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_STRAHOVOY_SLUCHAY = "AAAAAAAAAA";
    private static final String UPDATED_STRAHOVOY_SLUCHAY = "BBBBBBBBBB";

    private static final Integer DEFAULT_STOIMOST_VGOD = 1;
    private static final Integer UPDATED_STOIMOST_VGOD = 2;

    private static final String DEFAULT_ID_CLIENT = "AAAAAAAAAA";
    private static final String UPDATED_ID_CLIENT = "BBBBBBBBBB";

    private static final String DEFAULT_FIO_CLIENT = "AAAAAAAAAA";
    private static final String UPDATED_FIO_CLIENT = "BBBBBBBBBB";

    private static final String DEFAULT_PASSPORT_CLIENT = "AAAAAAAAAA";
    private static final String UPDATED_PASSPORT_CLIENT = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE_CLIENT = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE_CLIENT = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_CLIENT = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_CLIENT = "BBBBBBBBBB";

    private static final String DEFAULT_KOD_AGENT = "AAAAAAAAAA";
    private static final String UPDATED_KOD_AGENT = "BBBBBBBBBB";

    private static final String DEFAULT_FIO_AGENT = "AAAAAAAAAA";
    private static final String UPDATED_FIO_AGENT = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE_AGENT = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE_AGENT = "BBBBBBBBBB";

    private static final String DEFAULT_PASSPORT_AGENT = "AAAAAAAAAA";
    private static final String UPDATED_PASSPORT_AGENT = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_AGENT = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_AGENT = "BBBBBBBBBB";

    @Autowired
    private RecordRepository recordRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restRecordMockMvc;

    private Record record;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RecordResource recordResource = new RecordResource(recordRepository);
        this.restRecordMockMvc = MockMvcBuilders.standaloneSetup(recordResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Record createEntity(EntityManager em) {
        Record record = new Record()
            .idDogovora(DEFAULT_ID_DOGOVORA)
            .vidStrahovaniya(DEFAULT_VID_STRAHOVANIYA)
            .strahovayaSumma(DEFAULT_STRAHOVAYA_SUMMA)
            .tarifnayaStavka(DEFAULT_TARIFNAYA_STAVKA)
            .filial(DEFAULT_FILIAL)
            .strahovoyPlatej(DEFAULT_STRAHOVOY_PLATEJ)
            .procent(DEFAULT_PROCENT)
            .dataZaklucheniya(DEFAULT_DATA_ZAKLUCHENIYA)
            .srokIstecheniya(DEFAULT_SROK_ISTECHENIYA)
            .strahovoySluchay(DEFAULT_STRAHOVOY_SLUCHAY)
            .stoimostVgod(DEFAULT_STOIMOST_VGOD)
            .idClient(DEFAULT_ID_CLIENT)
            .fioClient(DEFAULT_FIO_CLIENT)
            .passportClient(DEFAULT_PASSPORT_CLIENT)
            .telephoneClient(DEFAULT_TELEPHONE_CLIENT)
            .addressClient(DEFAULT_ADDRESS_CLIENT)
            .kodAgent(DEFAULT_KOD_AGENT)
            .fioAgent(DEFAULT_FIO_AGENT)
            .telephoneAgent(DEFAULT_TELEPHONE_AGENT)
            .passportAgent(DEFAULT_PASSPORT_AGENT)
            .addressAgent(DEFAULT_ADDRESS_AGENT);
        return record;
    }

    @BeforeEach
    public void initTest() {
        record = createEntity(em);
    }

    @Test
    @Transactional
    public void createRecord() throws Exception {
        int databaseSizeBeforeCreate = recordRepository.findAll().size();

        // Create the Record
        restRecordMockMvc.perform(post("/api/records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(record)))
            .andExpect(status().isCreated());

        // Validate the Record in the database
        List<Record> recordList = recordRepository.findAll();
        assertThat(recordList).hasSize(databaseSizeBeforeCreate + 1);
        Record testRecord = recordList.get(recordList.size() - 1);
        assertThat(testRecord.getIdDogovora()).isEqualTo(DEFAULT_ID_DOGOVORA);
        assertThat(testRecord.getVidStrahovaniya()).isEqualTo(DEFAULT_VID_STRAHOVANIYA);
        assertThat(testRecord.getStrahovayaSumma()).isEqualTo(DEFAULT_STRAHOVAYA_SUMMA);
        assertThat(testRecord.getTarifnayaStavka()).isEqualTo(DEFAULT_TARIFNAYA_STAVKA);
        assertThat(testRecord.getFilial()).isEqualTo(DEFAULT_FILIAL);
        assertThat(testRecord.getStrahovoyPlatej()).isEqualTo(DEFAULT_STRAHOVOY_PLATEJ);
        assertThat(testRecord.getProcent()).isEqualTo(DEFAULT_PROCENT);
        assertThat(testRecord.getDataZaklucheniya()).isEqualTo(DEFAULT_DATA_ZAKLUCHENIYA);
        assertThat(testRecord.getSrokIstecheniya()).isEqualTo(DEFAULT_SROK_ISTECHENIYA);
        assertThat(testRecord.getStrahovoySluchay()).isEqualTo(DEFAULT_STRAHOVOY_SLUCHAY);
        assertThat(testRecord.getStoimostVgod()).isEqualTo(DEFAULT_STOIMOST_VGOD);
        assertThat(testRecord.getIdClient()).isEqualTo(DEFAULT_ID_CLIENT);
        assertThat(testRecord.getFioClient()).isEqualTo(DEFAULT_FIO_CLIENT);
        assertThat(testRecord.getPassportClient()).isEqualTo(DEFAULT_PASSPORT_CLIENT);
        assertThat(testRecord.getTelephoneClient()).isEqualTo(DEFAULT_TELEPHONE_CLIENT);
        assertThat(testRecord.getAddressClient()).isEqualTo(DEFAULT_ADDRESS_CLIENT);
        assertThat(testRecord.getKodAgent()).isEqualTo(DEFAULT_KOD_AGENT);
        assertThat(testRecord.getFioAgent()).isEqualTo(DEFAULT_FIO_AGENT);
        assertThat(testRecord.getTelephoneAgent()).isEqualTo(DEFAULT_TELEPHONE_AGENT);
        assertThat(testRecord.getPassportAgent()).isEqualTo(DEFAULT_PASSPORT_AGENT);
        assertThat(testRecord.getAddressAgent()).isEqualTo(DEFAULT_ADDRESS_AGENT);
    }

    @Test
    @Transactional
    public void createRecordWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = recordRepository.findAll().size();

        // Create the Record with an existing ID
        record.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecordMockMvc.perform(post("/api/records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(record)))
            .andExpect(status().isBadRequest());

        // Validate the Record in the database
        List<Record> recordList = recordRepository.findAll();
        assertThat(recordList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkIdDogovoraIsRequired() throws Exception {
        int databaseSizeBeforeTest = recordRepository.findAll().size();
        // set the field null
        record.setIdDogovora(null);

        // Create the Record, which fails.

        restRecordMockMvc.perform(post("/api/records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(record)))
            .andExpect(status().isBadRequest());

        List<Record> recordList = recordRepository.findAll();
        assertThat(recordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIdClientIsRequired() throws Exception {
        int databaseSizeBeforeTest = recordRepository.findAll().size();
        // set the field null
        record.setIdClient(null);

        // Create the Record, which fails.

        restRecordMockMvc.perform(post("/api/records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(record)))
            .andExpect(status().isBadRequest());

        List<Record> recordList = recordRepository.findAll();
        assertThat(recordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkKodAgentIsRequired() throws Exception {
        int databaseSizeBeforeTest = recordRepository.findAll().size();
        // set the field null
        record.setKodAgent(null);

        // Create the Record, which fails.

        restRecordMockMvc.perform(post("/api/records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(record)))
            .andExpect(status().isBadRequest());

        List<Record> recordList = recordRepository.findAll();
        assertThat(recordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRecords() throws Exception {
        // Initialize the database
        recordRepository.saveAndFlush(record);

        // Get all the recordList
        restRecordMockMvc.perform(get("/api/records?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(record.getId().intValue())))
            .andExpect(jsonPath("$.[*].idDogovora").value(hasItem(DEFAULT_ID_DOGOVORA.toString())))
            .andExpect(jsonPath("$.[*].vidStrahovaniya").value(hasItem(DEFAULT_VID_STRAHOVANIYA.toString())))
            .andExpect(jsonPath("$.[*].strahovayaSumma").value(hasItem(DEFAULT_STRAHOVAYA_SUMMA)))
            .andExpect(jsonPath("$.[*].tarifnayaStavka").value(hasItem(DEFAULT_TARIFNAYA_STAVKA)))
            .andExpect(jsonPath("$.[*].filial").value(hasItem(DEFAULT_FILIAL.toString())))
            .andExpect(jsonPath("$.[*].strahovoyPlatej").value(hasItem(DEFAULT_STRAHOVOY_PLATEJ)))
            .andExpect(jsonPath("$.[*].procent").value(hasItem(DEFAULT_PROCENT)))
            .andExpect(jsonPath("$.[*].dataZaklucheniya").value(hasItem(sameInstant(DEFAULT_DATA_ZAKLUCHENIYA))))
            .andExpect(jsonPath("$.[*].srokIstecheniya").value(hasItem(sameInstant(DEFAULT_SROK_ISTECHENIYA))))
            .andExpect(jsonPath("$.[*].strahovoySluchay").value(hasItem(DEFAULT_STRAHOVOY_SLUCHAY.toString())))
            .andExpect(jsonPath("$.[*].stoimostVgod").value(hasItem(DEFAULT_STOIMOST_VGOD)))
            .andExpect(jsonPath("$.[*].idClient").value(hasItem(DEFAULT_ID_CLIENT.toString())))
            .andExpect(jsonPath("$.[*].fioClient").value(hasItem(DEFAULT_FIO_CLIENT.toString())))
            .andExpect(jsonPath("$.[*].passportClient").value(hasItem(DEFAULT_PASSPORT_CLIENT.toString())))
            .andExpect(jsonPath("$.[*].telephoneClient").value(hasItem(DEFAULT_TELEPHONE_CLIENT.toString())))
            .andExpect(jsonPath("$.[*].addressClient").value(hasItem(DEFAULT_ADDRESS_CLIENT.toString())))
            .andExpect(jsonPath("$.[*].kodAgent").value(hasItem(DEFAULT_KOD_AGENT.toString())))
            .andExpect(jsonPath("$.[*].fioAgent").value(hasItem(DEFAULT_FIO_AGENT.toString())))
            .andExpect(jsonPath("$.[*].telephoneAgent").value(hasItem(DEFAULT_TELEPHONE_AGENT.toString())))
            .andExpect(jsonPath("$.[*].passportAgent").value(hasItem(DEFAULT_PASSPORT_AGENT.toString())))
            .andExpect(jsonPath("$.[*].addressAgent").value(hasItem(DEFAULT_ADDRESS_AGENT.toString())));
    }
    
    @Test
    @Transactional
    public void getRecord() throws Exception {
        // Initialize the database
        recordRepository.saveAndFlush(record);

        // Get the record
        restRecordMockMvc.perform(get("/api/records/{id}", record.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(record.getId().intValue()))
            .andExpect(jsonPath("$.idDogovora").value(DEFAULT_ID_DOGOVORA.toString()))
            .andExpect(jsonPath("$.vidStrahovaniya").value(DEFAULT_VID_STRAHOVANIYA.toString()))
            .andExpect(jsonPath("$.strahovayaSumma").value(DEFAULT_STRAHOVAYA_SUMMA))
            .andExpect(jsonPath("$.tarifnayaStavka").value(DEFAULT_TARIFNAYA_STAVKA))
            .andExpect(jsonPath("$.filial").value(DEFAULT_FILIAL.toString()))
            .andExpect(jsonPath("$.strahovoyPlatej").value(DEFAULT_STRAHOVOY_PLATEJ))
            .andExpect(jsonPath("$.procent").value(DEFAULT_PROCENT))
            .andExpect(jsonPath("$.dataZaklucheniya").value(sameInstant(DEFAULT_DATA_ZAKLUCHENIYA)))
            .andExpect(jsonPath("$.srokIstecheniya").value(sameInstant(DEFAULT_SROK_ISTECHENIYA)))
            .andExpect(jsonPath("$.strahovoySluchay").value(DEFAULT_STRAHOVOY_SLUCHAY.toString()))
            .andExpect(jsonPath("$.stoimostVgod").value(DEFAULT_STOIMOST_VGOD))
            .andExpect(jsonPath("$.idClient").value(DEFAULT_ID_CLIENT.toString()))
            .andExpect(jsonPath("$.fioClient").value(DEFAULT_FIO_CLIENT.toString()))
            .andExpect(jsonPath("$.passportClient").value(DEFAULT_PASSPORT_CLIENT.toString()))
            .andExpect(jsonPath("$.telephoneClient").value(DEFAULT_TELEPHONE_CLIENT.toString()))
            .andExpect(jsonPath("$.addressClient").value(DEFAULT_ADDRESS_CLIENT.toString()))
            .andExpect(jsonPath("$.kodAgent").value(DEFAULT_KOD_AGENT.toString()))
            .andExpect(jsonPath("$.fioAgent").value(DEFAULT_FIO_AGENT.toString()))
            .andExpect(jsonPath("$.telephoneAgent").value(DEFAULT_TELEPHONE_AGENT.toString()))
            .andExpect(jsonPath("$.passportAgent").value(DEFAULT_PASSPORT_AGENT.toString()))
            .andExpect(jsonPath("$.addressAgent").value(DEFAULT_ADDRESS_AGENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRecord() throws Exception {
        // Get the record
        restRecordMockMvc.perform(get("/api/records/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRecord() throws Exception {
        // Initialize the database
        recordRepository.saveAndFlush(record);

        int databaseSizeBeforeUpdate = recordRepository.findAll().size();

        // Update the record
        Record updatedRecord = recordRepository.findById(record.getId()).get();
        // Disconnect from session so that the updates on updatedRecord are not directly saved in db
        em.detach(updatedRecord);
        updatedRecord
            .idDogovora(UPDATED_ID_DOGOVORA)
            .vidStrahovaniya(UPDATED_VID_STRAHOVANIYA)
            .strahovayaSumma(UPDATED_STRAHOVAYA_SUMMA)
            .tarifnayaStavka(UPDATED_TARIFNAYA_STAVKA)
            .filial(UPDATED_FILIAL)
            .strahovoyPlatej(UPDATED_STRAHOVOY_PLATEJ)
            .procent(UPDATED_PROCENT)
            .dataZaklucheniya(UPDATED_DATA_ZAKLUCHENIYA)
            .srokIstecheniya(UPDATED_SROK_ISTECHENIYA)
            .strahovoySluchay(UPDATED_STRAHOVOY_SLUCHAY)
            .stoimostVgod(UPDATED_STOIMOST_VGOD)
            .idClient(UPDATED_ID_CLIENT)
            .fioClient(UPDATED_FIO_CLIENT)
            .passportClient(UPDATED_PASSPORT_CLIENT)
            .telephoneClient(UPDATED_TELEPHONE_CLIENT)
            .addressClient(UPDATED_ADDRESS_CLIENT)
            .kodAgent(UPDATED_KOD_AGENT)
            .fioAgent(UPDATED_FIO_AGENT)
            .telephoneAgent(UPDATED_TELEPHONE_AGENT)
            .passportAgent(UPDATED_PASSPORT_AGENT)
            .addressAgent(UPDATED_ADDRESS_AGENT);

        restRecordMockMvc.perform(put("/api/records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRecord)))
            .andExpect(status().isOk());

        // Validate the Record in the database
        List<Record> recordList = recordRepository.findAll();
        assertThat(recordList).hasSize(databaseSizeBeforeUpdate);
        Record testRecord = recordList.get(recordList.size() - 1);
        assertThat(testRecord.getIdDogovora()).isEqualTo(UPDATED_ID_DOGOVORA);
        assertThat(testRecord.getVidStrahovaniya()).isEqualTo(UPDATED_VID_STRAHOVANIYA);
        assertThat(testRecord.getStrahovayaSumma()).isEqualTo(UPDATED_STRAHOVAYA_SUMMA);
        assertThat(testRecord.getTarifnayaStavka()).isEqualTo(UPDATED_TARIFNAYA_STAVKA);
        assertThat(testRecord.getFilial()).isEqualTo(UPDATED_FILIAL);
        assertThat(testRecord.getStrahovoyPlatej()).isEqualTo(UPDATED_STRAHOVOY_PLATEJ);
        assertThat(testRecord.getProcent()).isEqualTo(UPDATED_PROCENT);
        assertThat(testRecord.getDataZaklucheniya()).isEqualTo(UPDATED_DATA_ZAKLUCHENIYA);
        assertThat(testRecord.getSrokIstecheniya()).isEqualTo(UPDATED_SROK_ISTECHENIYA);
        assertThat(testRecord.getStrahovoySluchay()).isEqualTo(UPDATED_STRAHOVOY_SLUCHAY);
        assertThat(testRecord.getStoimostVgod()).isEqualTo(UPDATED_STOIMOST_VGOD);
        assertThat(testRecord.getIdClient()).isEqualTo(UPDATED_ID_CLIENT);
        assertThat(testRecord.getFioClient()).isEqualTo(UPDATED_FIO_CLIENT);
        assertThat(testRecord.getPassportClient()).isEqualTo(UPDATED_PASSPORT_CLIENT);
        assertThat(testRecord.getTelephoneClient()).isEqualTo(UPDATED_TELEPHONE_CLIENT);
        assertThat(testRecord.getAddressClient()).isEqualTo(UPDATED_ADDRESS_CLIENT);
        assertThat(testRecord.getKodAgent()).isEqualTo(UPDATED_KOD_AGENT);
        assertThat(testRecord.getFioAgent()).isEqualTo(UPDATED_FIO_AGENT);
        assertThat(testRecord.getTelephoneAgent()).isEqualTo(UPDATED_TELEPHONE_AGENT);
        assertThat(testRecord.getPassportAgent()).isEqualTo(UPDATED_PASSPORT_AGENT);
        assertThat(testRecord.getAddressAgent()).isEqualTo(UPDATED_ADDRESS_AGENT);
    }

    @Test
    @Transactional
    public void updateNonExistingRecord() throws Exception {
        int databaseSizeBeforeUpdate = recordRepository.findAll().size();

        // Create the Record

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRecordMockMvc.perform(put("/api/records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(record)))
            .andExpect(status().isBadRequest());

        // Validate the Record in the database
        List<Record> recordList = recordRepository.findAll();
        assertThat(recordList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRecord() throws Exception {
        // Initialize the database
        recordRepository.saveAndFlush(record);

        int databaseSizeBeforeDelete = recordRepository.findAll().size();

        // Delete the record
        restRecordMockMvc.perform(delete("/api/records/{id}", record.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Record> recordList = recordRepository.findAll();
        assertThat(recordList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Record.class);
        Record record1 = new Record();
        record1.setId(1L);
        Record record2 = new Record();
        record2.setId(record1.getId());
        assertThat(record1).isEqualTo(record2);
        record2.setId(2L);
        assertThat(record1).isNotEqualTo(record2);
        record1.setId(null);
        assertThat(record1).isNotEqualTo(record2);
    }
}
