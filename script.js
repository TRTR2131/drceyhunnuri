const menuButton = document.getElementById("menuButton");
const navbar = document.getElementById("navbar");
const siteHeader = document.getElementById("siteHeader");


// TELEFON MENÜSÜ

menuButton.addEventListener("click", () => {

    const isOpen = menuButton.classList.toggle("open");
    navbar.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
});


// MENÜDEN BİR YERE BASINCA MENÜYÜ KAPAT

const menuLinks = document.querySelectorAll("#navbar a");

menuLinks.forEach(link => {

    link.addEventListener("click", () => {

        menuButton.classList.remove("open");
        navbar.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");

    });

});


// AŞAĞI KAYDIRINCA HEADER EFEKTİ

window.addEventListener("scroll", () => {

    if (window.scrollY > 20) {
        siteHeader.classList.add("scrolled");
    } else {
        siteHeader.classList.remove("scrolled");
    }

});


// SAYFA AÇILMA ANİMASYONU

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }

    });

}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    observer.observe(element);
});


// FOOTER YILI

document.getElementById("year").textContent =
    new Date().getFullYear();




// RANDEVU TARİHİ: GEÇMİŞ TARİH SEÇİLEMEZ
const appointmentDate = document.getElementById("date");

if (appointmentDate) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    appointmentDate.min = `${year}-${month}-${day}`;
}

// ================================
// RANDEVU WHATSAPP FORMU
// ================================

const appointmentForm = document.getElementById("appointmentForm");

// TEST WHATSAPP NUMARASI
const whatsappNumber = "905349309880";

const appointmentModal =
    document.getElementById("appointmentModal");

const appointmentPreview =
    document.getElementById("appointmentPreview");

const appointmentModalClose =
    document.getElementById("appointmentModalClose");

const appointmentModalBackdrop =
    document.getElementById("appointmentModalBackdrop");

const appointmentEditButton =
    document.getElementById("appointmentEditButton");

const appointmentConfirmButton =
    document.getElementById("appointmentConfirmButton");

let pendingWhatsappURL = "";


function closeAppointmentModal() {

    appointmentModal.classList.remove("show");

    appointmentModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove("modal-open");

}


if (appointmentForm) {

    appointmentForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const appointmentType =
            document.getElementById("appointmentType").value;

        const date =
            document.getElementById("date").value;

        const time =
            document.getElementById("time").value;

        const note =
            document.getElementById("note").value.trim();

        const consent =
            document.getElementById("consent");

        if (!consent.checked) {

            alert(
                "Devam etmek için iletişim bilgilerinizin WhatsApp üzerinden gönderilmesini kabul etmeniz gerekiyor."
            );

            return;
        }

        const cleanPhone =
            phone.replace(/\D/g, "");

        if (cleanPhone.length < 10) {

            alert(
                "Lütfen geçerli bir telefon numarası girin."
            );

            return;
        }

        const formattedDate = date
            ? date.split("-").reverse().join(".")
            : "Belirtilmedi";

        const message =
`Merhaba,

*RANDEVU TALEBİ*
------------------------------

*Ad Soyad:* ${name}
*Telefon:* ${phone}
*Randevu Türü:* ${appointmentType}
*Tercih Edilen Tarih:* ${formattedDate}
*Tercih Edilen Saat:* ${time}
*Not:* ${note || "Belirtilmedi"}

------------------------------

Uygunluk durumuna göre dönüş sağlayabilir misiniz?

Teşekkür ederim.`;

        pendingWhatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);

        appointmentPreview.innerHTML = `
            <div class="preview-row">
                <span>Ad Soyad</span>
                <strong>${name}</strong>
            </div>

            <div class="preview-row">
                <span>Telefon</span>
                <strong>${phone}</strong>
            </div>

            <div class="preview-row">
                <span>Randevu Türü</span>
                <strong>${appointmentType}</strong>
            </div>

            <div class="preview-row">
                <span>Tarih</span>
                <strong>${formattedDate}</strong>
            </div>

            <div class="preview-row">
                <span>Saat</span>
                <strong>${time}</strong>
            </div>

            <div class="preview-row">
                <span>Not</span>
                <strong>${note || "Belirtilmedi"}</strong>
            </div>
        `;

        appointmentModal.classList.add("show");

        appointmentModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add("modal-open");

    });

}


if (appointmentConfirmButton) {

    appointmentConfirmButton.addEventListener(
        "click",
        () => {

            if (!pendingWhatsappURL) {
                return;
            }

            const toastMessage =
                document.getElementById("toastMessage");

            closeAppointmentModal();

            toastMessage.classList.add("show");

            setTimeout(() => {

                window.open(
                    pendingWhatsappURL,
                    "_blank",
                    "noopener,noreferrer"
                );

                toastMessage.classList.remove("show");

            }, 350);

        }
    );

}


[
    appointmentModalClose,
    appointmentModalBackdrop,
    appointmentEditButton
].forEach(element => {

    if (element) {

        element.addEventListener(
            "click",
            closeAppointmentModal
        );

    }

});


document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        appointmentModal &&
        appointmentModal.classList.contains("show")
    ) {

        closeAppointmentModal();

    }

});


// HENÜZ BAĞLANTI EKLENMEMİŞ BUTONLAR
// Gerçek YouTube / Instagram linkleri eklendiğinde bu kısım kaldırılabilir.

const placeholderLinks = document.querySelectorAll(
    '.content-link[href="#"], .social-button[href="#"]'
);

placeholderLinks.forEach(link => {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        alert("Bu bağlantı henüz eklenmedi.");

    });

});


// ================================
// SIK SORULAN SORULAR
// ================================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {

        const isOpen = item.classList.contains("open");

        faqItems.forEach(otherItem => {

            otherItem.classList.remove("open");

            const otherAnswer =
                otherItem.querySelector(".faq-answer");

            otherAnswer.style.maxHeight = null;

        });

        if (!isOpen) {

            item.classList.add("open");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});


// ================================
// AKTİF MENÜ VE YUKARI ÇIK
// ================================

const backToTop = document.getElementById("backToTop");

const sectionIds = [
    "anasayfa",
    "hakkimda",
    "hizmetler",
    "videolar",
    "icerikler",
    "yorumlar",
    "konum",
    "sss",
    "iletisim"
];

const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

const navAnchors = document.querySelectorAll("#navbar a");


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 140;

    let currentId = "anasayfa";

    sections.forEach(section => {

        if (scrollPosition >= section.offsetTop) {
            currentId = section.id;
        }

    });

    navAnchors.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentId) {
            link.classList.add("active");
        }

    });

}


window.addEventListener("scroll", () => {

    updateActiveNavigation();

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


updateActiveNavigation();


// ================================
// V13 SAYFA YÜKLENME VE ADRES KOPYALAMA
// ================================

const pageLoader =
    document.getElementById("pageLoader");

window.addEventListener("load", () => {

    setTimeout(() => {

        if (pageLoader) {
            pageLoader.classList.add("hide");
        }

    }, 250);

});


const copyAddressButton =
    document.getElementById("copyAddressButton");

if (copyAddressButton) {

    copyAddressButton.addEventListener("click", async () => {

        const address =
            copyAddressButton.dataset.address;

        try {

            await navigator.clipboard.writeText(address);

            const oldText =
                copyAddressButton.textContent;

            copyAddressButton.textContent =
                "Adres Kopyalandı";

            setTimeout(() => {

                copyAddressButton.textContent =
                    oldText;

            }, 1600);

        } catch (error) {

            alert(
                "Adres: " + address
            );

        }

    });

}


// ================================
// V15 RANDEVU FORMU GELISTIRMELERI
// ================================

const appointmentName =
    document.getElementById("name");

const appointmentPhone =
    document.getElementById("phone");

const appointmentTypeField =
    document.getElementById("appointmentType");

const appointmentTime =
    document.getElementById("time");

const appointmentNote =
    document.getElementById("note");

const appointmentConsent =
    document.getElementById("consent");

const formProgressFill =
    document.getElementById("formProgressFill");

const formProgressText =
    document.getElementById("formProgressText");

const noteCounter =
    document.getElementById("noteCounter");

const clearAppointmentForm =
    document.getElementById("clearAppointmentForm");


// TELEFON NUMARASINI 0 5XX XXX XX XX FORMATINA GETIR

function formatTurkishPhone(value) {

    let digits =
        value.replace(/\D/g, "");

    if (digits.startsWith("90")) {
        digits = "0" + digits.slice(2);
    }

    digits = digits.slice(0, 11);

    if (!digits) {
        return "";
    }

    const parts = [];

    if (digits.length >= 1) {
        parts.push(digits.slice(0, 1));
    }

    if (digits.length > 1) {
        parts.push(digits.slice(1, 4));
    }

    if (digits.length > 4) {
        parts.push(digits.slice(4, 7));
    }

    if (digits.length > 7) {
        parts.push(digits.slice(7, 9));
    }

    if (digits.length > 9) {
        parts.push(digits.slice(9, 11));
    }

    return parts.join(" ");

}


if (appointmentPhone) {

    appointmentPhone.addEventListener("input", () => {

        appointmentPhone.value =
            formatTurkishPhone(
                appointmentPhone.value
            );

        updateAppointmentProgress();

    });

}


// NOT KARAKTER SAYACI

function updateNoteCounter() {

    if (!appointmentNote || !noteCounter) {
        return;
    }

    noteCounter.textContent =
        appointmentNote.value.length +
        " / 300";

}


if (appointmentNote) {

    appointmentNote.addEventListener(
        "input",
        updateNoteCounter
    );

}


// FORM DOLULUK ORANI

function fieldIsComplete(field) {

    if (!field) {
        return false;
    }

    if (field.type === "checkbox") {
        return field.checked;
    }

    if (field.id === "phone") {

        const phoneDigits =
            field.value.replace(/\D/g, "");

        return phoneDigits.length === 11;
    }

    return field.value.trim() !== "";

}


function updateAppointmentProgress() {

    const progressFields = [
        appointmentName,
        appointmentPhone,
        appointmentTypeField,
        appointmentDate,
        appointmentTime,
        appointmentConsent
    ];

    const completed =
        progressFields.filter(
            fieldIsComplete
        ).length;

    const percentage =
        Math.round(
            (completed / progressFields.length) * 100
        );

    if (formProgressFill) {
        formProgressFill.style.width =
            percentage + "%";
    }

    if (formProgressText) {
        formProgressText.textContent =
            percentage + "%";
    }

    progressFields.forEach(field => {

        if (!field || field.type === "checkbox") {
            return;
        }

        field.classList.toggle(
            "valid-field",
            fieldIsComplete(field)
        );

    });

}


[
    appointmentName,
    appointmentTypeField,
    appointmentDate,
    appointmentTime,
    appointmentConsent
].forEach(field => {

    if (!field) {
        return;
    }

    field.addEventListener(
        "input",
        updateAppointmentProgress
    );

    field.addEventListener(
        "change",
        updateAppointmentProgress
    );

});


// FORMU TEMIZLE

if (clearAppointmentForm && appointmentForm) {

    clearAppointmentForm.addEventListener(
        "click",
        () => {

            const shouldClear =
                confirm(
                    "Randevu formundaki tüm bilgileri temizlemek istiyor musunuz?"
                );

            if (!shouldClear) {
                return;
            }

            appointmentForm.reset();

            if (appointmentDate) {

                const today =
                    new Date();

                const year =
                    today.getFullYear();

                const month =
                    String(
                        today.getMonth() + 1
                    ).padStart(2, "0");

                const day =
                    String(
                        today.getDate()
                    ).padStart(2, "0");

                appointmentDate.min =
                    `${year}-${month}-${day}`;

            }

            updateNoteCounter();
            updateAppointmentProgress();

            appointmentName.focus();

        }
    );

}


updateNoteCounter();
updateAppointmentProgress();


// ================================
// V16 ACIK / KOYU TEMA
// ================================

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");

const themeColorMeta =
    document.querySelector('meta[name="theme-color"]');


function applyTheme(theme) {

    const dark =
        theme === "dark";

    document.body.classList.toggle(
        "dark-mode",
        dark
    );

    if (themeIcon) {
        themeIcon.textContent =
            dark ? "☀" : "☾";
    }

    if (themeToggle) {

        themeToggle.setAttribute(
            "aria-label",
            dark
                ? "Açık temaya geç"
                : "Koyu temaya geç"
        );

        themeToggle.title =
            dark
                ? "Açık temaya geç"
                : "Koyu temaya geç";
    }

    if (themeColorMeta) {
        themeColorMeta.setAttribute(
            "content",
            dark ? "#0b1820" : "#1783c2"
        );
    }

}


const savedTheme =
    localStorage.getItem(
        "ceyhunNuriTheme"
    );

const systemPrefersDark =
    window.matchMedia &&
    window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

const initialTheme =
    savedTheme ||
    (
        systemPrefersDark
            ? "dark"
            : "light"
    );

applyTheme(initialTheme);


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const newTheme =
                document.body.classList.contains(
                    "dark-mode"
                )
                    ? "light"
                    : "dark";

            localStorage.setItem(
                "ceyhunNuriTheme",
                newTheme
            );

            applyTheme(newTheme);

        }
    );

}


// ================================
// V18 GIZLILIK VE SCROLL PROGRESS
// ================================

const scrollProgressBar =
    document.getElementById("scrollProgressBar");

function updateScrollProgress() {

    if (!scrollProgressBar) {
        return;
    }

    const scrollTop = window.scrollY;

    const scrollableHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        scrollableHeight > 0
            ? Math.min(
                100,
                Math.max(
                    0,
                    (scrollTop / scrollableHeight) * 100
                )
            )
            : 0;

    scrollProgressBar.style.width =
        percentage + "%";
}

window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);

window.addEventListener(
    "resize",
    updateScrollProgress
);

updateScrollProgress();


const privacyModal =
    document.getElementById("privacyModal");

const privacyModalBackdrop =
    document.getElementById("privacyModalBackdrop");

const privacyModalClose =
    document.getElementById("privacyModalClose");

const privacyUnderstoodButton =
    document.getElementById("privacyUnderstoodButton");

const openPrivacyFooter =
    document.getElementById("openPrivacyFooter");

const openPrivacyFromConsent =
    document.getElementById("openPrivacyFromConsent");


function openPrivacyModal() {

    if (!privacyModal) {
        return;
    }

    privacyModal.classList.add("show");
    privacyModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}


function closePrivacyModal() {

    if (!privacyModal) {
        return;
    }

    privacyModal.classList.remove("show");
    privacyModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}


[
    openPrivacyFooter,
    openPrivacyFromConsent
].forEach(button => {

    if (button) {
        button.addEventListener(
            "click",
            openPrivacyModal
        );
    }
});


[
    privacyModalBackdrop,
    privacyModalClose,
    privacyUnderstoodButton
].forEach(element => {

    if (element) {
        element.addEventListener(
            "click",
            closePrivacyModal
        );
    }
});


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            privacyModal &&
            privacyModal.classList.contains("show")
        ) {
            closePrivacyModal();
        }
    }
);


// ================================
// V19 VIDEO KARTLARI
// ================================
// YouTube embed kısıtları nedeniyle
// videolar güvenli kart yapısı ile açılır.
// İleride haftalık yeni videolar bu alana eklenebilir.


// ================================
// V24 DIL SISTEMI
// ================================
const translations = {
  "tr": {
    "services_kicker": "HİZMETLER",
    "services_title": "Başlıca değerlendirme alanları",
    "services_desc": "Sık karşılaşılan kas-iskelet, romatizmal ve metabolik sağlık konularına yönelik değerlendirme ve bilgilendirme.",
    "appointment_link": "Randevu Talebi →",
    "s1_title": "Ankilozan Spondilit",
    "s1_desc": "Omurga ve leğen kemiği arasındaki eklemleri etkileyebilen romatizmal süreçler hakkında değerlendirme.",
    "s2_title": "Baş Ağrısı ve Migren",
    "s2_desc": "Tekrarlayan baş ağrısı ve migren şikayetlerinde öykü, tetikleyiciler ve genel durumun değerlendirilmesi.",
    "s3_title": "Bel ve Sırt Ağrısı",
    "s3_desc": "Bel, sırt ve omurga kaynaklı ağrıların nedenlerine yönelik genel değerlendirme ve yaşam önerileri.",
    "s4_title": "Fibromiyalji",
    "s4_desc": "Yaygın kas ağrısı, yorgunluk, hassasiyet ve uyku sorunlarıyla seyreden yakınmaların değerlendirilmesi.",
    "s5_title": "Hasta Bina Sendromu",
    "s5_desc": "Kapalı ortamlarla ilişkili baş ağrısı, yorgunluk ve benzeri şikayetlerin çevresel etkenlerle birlikte değerlendirilmesi.",
    "s6_title": "Huzursuz Bacak Sendromu",
    "s6_desc": "Bacaklarda hareket ettirme isteği, huzursuzluk ve uyku düzenini etkileyen yakınmaların değerlendirilmesi.",
    "s7_title": "İltihabi Bağırsak Hastalıkları",
    "s7_desc": "Crohn hastalığı ve ülseratif kolit gibi iltihabi bağırsak hastalıklarında genel değerlendirme ve bilgilendirme.",
    "s8_title": "Kronik Yorgunluk",
    "s8_desc": "Uzun süren yorgunluk, enerji kaybı ve günlük yaşam performansını etkileyen yakınmaların değerlendirilmesi.",
    "s9_title": "Romatoid Artrit",
    "s9_desc": "Eklem iltihabı, şişlik ve tutuklukla seyreden romatoid artrit sürecinde genel değerlendirme.",
    "s10_title": "Tip 2 Diyabet",
    "s10_desc": "Kan şekeri kontrolü, yaşam alışkanlıkları ve metabolik sağlıkla ilgili genel değerlendirme ve bilgilendirme.",
    "reviews_kicker": "DEĞERLİ YORUMLAR",
    "reviews_title": "Deneyimlerinizi önemsiyoruz",
    "reviews_desc": "Gerçek hasta yorumları izin alındıkça bu alanda paylaşılacaktır.",
    "review_placeholder_1": "Onaylı hasta yorumu eklendiğinde burada yayınlanacaktır.",
    "review_placeholder_2": "Hasta mahremiyeti korunarak yalnızca izin verilen yorumlar paylaşılacaktır.",
    "review_placeholder_3": "Gerçek yorumlar daha sonra bu karta eklenebilir.",
    "verified_label": "Onaylı yorum alanı",
    "privacy_label": "Mahremiyet odaklı",
    "coming_label": "Yakında"
  },
  "en": {
    "services_kicker": "SERVICES",
    "services_title": "Main areas of evaluation",
    "services_desc": "Evaluation and information for common musculoskeletal, rheumatic and metabolic health concerns.",
    "appointment_link": "Request Appointment →",
    "s1_title": "Ankylosing Spondylitis",
    "s1_desc": "Evaluation of rheumatic processes that may affect the spine and sacroiliac joints.",
    "s2_title": "Headache & Migraine",
    "s2_desc": "Assessment of recurring headaches and migraine with attention to history, triggers and overall condition.",
    "s3_title": "Low Back & Back Pain",
    "s3_desc": "General evaluation and lifestyle guidance for pain originating from the lower back, back and spine.",
    "s4_title": "Fibromyalgia",
    "s4_desc": "Evaluation of widespread muscle pain, fatigue, tenderness and sleep-related complaints.",
    "s5_title": "Sick Building Syndrome",
    "s5_desc": "Assessment of headaches, fatigue and similar complaints that may be associated with indoor environments.",
    "s6_title": "Restless Legs Syndrome",
    "s6_desc": "Evaluation of discomfort, urge to move the legs and symptoms affecting sleep.",
    "s7_title": "Inflammatory Bowel Diseases",
    "s7_desc": "General evaluation and information regarding conditions such as Crohn’s disease and ulcerative colitis.",
    "s8_title": "Chronic Fatigue",
    "s8_desc": "Evaluation of prolonged fatigue, low energy and complaints affecting daily performance.",
    "s9_title": "Rheumatoid Arthritis",
    "s9_desc": "General evaluation of rheumatoid arthritis with joint inflammation, swelling and stiffness.",
    "s10_title": "Type 2 Diabetes",
    "s10_desc": "General evaluation and information on blood glucose control, lifestyle and metabolic health.",
    "reviews_kicker": "VALUABLE FEEDBACK",
    "reviews_title": "We value your experience",
    "reviews_desc": "Real patient feedback will be published here only with permission.",
    "review_placeholder_1": "Verified patient feedback will appear here when available.",
    "review_placeholder_2": "Only feedback shared with permission will be published while protecting patient privacy.",
    "review_placeholder_3": "Real feedback can be added to this card later.",
    "verified_label": "Verified feedback area",
    "privacy_label": "Privacy focused",
    "coming_label": "Coming soon"
  },
  "de": {
    "services_kicker": "LEISTUNGEN",
    "services_title": "Wichtige Untersuchungsbereiche",
    "services_desc": "Bewertung und Information zu häufigen muskuloskelettalen, rheumatischen und metabolischen Beschwerden.",
    "appointment_link": "Termin anfragen →",
    "s1_title": "Morbus Bechterew",
    "s1_desc": "Beurteilung rheumatischer Prozesse, die Wirbelsäule und Iliosakralgelenke betreffen können.",
    "s2_title": "Kopfschmerzen & Migräne",
    "s2_desc": "Beurteilung wiederkehrender Kopfschmerzen und Migräne unter Berücksichtigung von Verlauf und Auslösern.",
    "s3_title": "Kreuz- & Rückenschmerzen",
    "s3_desc": "Allgemeine Beurteilung und Lebensstilhinweise bei Schmerzen im unteren Rücken, Rücken und der Wirbelsäule.",
    "s4_title": "Fibromyalgie",
    "s4_desc": "Beurteilung von weit verbreiteten Muskelschmerzen, Müdigkeit, Druckempfindlichkeit und Schlafproblemen.",
    "s5_title": "Sick-Building-Syndrom",
    "s5_desc": "Beurteilung von Kopfschmerzen, Müdigkeit und ähnlichen Beschwerden im Zusammenhang mit Innenräumen.",
    "s6_title": "Restless-Legs-Syndrom",
    "s6_desc": "Beurteilung von Unruhe, Bewegungsdrang der Beine und schlafbeeinträchtigenden Beschwerden.",
    "s7_title": "Entzündliche Darmerkrankungen",
    "s7_desc": "Allgemeine Beurteilung und Information zu Morbus Crohn und Colitis ulcerosa.",
    "s8_title": "Chronische Müdigkeit",
    "s8_desc": "Beurteilung anhaltender Müdigkeit, Energiemangel und Beschwerden mit Einfluss auf den Alltag.",
    "s9_title": "Rheumatoide Arthritis",
    "s9_desc": "Allgemeine Beurteilung rheumatoider Arthritis mit Gelenkentzündung, Schwellung und Steifigkeit.",
    "s10_title": "Typ-2-Diabetes",
    "s10_desc": "Allgemeine Beurteilung und Information zu Blutzuckerkontrolle, Lebensstil und Stoffwechselgesundheit.",
    "reviews_kicker": "WERTVOLLES FEEDBACK",
    "reviews_title": "Ihre Erfahrungen sind uns wichtig",
    "reviews_desc": "Echte Patientenrückmeldungen werden hier nur mit Einwilligung veröffentlicht.",
    "review_placeholder_1": "Verifizierte Patientenrückmeldungen erscheinen hier, sobald sie verfügbar sind.",
    "review_placeholder_2": "Nur freigegebene Rückmeldungen werden unter Wahrung der Privatsphäre veröffentlicht.",
    "review_placeholder_3": "Echte Rückmeldungen können später in dieser Karte ergänzt werden.",
    "verified_label": "Bereich für verifiziertes Feedback",
    "privacy_label": "Datenschutz im Fokus",
    "coming_label": "Demnächst"
  }
};

const languageSelect = document.getElementById("languageSelect");

function applyLanguage(language) {
    const dict = translations[language] || translations.tr;

    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;

        if (dict[key]) {
            element.textContent = dict[key];
        }
    });

    localStorage.setItem("ceyhunNuriLanguage", language);
}

if (languageSelect) {
    const savedLanguage =
        localStorage.getItem("ceyhunNuriLanguage") || "tr";

    languageSelect.value = savedLanguage;
    applyLanguage(savedLanguage);

    languageSelect.addEventListener("change", event => {
        applyLanguage(event.target.value);
    });
}
