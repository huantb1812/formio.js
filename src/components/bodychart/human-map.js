import $ from 'jquery';

var constant = {
    human: {
        head: ['Brain', 'Ear', 'Eye', 'Face', 'Hair', 'Mouth', 'Nose', 'Throat', 'Head', 'Neck', 'Blood', 'Bones and Joints', 'Hormones', 'Jaw', 'Lymph nodes', 'Nerves and Nervous System', 'Skin'],
        chest: ['Back', 'Breast', 'Heart', 'Lungs', 'Spine', 'Thyroid', 'Blood', 'Bones and Joints', 'Hormones', 'Lymph nodes', 'Nerves and Nervous System', 'Skin'],
        abdomen: ['Appendix', 'Colon', 'Gallbladder', 'Kidney', 'Liver', 'Pancreas', 'Rectum', 'Stomach', 'Blood', 'Bones and Joints', 'Hormones', 'Lymph nodes', 'Nerves and Nervous System', 'Skin', 'Spleen'],
        arm: ['Elbow', 'Finger', 'Hand', 'Shoulder', 'Wrist', 'Blood', 'Bones and Joints', 'Hormones', 'Lymph nodes', 'Nerves and Nervous System', 'Skin'],
        pelvis: ['Bladder', 'Groin', 'Hip', 'Uterus', 'Blood', 'Bones and Joints', 'Hormones', 'Lymph nodes', 'Nerves and Nervous System', 'Skin'],
        legs: ['Ankle', 'Foot', 'Heel', 'Knee', 'Blood', 'Bones and Joints', 'Hormones', 'Lymph nodes', 'Nerves and Nervous System', 'Skin'],
        conditionsItems: {
            brain: ['Acoustic Neuroma (Vestibular Schwannoma)', 'Adult Hydrocephalus', 'Aortic Dissection ', 'Autism', 'Autistic Spectrum Disorder (Child)', 'Behaviour', 'Bonding With Your Child', 'Brain Aneurysm', 'Brain Scan', 'Brain Tumour Biopsy', 'Brain Tumours', 'Brain cancer', 'Cancer', 'Carotid Endarterectomy', 'Cerebral Aneurysm', 'Childhood Anxiety Disorders', 'Chronic Subdural Haematoma', 'Cognitive-Behavioural Therapy', 'Common Sleep Conditions in Infants, Children and Adolescents ', 'Computed Tomography (CT)', 'Confidence', 'Convulsion Without Fever', 'Decompressive Craniectomy', 'Dementia', 'Depression', 'Development', 'Epilepsy', 'Excessive Daytime Sleepiness', 'External Ventricular Drainage', 'Febrile Fit', 'Head Injury (Child)', 'Headaches', 'Insomnia', 'Intracerebral Hemorrhage', 'Intrathecal Drug Delivery', 'Jet Lag, Shift Work and Circadian Rhythm Disorders', 'Learning  ', 'Lumbar Puncture', 'Magnetic Resonance Imaging (MRI) Scan', 'Meningiomas', 'Metastatic Brain Tumours', 'Minimally Invasive Surgery (MIS) Procedures in Neurosurgery', 'Neurodevelopment in Babies', 'Neuropathic (Nerve) Pain Syndrome', 'Neurovascular', 'Obstructive Sleep Apnoea ', 'Obstructive Sleep Apnoea in Children', 'Parasomnias in Adults', 'Parasomnias in Children ', 'Parkinson Disease and Movement Disorders', 'Perinatal Depression', 'Pituitary Tumours', 'Play', 'Postnatal Depression', 'Radiofrequency Lesioning (Thermoablation) ', 'Restless Legs Syndrome and Periodic Limb Movements in Sleep', 'Senses  ', 'Skull Base', 'Sleep (Child)', 'Sleep Deprivation', 'Sleep Disorders', 'Sleep Physiology', 'Sleep-disordered Breathing and Snoring', 'Sleepwalking', 'Sleepy Driving', 'Stroke', 'Talk', 'Ventricular Peritoneal Shunt', 'Young Onset Cognitive Impairment (YOCI)'],
            ear: ['Acoustic Neuroma (Vestibular Schwannoma)', 'Acute Pharyngitis and Tonsillitis', 'Cochlear Implant', 'Ear Infections (Child)', 'Ear Objects', 'Ear Otitis Media  ', 'Earwax in Children', 'External Ear Infections - Otitis Externa', 'External Ear Infections - Pinna Infection', 'Hearing', 'Hearing Loss', 'Hearing Tests', 'Middle Ear Infections  - Chronic Suppurative Otitis Media', 'Middle Ear Infections - Acute Otitis Media', 'Minimally Invasive Surgery (MIS) Procedures in Otolaryngology (Ear, Nose and Throat)', 'Otitis Media with Effusion', 'Senses  ', 'Tinnitus', 'Travelling', 'Universal Newborn Hearing Screening'],
            eye: ['Aesthetic Eyelid Surgery (Blepharoplasty)', 'Age-related Macular Degeneration', 'Allergies (Child)', 'Amblyopia (Lazy Eye)', 'Anophthalmia, Microphthalmia, Post Enucleation Socket Syndrome (PESS) and Socket reconstruction ', 'Astigmatism', 'Blepharitis', 'Cataract', 'Central Serous Chorioretinopathy', 'Childhood Myopia', 'Conjunctivitis and Viral Conjunctivitis', 'Corneal Infections', 'Corneal Oedema', 'Diabetic Retinopathy', 'Double Vision (Diplopia)', 'Dry Eye Syndrome', 'Entropion', 'Epiblepharon', 'Epiretinal Membrane (Macular Pucker)', 'Floaters & Flashes', 'Glaucoma', 'Hyperopia (Long-sightedness)', 'Ischaemic Optic Neuropathy', 'Macular Hole', 'Myopia (Short-sightedness or Near-sightedness)', 'Myopic Maculopathy', 'Obstructive Jaundice', 'Ocular Inflammation and Immunology', 'Optic Neuritis', 'Orbital Tumours and Disorders', 'Presbyopia (Lao Hua)', 'Proliferative Vitreoretinopathy ', 'Pterygium', 'Retinal Detachment', 'Retinal Tear', 'Retinal Vascular Disorders', 'Retinopathy of Prematurity (ROP)', 'Sleepwalking', 'Spasms', 'Squints', 'Squints (Strabismus)', 'Tearing Disorders', 'Thyroid Eye Disease', 'Upper Eyelid Drooping (Ptosis)'],
            face: ['Cleft Lip and Palate', 'Cleft Lip and Palate in Children', 'Facial Pain', 'Facial Pain (Trigeminal Neuralgia) ', 'Functional Neurosurgery', 'Jaw Joint (Temporomandibular Joint) Surgery  ', 'Obstructive Sleep Apnea', 'Orthognathic Surgery'],
            hair: [],
            mouth: ['Acute Laryngotracheobrontis (ALTB) or Croup (Child)', 'Acute Pharyngitis and Tonsillitis', 'Bridges', 'Cleft Lip and Palate', 'Cleft Lip and Palate in Children', 'Convulsion Without Fever', 'Cough and Colds', 'Croup', 'Crowns', 'Crying', 'Dental Implant', 'Denture', 'Discoloured Teeth', 'Early Childhood Caries', 'Endodontic Surgery', 'Fillings', 'Fussy Eater', 'Gastrointestinal Tract Functions and Investigations', 'Hand Foot and Mouth Disease', 'Hemoptysis', 'Jaw Cysts and Tumours', 'Jaw Malalignment  ', 'Mouth Ulcers', 'Obstructive Sleep Apnea', 'Oral Cancers', 'Oropharyngeal Cancers', 'Orthognathic Surgery', 'Overweight', 'Radio-iodine (I-131) Treatment', 'Salivary Gland Infection/Inflammation (Sialedenitis)', 'Salivary Gland Tumours', 'Snoring in Children', 'Swallowing Difficulties', 'Talk', 'Temporomandibular Joint Disorder', 'Tonsil and Adenoids', 'Tooth Avulsion (Knocked-out Tooth)', 'Travelling', 'Veneers', 'Vitamin Supplements', 'Vomitting', 'Weaning'],
            nose: ['Acoustic Neuroma (Vestibular Schwannoma)', 'Allergic Rhinitis', 'Bronchiolitis', 'Cancer', 'Common Sleep Conditions in Infants, Children and Adolescents ', 'Cough and Colds', 'Croup', 'Crying', 'Epistaxis', 'Minimally Invasive Surgery (MIS) Procedures in Otolaryngology (Ear, Nose and Throat)', 'Nasal Polyps', 'Nasopharyngeal Cancer', 'Nose - Virtual Tour', 'Nosebleeds in Children  ', 'Obstructive Sleep Apnea', 'Obstructive Sleep Apnoea (OSA)', 'Obstructive Sleep Apnoea - Continuous Positive Airway Pressure Therapy', 'Obstructive Sleep Apnoea in Children', 'Oropharyngeal Cancers', 'Paranasal Sinus Tumours', 'Rhinitis', 'Senses  ', 'Sinusitis', 'Sleep (Child)', 'Sleep-disordered Breathing and Snoring', 'Snoring and Obstructive Sleep Apnoea (OSA)', 'Snoring in Children'],
            throat: ['Acoustic Neuroma (Vestibular Schwannoma)', 'Acute Laryngotracheobrontis (ALTB) or Croup (Child)', 'Acute Pharyngitis and Tonsillitis', 'Allergic Rhinitis', 'Cough and Colds', 'Croup', 'Crying', 'Dysphagia Difficulty in Swallowing', 'Enlarged Neck Lymph Nodes', 'Esophageal Cancer', 'Hemoptysis', 'Hypopharyngeal Cancers', 'Injuries (Child)', 'Larynx Cancer', 'Medical Nutrition Therapy for Swallowing Difficulty (Dysphagia)', 'Minimally Invasive Surgery (MIS) Procedures in Otolaryngology (Ear, Nose and Throat)', 'Neck Lumps', 'Obstructive Sleep Apnoea (OSA)', 'Odynophagia (Pain on Swallowing)', 'Oesophageal Cancer', 'Oral Cancers', 'Oropharyngeal Cancers', 'Salivary Gland Infection/Inflammation (Sialedenitis)', 'Salivary Gland Tumours', 'Snoring and Obstructive Sleep Apnoea (OSA)', 'Snoring in Children', 'Swallowing Difficulties', 'Throat - Virtual Tour', 'Thyroglossal Duct Cysts', 'Thyroid Cancer', 'Thyroid Nodules', 'Thyroid Nodules and Surgery', 'Tonsil and Adenoids', 'Voice Check', 'Voice Disorders - Acute and Chronic Laryngitis ', 'Voice Disorders - Muscle Tension Dysphonia', 'Voice Disorders - Vocal Fold Paralysis', 'Voice Disorders - Vocal Nodules, Polyps, Cysts and Tumours', 'Voice Hygiene'],
            head: ['Acute Pharyngitis and Tonsillitis', 'Brain cancer', 'Circadian Rhythm: Coping With Shift Work', 'Computed Tomography (CT)', 'Decompressive Craniectomy', 'Head Injury', 'Head Injury (Child)', 'Head and Neck Cancer', 'Head and Neck Reconstruction: Local Flaps', 'Head and Neck Reconstruction: Microsurgical Free Flaps  ', 'Head and Neck Reconstruction: Regional Flaps', 'Head and Neck Surgery', 'Headache in Children', 'Headaches', 'Nasopharyngeal Cancer', 'Neurotrauma', 'Plagiocephaly', 'Skin and Subcutaneous Lumps – Skin Cancers, Lipomas, Epidermoid Cysts', 'Sleep Disorders'],
            neck: ['Acute Pharyngitis and Tonsillitis', 'Allergies (Child)', 'Arthritis', 'Bone Mineral Density Scan (DEXA)', 'Bone Scan', 'Brain cancer', 'Carotid Endarterectomy', 'Computed Tomography (CT)', 'Head and Neck Cancer', 'Head and Neck Reconstruction: Local Flaps', 'Head and Neck Reconstruction: Microsurgical Free Flaps  ', 'Head and Neck Reconstruction: Regional Flaps', 'Head and Neck Surgery', 'Headaches', 'Hyperthyroidism', 'Hypothyroidism', 'Hypothyroidism (Child)', 'Larynx Cancer', 'Musculoskeletal Disorders and Office Ergonomics ', 'Nasopharyngeal Cancer', 'Neck Pain', 'Rheumatoid Arthritis', 'Skin and Subcutaneous Lumps – Skin Cancers, Lipomas, Epidermoid Cysts', 'Snoring and Obstructive Sleep Apnoea (OSA)', 'Thyroid Disorders', 'Thyroid Scan', 'Torticollis'],
            blood: ['Abnormal Blood Tests', 'Anaemia', 'Antenatal Screening For Human munodeficiency Virus (HIV', 'Antibiotics', 'Bleeding Tendency', 'Cancer', 'Chemotherapy', 'Cholesterol', 'Deep Vein Thrombosis', 'Dengue Fever', 'Dialysis', 'Dicopac Test', 'Febrile Fit', 'Fever', 'Hemoptysis', 'Hepatitis B', 'Lymphoedema', 'Menopause', 'Multiple Myeloma', 'Thalassaemia'],
            'bones and joints': ['Back Pain and Spine Deformity in Children and Adolescents', 'Cancer Pain', 'Chronic Back Pain', 'Injuries (Child)', 'Orthopaedic Problems in Children', 'Osteoporosis', 'Play', 'Sarcoma', 'Sport Injuries in Children '],
            hormones: [],
            jaw: ['Dental Implant', 'Early Childhood Caries', 'Obstructive Sleep Apnea', 'Orthognathic Surgery', 'Temporomandibular Joint Disorder'],
            'lymph nodes': ['Lymphoedema', 'Lymphoma'],
            'nerves and nervous system': ['Allergic Rhinitis', 'Circadian Rhythm: Coping With Shift Work', 'Depression', 'Insomnia', 'Jet Lag, Shift Work and Circadian Rhythm Disorders', 'Limit-Setting Type Behavioural Insomnia in Childhood (BIC)', 'Neuropathic (Nerve) Pain Syndrome', 'Neurostimulation (Spinal Cord Stimulation) ', 'Sleep Deprivation', 'Sleep Onset Association Type BIC', 'Sleep-disordered Breathing and Snoring', 'Sleepy Driving', 'Sympathetic Blocks'],
            skin: ['Allergies (Child)', 'Antibiotics', 'Dengue Fever', 'Eczema (Child)', 'Effective Obesity Management', 'Febrile Fit', 'Fever', 'Injuries (Child)', 'Intrathecal Drug Delivery', 'Jaundice', 'Obstructive Jaundice', 'Rheumatoid Arthritis', 'Skin Cancer', 'Skin Infections ', 'Skin and Subcutaneous Lumps – Skin Cancers, Lipomas, Epidermoid Cysts']
        }
    }
};

$.fn.extend({
    human: constant.human,
    check: (data) => {
        console.log('check', data);
        // return this.each(() => {
        //     this.checked = true;
        // });
    },
    uncheck: (data) => {
        console.log('uncheck', data);
        // return this.each(() => {
        //     this.checked = false;
        // });
    },
    render: (data) => {
        const human = constant.human;

        // this.renderStatelist(data);
        let statelist = '';
        var arrs = ['head', 'chest', 'abdomen', 'arm', 'pelvis', 'legs'];
        for (let k = 0; k < arrs.length; k++) {
            const key = arrs[k];
            for (let i = 0; i < human[key].length; i++) {
                statelist
                    += `<label class="item state-item ${key} " name="state_value" group_data="${key}" >
                            ${human[key][i]}
                        </label>`;
            }
        }
        $('.statelist').html(statelist);

        // this.renderConditions(data);
        let conditions = '';
        var arrs2 = ['brain', 'ear', 'face', 'hair', 'mouth', 'nose', 'throat', 'head', 'neck', 'blood', 'hormones', 'jaw', 'skin'];
        for (let k = 0; k < arrs2.length; k++) {
            const key = arrs2[k];
            for (let i = 0; i < human.conditionsItems[key].length; i++) {
                conditions
                    += `<label class="item condition-item ${key} " name="condition_value" group_data="${key}" >
                            ${human.conditionsItems[key][i]}
                        </label>`;
            }
        }
        $('.conditions').html(conditions);

        //fire event return data when click state item or condition item
        // $(`#${data.element.id} .item`).bind('click', { elementId: data.element.id }, (e) => {
        //     // click statelist item
        //     if (e.target.parentElement.classList.contains('statelist')) {
        //         e.target.parentElement.children.forEach(stateitem => {
        //             stateitem.classList.remove('actived');
        //         });
        //         e.target.classList.add('actived');
        //         $('.conditions .item.actived').classList.remove('actived');
        //     }

        //     // click statelist item
        //     if (e.target.parentElement.classList.contains('conditions')) {
        //         e.target.parentElement.children.forEach(stateitem => {
        //             stateitem.classList.remove('actived');
        //         });
        //         e.target.classList.add('actived');
        //     }

        //     var result = {
        //         statelist: $(`#${e.data.elementId} .statelist .item.actived`).innerText,
        //         conditions: $(`#${e.data.elementId} .conditions .item.actived`).innerText
        //     };
        // });
    }
});

function HumanMap(container, userConfig) {
    this.container = container;
    this.userConfig = userConfig;
    this.human = constant.human;
    this.statelistSelector = `${container} .statelist`;
    this.conditionsSelector = `${container} .conditions`;
    console.log('HumanMap');
}

HumanMap.prototype.defaultOption = {
    fillColor: 'ff0000',
    stroke: true,
    singleSelect: true,
    fillOpacity: 0.2,
    mapKey: 'data-state',
    onClick: (e) => {
        //hidden all item
        document.querySelectorAll(`${this.statelistSelector} .item`).forEach(option => {
            option.classList.add('visibility');
        });
        document.querySelectorAll(`${this.statelistSelector} .item.${e.key.toLowerCase()}`).forEach(option => {
            option.classList.remove('visibility');
            option.addEventListener('click', () => {
                const currentActived = document.querySelector(`${this.statelistSelector} .item.actived`);
                if (currentActived) {
                    currentActived.classList.remove('actived');
                }
                setTimeout(() => {
                    option.classList.add('actived');
                    const key = option.querySelector('input').value;
                    this.showMenuChild(key);
                }, 100);
            });
        });

        document.querySelectorAll(`${this.conditionsSelector} .item`).forEach(option => {
            option.classList.add('visibility');
        });
    },
};

HumanMap.prototype.showMenuChild = (event) => {
    document.querySelectorAll(`${this.conditionsSelector} .item`).forEach(item => {
        item.classList.add('visibility');
    });

    document.querySelectorAll(`${this.conditionsSelector} .item.${event.toLowerCase()}`).forEach(item => {
        item.classList.remove('visibility');
        item.addEventListener('click', () => {
            const currentActived = document.querySelector(`${this.conditionsSelector} .item .item.actived`);
            if (currentActived) {
                currentActived.classList.remove('actived');
            }
            setTimeout(() => {
                item.classList.add('actived');
            }, 100);
        });
    });
};

HumanMap.prototype.showMenuChild123 = (event) => {
    document.querySelectorAll(`${this.conditionsSelector} .item`).forEach(item => {
        item.classList.add('visibility');
    });

    document.querySelectorAll(`${this.conditionsSelector} .item.${event.toLowerCase()}`).forEach(item => {
        item.classList.remove('visibility');
        item.addEventListener('click', () => {
            const currentActived = document.querySelector(`${this.conditionsSelector} .item .item.actived`);
            if (currentActived) {
                currentActived.classList.remove('actived');
            }
            setTimeout(() => {
                item.classList.add('actived');
            }, 100);
        });
    });
};

HumanMap.prototype.renderStatelist = () => {
    let statelist = '';
    var arrs = ['head', 'chest', 'abdomen', 'arm', 'pelvis', 'legs'];
    for (let k = 0; k < arrs.length; k++) {
        const key = arrs[k];
        for (let i = 0; i < this.human[key].length; i++) {
            const t = this.renderTemplate('input', {
                input: {
                    type: 'input',
                    attr: {
                        type: 'radio',
                        name: 'state_value',
                        groupdata: key,
                        value: this.human[key][i],
                    }
                }
            });
            statelist += `<label class="item ${key} visibility">${t + this.human[key][i]}</label>`;
        }
    }
    return statelist;
};

HumanMap.prototype.renderConditions = () => {
    let conditions = '';
    var arrs = ['brain', 'ear', 'face', 'hair', 'mouth', 'nose', 'throat', 'head', 'neck', 'blood', 'hormones', 'jaw', 'skin'];
    for (let k = 0; k < arrs.length; k++) {
        const key = arrs[k];
        for (let i = 0; i < this.human.conditionsItems[key].length; i++) {
            const t = this.renderTemplate('input', {
                input: {
                    type: 'input',
                    attr: {
                        type: 'radio',
                        name: 'condition_value',
                        groupdata: key,
                        value: this.human.conditionsItems[key][i],
                    }
                }
            });
            conditions += `<label class="item ${key} visibility">${t + this.human.conditionsItems[key][i]}</label>`;
        }
    }
    return conditions;
};

exports.default = HumanMap;

