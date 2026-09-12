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
    "konum",
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


// ================================
// V28 HIZMET BILGI MODALI
// ================================
const serviceInfoData = {
  "tr": {
    "labels": {
      "kicker": "HİZMET HAKKINDA",
      "what": "Nedir?",
      "why": "Neden olabilir?",
      "action": "Neler yapılabilir?",
      "note": "Bu içerik genel bilgilendirme amaçlıdır; kişisel tanı ve tedavi için hekim değerlendirmesi gerekir.",
      "close": "Kapat",
      "appointment": "Randevu Talebi"
    },
    "s1": {
      "title": "Ankilozan Spondilit",
      "summary": "Özellikle omurga ve sakroiliak eklemleri etkileyebilen, uzun süreli iltihapla seyreden romatizmal bir hastalıktır.",
      "what": "Bel ve kalça çevresinde ağrı, sabah tutukluğu ve hareket kısıtlılığı yapabilir. Bazı kişilerde göz ve diğer organlar da etkilenebilir.",
      "why": "Tek bir nedeni yoktur. Genetik yatkınlık ve bağışıklık sisteminin anormal iltihabi yanıtı önemli rol oynar.",
      "action": "Uzun süren bel ağrısı ve sabah tutukluğu varsa değerlendirme alınmalıdır. Düzenli hareket, uygun egzersiz ve hekim tarafından planlanan takip önemlidir."
    },
    "s2": {
      "title": "Baş Ağrısı ve Migren",
      "summary": "Migren; tekrarlayan, çoğu zaman zonklayıcı baş ağrısı ve ışık-ses hassasiyeti gibi belirtilerle seyredebilir.",
      "what": "Ataklar saatler sürebilir; bulantı, görsel belirtiler veya günlük aktivitede zorlanma eşlik edebilir.",
      "why": "Genetik yatkınlık, uyku düzensizliği, stres, açlık, bazı yiyecekler ve hormonal değişimler tetikleyici olabilir.",
      "action": "Atak günlüğü tutmak, düzenli uyku ve öğün düzeni yardımcı olabilir. Yeni, çok şiddetli veya farklı karakterde baş ağrısında tıbbi değerlendirme gerekir."
    },
    "s3": {
      "title": "Bel ve Sırt Ağrısı",
      "summary": "Bel ve sırt ağrısı kas, eklem, disk veya omurgayı çevreleyen yapılardan kaynaklanabilen yaygın bir şikayettir.",
      "what": "Ağrı hareketle artabilir, bacağa yayılabilir veya kas spazmı ve hareket kısıtlılığıyla birlikte görülebilir.",
      "why": "Kas zorlanması, uzun süreli oturma, yanlış yüklenme, disk sorunları ve bazı romatizmal hastalıklar neden olabilir.",
      "action": "Hafif vakalarda kontrollü hareket ve ergonomi önemlidir. Güç kaybı, uyuşma, idrar-dışkı kontrolünde değişiklik veya travma varsa acil değerlendirme gerekir."
    },
    "s4": {
      "title": "Fibromiyalji",
      "summary": "Yaygın vücut ağrısı, hassasiyet, yorgunluk ve uyku bozukluklarıyla seyreden kronik bir ağrı durumudur.",
      "what": "Kaslarda ve yumuşak dokularda yaygın ağrıya, zihinsel yorgunluk ve dinlenememiş uyanma eşlik edebilir.",
      "why": "Kesin nedeni tam bilinmez. Ağrı işleme sistemindeki hassasiyet, uyku sorunları, stres ve genetik yatkınlık etkili olabilir.",
      "action": "Düzenli ve kademeli egzersiz, kaliteli uyku ve stres yönetimi önemlidir. Tanı için diğer olası nedenlerin hekim tarafından değerlendirilmesi gerekir."
    },
    "s5": {
      "title": "Hasta Bina Sendromu",
      "summary": "Belirli bir kapalı ortamda bulunurken artan, ortamdan uzaklaşınca hafifleyen bir grup yakınmayı tanımlar.",
      "what": "Baş ağrısı, göz-boğaz irritasyonu, yorgunluk, baş dönmesi ve konsantrasyon güçlüğü görülebilir.",
      "why": "Yetersiz havalandırma, uçucu kimyasallar, nem-küf, toz ve iç ortam hava kalitesiyle ilişkili faktörler rol oynayabilir.",
      "action": "Havalandırma ve ortam koşulları kontrol edilmeli, belirtiler belirli bir binayla ilişkiliyse işyeri/ortam değerlendirmesi düşünülmelidir. Süren belirtilerde tıbbi değerlendirme alınmalıdır."
    },
    "s6": {
      "title": "Huzursuz Bacak Sendromu",
      "summary": "Özellikle dinlenme sırasında bacakları hareket ettirme isteği ve rahatsızlık hissiyle seyreden bir durumdur.",
      "what": "Belirtiler çoğunlukla akşam ve gece artar; yürümek veya bacakları hareket ettirmek geçici rahatlama sağlayabilir.",
      "why": "Demir eksikliği, bazı kronik hastalıklar, gebelik, bazı ilaçlar veya genetik yatkınlıkla ilişkili olabilir.",
      "action": "Uyku düzeni, kafein kullanımı ve demir düzeyi gibi etkenler gözden geçirilebilir. Sık veya uykuyu bozan belirtilerde hekim değerlendirmesi gerekir."
    },
    "s7": {
      "title": "İltihabi Bağırsak Hastalıkları",
      "summary": "Crohn hastalığı ve ülseratif kolit, bağırsaklarda kronik iltihapla seyreden hastalıklardır.",
      "what": "Karın ağrısı, uzun süren ishal, dışkıda kan, kilo kaybı ve yorgunluk gibi belirtiler görülebilir.",
      "why": "Genetik yatkınlık, bağışıklık sistemi ve çevresel faktörlerin birlikte rol oynadığı düşünülür.",
      "action": "Uzun süren ishal, kanlı dışkı veya açıklanamayan kilo kaybında gastroenteroloji değerlendirmesi önemlidir. Tedavi kişiye ve hastalığın şiddetine göre planlanır."
    },
    "s8": {
      "title": "Kronik Yorgunluk",
      "summary": "Haftalar veya aylar boyunca süren ve dinlenmeyle tamamen düzelmeyen yorgunluk birçok farklı nedene bağlı olabilir.",
      "what": "Enerji azalması, konsantrasyon güçlüğü, uyku sorunları ve günlük aktivitelerde zorlanma görülebilir.",
      "why": "Uyku bozuklukları, kansızlık, tiroit sorunları, enfeksiyonlar, ruhsal durumlar veya başka sağlık sorunları neden olabilir.",
      "action": "Uyku, beslenme ve günlük aktivite düzeni gözden geçirilmeli; uzun süren veya günlük yaşamı etkileyen yorgunlukta altta yatan neden için tıbbi değerlendirme yapılmalıdır."
    },
    "s9": {
      "title": "Romatoid Artrit",
      "summary": "Bağışıklık sisteminin eklemlerde iltihaba yol açtığı kronik otoimmün bir romatizmal hastalıktır.",
      "what": "El ve ayak eklemlerinde simetrik ağrı, şişlik ve uzun süren sabah tutukluğu sık görülebilir.",
      "why": "Genetik yatkınlık, bağışıklık sistemi değişiklikleri ve sigara gibi çevresel etkenler riski etkileyebilir.",
      "action": "Erken tanı eklem hasarını önlemede önemlidir. Süren eklem şişliği ve sabah tutukluğunda romatoloji değerlendirmesi alınmalıdır."
    },
    "s10": {
      "title": "Tip 2 Diyabet",
      "summary": "Vücudun insülini yeterince etkili kullanamadığı ve kan şekerinin zamanla yükseldiği metabolik bir hastalıktır.",
      "what": "Sık susama, sık idrara çıkma, yorgunluk ve bulanık görme görülebilir; bazen uzun süre belirti vermeyebilir.",
      "why": "Genetik yatkınlık, fazla kilo, hareketsizlik, yaş ve insülin direnci önemli risk faktörleridir.",
      "action": "Düzenli kan şekeri takibi, dengeli beslenme, fiziksel aktivite ve hekim kontrolleri önemlidir. Tedavi planı kişiye göre belirlenir."
    }
  },
  "en": {
    "labels": {
      "kicker": "ABOUT THIS SERVICE",
      "what": "What is it?",
      "why": "Why can it happen?",
      "action": "What can be done?",
      "note": "This content is for general information only; personal diagnosis and treatment require medical evaluation.",
      "close": "Close",
      "appointment": "Request Appointment"
    },
    "s1": {
      "title": "Ankylosing Spondylitis",
      "summary": "A chronic inflammatory rheumatic condition that mainly affects the spine and sacroiliac joints.",
      "what": "It may cause lower back or hip pain, morning stiffness and reduced mobility. Some people can also have eye or other organ involvement.",
      "why": "There is no single cause. Genetic susceptibility and an abnormal inflammatory immune response play important roles.",
      "action": "Persistent back pain and morning stiffness should be assessed. Regular movement, appropriate exercise and medical follow-up can be important."
    },
    "s2": {
      "title": "Headache & Migraine",
      "summary": "Migraine can cause recurring, often throbbing headaches with sensitivity to light or sound.",
      "what": "Attacks may last for hours and can include nausea, visual symptoms or difficulty with normal daily activity.",
      "why": "Genetics, poor sleep, stress, skipped meals, certain foods and hormonal changes may trigger attacks.",
      "action": "A headache diary, regular sleep and meals may help. A new, very severe or unusual headache requires medical assessment."
    },
    "s3": {
      "title": "Low Back & Back Pain",
      "summary": "Back pain may arise from muscles, joints, discs or structures around the spine.",
      "what": "Pain can worsen with movement, radiate to the leg, or occur with muscle spasm and reduced movement.",
      "why": "Muscle strain, prolonged sitting, mechanical overload, disc problems or rheumatic conditions may contribute.",
      "action": "Gentle movement and ergonomics can help mild cases. Weakness, numbness, bladder/bowel changes or trauma require urgent medical assessment."
    },
    "s4": {
      "title": "Fibromyalgia",
      "summary": "A chronic pain condition associated with widespread pain, tenderness, fatigue and sleep disturbance.",
      "what": "Widespread muscle and soft-tissue pain may occur with mental fatigue and unrefreshing sleep.",
      "why": "The exact cause is not fully known. Pain-processing sensitivity, sleep problems, stress and genetics may contribute.",
      "action": "Gradual exercise, good sleep and stress management can be helpful. Medical evaluation is needed to exclude other causes."
    },
    "s5": {
      "title": "Sick Building Syndrome",
      "summary": "A group of symptoms that increase in a particular indoor environment and improve after leaving it.",
      "what": "Headache, eye or throat irritation, fatigue, dizziness and concentration difficulty may occur.",
      "why": "Poor ventilation, volatile chemicals, dampness, mold, dust and indoor air quality may contribute.",
      "action": "Ventilation and environmental conditions should be reviewed. Persistent symptoms should be medically assessed."
    },
    "s6": {
      "title": "Restless Legs Syndrome",
      "summary": "A condition causing an urge to move the legs, especially during rest.",
      "what": "Symptoms often worsen in the evening or at night, and movement may bring temporary relief.",
      "why": "It may be associated with iron deficiency, some chronic diseases, pregnancy, medications or genetics.",
      "action": "Sleep habits, caffeine use and iron status can be reviewed. Frequent or sleep-disrupting symptoms should be assessed."
    },
    "s7": {
      "title": "Inflammatory Bowel Diseases",
      "summary": "Crohn’s disease and ulcerative colitis are chronic inflammatory conditions of the digestive tract.",
      "what": "Abdominal pain, prolonged diarrhea, blood in stool, weight loss and fatigue may occur.",
      "why": "Genetic susceptibility, the immune system and environmental factors are thought to interact.",
      "action": "Persistent diarrhea, bloody stool or unexplained weight loss should be evaluated by gastroenterology. Treatment depends on disease severity."
    },
    "s8": {
      "title": "Chronic Fatigue",
      "summary": "Fatigue lasting weeks or months and not fully relieved by rest can have many causes.",
      "what": "Low energy, poor concentration, sleep problems and difficulty with daily activity may occur.",
      "why": "Sleep disorders, anemia, thyroid disease, infections, mental health conditions or other illnesses may contribute.",
      "action": "Sleep, nutrition and activity patterns should be reviewed. Persistent fatigue that affects daily life deserves medical evaluation."
    },
    "s9": {
      "title": "Rheumatoid Arthritis",
      "summary": "A chronic autoimmune rheumatic disease in which the immune system causes inflammation in the joints.",
      "what": "Symmetrical pain, swelling and prolonged morning stiffness in hand and foot joints are common.",
      "why": "Genetics, immune-system changes and environmental factors such as smoking can affect risk.",
      "action": "Early diagnosis is important to reduce joint damage. Persistent swelling and morning stiffness should be assessed by rheumatology."
    },
    "s10": {
      "title": "Type 2 Diabetes",
      "summary": "A metabolic condition in which the body becomes less effective at using insulin and blood glucose rises over time.",
      "what": "Thirst, frequent urination, fatigue and blurred vision may occur, although there may be no symptoms for a long time.",
      "why": "Genetics, excess weight, inactivity, age and insulin resistance are major risk factors.",
      "action": "Blood glucose monitoring, balanced nutrition, physical activity and medical follow-up are important. Treatment is individualized."
    }
  },
  "de": {
    "labels": {
      "kicker": "ÜBER DIESE LEISTUNG",
      "what": "Was ist das?",
      "why": "Warum kann es entstehen?",
      "action": "Was kann man tun?",
      "note": "Diese Inhalte dienen nur der allgemeinen Information; Diagnose und Behandlung erfordern eine ärztliche Beurteilung.",
      "close": "Schließen",
      "appointment": "Termin anfragen"
    },
    "s1": {
      "title": "Morbus Bechterew",
      "summary": "Eine chronisch-entzündliche rheumatische Erkrankung, die vor allem Wirbelsäule und Iliosakralgelenke betreffen kann.",
      "what": "Typisch sind Schmerzen im unteren Rücken oder Becken, Morgensteifigkeit und eingeschränkte Beweglichkeit.",
      "why": "Es gibt nicht nur eine Ursache. Genetische Veranlagung und eine fehlgesteuerte Entzündungsreaktion spielen eine wichtige Rolle.",
      "action": "Anhaltende Rückenschmerzen und Morgensteifigkeit sollten abgeklärt werden. Bewegung, passende Übungen und ärztliche Kontrolle sind wichtig."
    },
    "s2": {
      "title": "Kopfschmerzen & Migräne",
      "summary": "Migräne kann wiederkehrende, häufig pulsierende Kopfschmerzen mit Licht- oder Lärmempfindlichkeit verursachen.",
      "what": "Attacken können Stunden dauern und mit Übelkeit, Sehstörungen oder Einschränkungen im Alltag einhergehen.",
      "why": "Genetik, Schlafmangel, Stress, ausgelassene Mahlzeiten, bestimmte Lebensmittel und Hormonschwankungen können Auslöser sein.",
      "action": "Ein Kopfschmerztagebuch sowie regelmäßiger Schlaf und Mahlzeiten können helfen. Neue oder sehr starke Kopfschmerzen sollten medizinisch abgeklärt werden."
    },
    "s3": {
      "title": "Kreuz- & Rückenschmerzen",
      "summary": "Rückenschmerzen können von Muskeln, Gelenken, Bandscheiben oder anderen Strukturen der Wirbelsäule ausgehen.",
      "what": "Schmerzen können bei Bewegung zunehmen, ins Bein ausstrahlen oder mit Muskelverspannung und Bewegungseinschränkung auftreten.",
      "why": "Muskelüberlastung, langes Sitzen, Fehlbelastung, Bandscheibenprobleme oder rheumatische Erkrankungen können eine Rolle spielen.",
      "action": "Leichte Bewegung und Ergonomie helfen oft. Schwäche, Taubheit, Blasen-/Darmstörungen oder Trauma erfordern eine rasche Abklärung."
    },
    "s4": {
      "title": "Fibromyalgie",
      "summary": "Eine chronische Schmerzerkrankung mit weit verbreiteten Schmerzen, Empfindlichkeit, Müdigkeit und Schlafproblemen.",
      "what": "Muskel- und Weichteilschmerzen können mit Konzentrationsproblemen und nicht erholsamem Schlaf einhergehen.",
      "why": "Die genaue Ursache ist nicht vollständig geklärt. Schmerzverarbeitung, Schlafstörungen, Stress und Genetik können beteiligt sein.",
      "action": "Langsam gesteigerte Bewegung, guter Schlaf und Stressmanagement können helfen. Andere Ursachen sollten ärztlich ausgeschlossen werden."
    },
    "s5": {
      "title": "Sick-Building-Syndrom",
      "summary": "Beschreibt Beschwerden, die in bestimmten Innenräumen zunehmen und außerhalb des Gebäudes nachlassen.",
      "what": "Kopfschmerzen, Augen- oder Halsreizung, Müdigkeit, Schwindel und Konzentrationsprobleme können auftreten.",
      "why": "Schlechte Lüftung, Chemikalien, Feuchtigkeit, Schimmel, Staub und Raumluftqualität können beitragen.",
      "action": "Lüftung und Raumklima sollten geprüft werden. Anhaltende Beschwerden sollten medizinisch abgeklärt werden."
    },
    "s6": {
      "title": "Restless-Legs-Syndrom",
      "summary": "Eine Erkrankung mit Bewegungsdrang der Beine, vor allem in Ruhe.",
      "what": "Die Beschwerden werden häufig abends oder nachts stärker und bessern sich vorübergehend durch Bewegung.",
      "why": "Eisenmangel, chronische Erkrankungen, Schwangerschaft, Medikamente oder genetische Faktoren können beteiligt sein.",
      "action": "Schlafgewohnheiten, Koffein und Eisenstatus können geprüft werden. Häufige oder schlafstörende Beschwerden sollten ärztlich abgeklärt werden."
    },
    "s7": {
      "title": "Entzündliche Darmerkrankungen",
      "summary": "Morbus Crohn und Colitis ulcerosa sind chronisch-entzündliche Erkrankungen des Verdauungstrakts.",
      "what": "Bauchschmerzen, länger anhaltender Durchfall, Blut im Stuhl, Gewichtsverlust und Müdigkeit sind möglich.",
      "why": "Genetische Veranlagung, Immunsystem und Umweltfaktoren wirken wahrscheinlich zusammen.",
      "action": "Anhaltender Durchfall, Blut im Stuhl oder ungeklärter Gewichtsverlust sollten gastroenterologisch abgeklärt werden."
    },
    "s8": {
      "title": "Chronische Müdigkeit",
      "summary": "Müdigkeit über Wochen oder Monate, die durch Ruhe nicht vollständig verschwindet, kann viele Ursachen haben.",
      "what": "Energieverlust, Konzentrationsprobleme, Schlafstörungen und Einschränkungen im Alltag können auftreten.",
      "why": "Schlafstörungen, Anämie, Schilddrüsenerkrankungen, Infektionen, psychische Belastungen oder andere Erkrankungen können beteiligt sein.",
      "action": "Schlaf, Ernährung und Aktivität sollten überprüft werden. Anhaltende, alltagsrelevante Müdigkeit sollte medizinisch abgeklärt werden."
    },
    "s9": {
      "title": "Rheumatoide Arthritis",
      "summary": "Eine chronische Autoimmunerkrankung, bei der das Immunsystem Entzündungen in den Gelenken verursacht.",
      "what": "Symmetrische Schmerzen, Schwellungen und längere Morgensteifigkeit an Hand- und Fußgelenken sind häufig.",
      "why": "Genetik, Veränderungen des Immunsystems und Umweltfaktoren wie Rauchen können das Risiko beeinflussen.",
      "action": "Eine frühe Diagnose ist wichtig, um Gelenkschäden zu reduzieren. Anhaltende Gelenkschwellung sollte rheumatologisch abgeklärt werden."
    },
    "s10": {
      "title": "Typ-2-Diabetes",
      "summary": "Eine Stoffwechselerkrankung, bei der der Körper Insulin weniger wirksam nutzt und der Blutzucker ansteigt.",
      "what": "Durst, häufiges Wasserlassen, Müdigkeit und verschwommenes Sehen können auftreten; oft bestehen lange keine Beschwerden.",
      "why": "Genetische Veranlagung, Übergewicht, Bewegungsmangel, Alter und Insulinresistenz sind wichtige Risikofaktoren.",
      "action": "Blutzuckerkontrolle, ausgewogene Ernährung, Bewegung und ärztliche Betreuung sind wichtig. Die Behandlung wird individuell geplant."
    }
  }
};


const serviceInfoModal =
    document.getElementById("serviceInfoModal");

const serviceInfoBackdrop =
    document.getElementById("serviceInfoBackdrop");

const serviceInfoClose =
    document.getElementById("serviceInfoClose");

const serviceInfoDone =
    document.getElementById("serviceInfoDone");

const serviceInfoAppointment =
    document.getElementById("serviceInfoAppointment");

const serviceInfoKicker =
    document.getElementById("serviceInfoKicker");

const serviceInfoTitle =
    document.getElementById("serviceInfoTitle");

const serviceInfoSummary =
    document.getElementById("serviceInfoSummary");

const serviceInfoWhatLabel =
    document.getElementById("serviceInfoWhatLabel");

const serviceInfoWhyLabel =
    document.getElementById("serviceInfoWhyLabel");

const serviceInfoActionLabel =
    document.getElementById("serviceInfoActionLabel");

const serviceInfoWhat =
    document.getElementById("serviceInfoWhat");

const serviceInfoWhy =
    document.getElementById("serviceInfoWhy");

const serviceInfoAction =
    document.getElementById("serviceInfoAction");

const serviceInfoNote =
    document.getElementById("serviceInfoNote");


function getCurrentServiceLanguage() {

    if (languageSelect && languageSelect.value) {
        return languageSelect.value;
    }

    return (
        localStorage.getItem("ceyhunNuriLanguage") ||
        "tr"
    );
}


function openServiceInfo(serviceKey) {

    if (!serviceInfoModal) {
        return;
    }

    const language =
        getCurrentServiceLanguage();

    const languageData =
        serviceInfoData[language] ||
        serviceInfoData.tr;

    const item =
        languageData[serviceKey];

    const labels =
        languageData.labels;

    if (!item) {
        return;
    }

    serviceInfoKicker.textContent =
        labels.kicker;

    serviceInfoTitle.textContent =
        item.title;

    serviceInfoSummary.textContent =
        item.summary;

    serviceInfoWhatLabel.textContent =
        labels.what;

    serviceInfoWhyLabel.textContent =
        labels.why;

    serviceInfoActionLabel.textContent =
        labels.action;

    serviceInfoWhat.textContent =
        item.what;

    serviceInfoWhy.textContent =
        item.why;

    serviceInfoAction.textContent =
        item.action;

    serviceInfoNote.textContent =
        labels.note;

    serviceInfoDone.textContent =
        labels.close;

    serviceInfoAppointment.textContent =
        labels.appointment;

    serviceInfoModal.classList.add("show");

    serviceInfoModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );
}


function closeServiceInfo() {

    if (!serviceInfoModal) {
        return;
    }

    serviceInfoModal.classList.remove("show");

    serviceInfoModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );
}


document.querySelectorAll(
    ".service-info-button"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            openServiceInfo(
                button.dataset.serviceInfo
            );

        }
    );

});


[
    serviceInfoBackdrop,
    serviceInfoClose,
    serviceInfoDone
].forEach(element => {

    if (element) {

        element.addEventListener(
            "click",
            closeServiceInfo
        );

    }

});


if (serviceInfoAppointment) {

    serviceInfoAppointment.addEventListener(
        "click",
        closeServiceInfo
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            serviceInfoModal &&
            serviceInfoModal.classList.contains(
                "show"
            )
        ) {

            closeServiceInfo();

        }

    }
);


// ================================
// V32 - HERO TEDAVİ DROPDOWN MENÜSÜ
// ================================

const heroTreatmentMenu =
    document.getElementById("heroTreatmentMenu");

const heroTreatmentButton =
    document.getElementById("heroTreatmentButton");

const heroTreatmentDropdown =
    document.getElementById("heroTreatmentDropdown");

if (
    heroTreatmentMenu &&
    heroTreatmentButton &&
    heroTreatmentDropdown
) {
    const closeHeroTreatmentMenu = () => {
        heroTreatmentMenu.classList.remove("open");
        heroTreatmentButton.setAttribute("aria-expanded", "false");
        heroTreatmentDropdown.setAttribute("aria-hidden", "true");
    };

    heroTreatmentButton.addEventListener("click", event => {
        event.stopPropagation();

        const willOpen =
            !heroTreatmentMenu.classList.contains("open");

        heroTreatmentMenu.classList.toggle("open", willOpen);
        heroTreatmentButton.setAttribute(
            "aria-expanded",
            willOpen ? "true" : "false"
        );
        heroTreatmentDropdown.setAttribute(
            "aria-hidden",
            willOpen ? "false" : "true"
        );

        if (
            typeof heroHealthMenu !== "undefined" &&
            heroHealthMenu &&
            willOpen
        ) {
            heroHealthMenu.classList.remove("open");
            if (heroHealthButton) {
                heroHealthButton.setAttribute("aria-expanded", "false");
            }
            if (heroHealthDropdown) {
                heroHealthDropdown.setAttribute("aria-hidden", "true");
            }
        }
    });

    heroTreatmentDropdown
        .querySelectorAll("a")
        .forEach(link => {
            link.addEventListener("click", closeHeroTreatmentMenu);
        });

    document.addEventListener("click", event => {
        if (!heroTreatmentMenu.contains(event.target)) {
            closeHeroTreatmentMenu();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeHeroTreatmentMenu();
        }
    });
}


// ================================
// V33 - HERO GENEL SAĞLIK DROPDOWN
// ================================

const heroHealthMenu =
    document.getElementById("heroHealthMenu");

const heroHealthButton =
    document.getElementById("heroHealthButton");

const heroHealthDropdown =
    document.getElementById("heroHealthDropdown");

if (
    heroHealthMenu &&
    heroHealthButton &&
    heroHealthDropdown
) {
    const closeHeroHealthMenu = () => {
        heroHealthMenu.classList.remove("open");
        heroHealthButton.setAttribute("aria-expanded", "false");
        heroHealthDropdown.setAttribute("aria-hidden", "true");
    };

    heroHealthButton.addEventListener("click", event => {
        event.stopPropagation();

        const willOpen =
            !heroHealthMenu.classList.contains("open");

        heroHealthMenu.classList.toggle("open", willOpen);
        heroHealthButton.setAttribute(
            "aria-expanded",
            willOpen ? "true" : "false"
        );
        heroHealthDropdown.setAttribute(
            "aria-hidden",
            willOpen ? "false" : "true"
        );

        // Diğer açık menüyü kapat.
        if (
            typeof heroTreatmentMenu !== "undefined" &&
            heroTreatmentMenu &&
            willOpen
        ) {
            heroTreatmentMenu.classList.remove("open");
            if (heroTreatmentButton) {
                heroTreatmentButton.setAttribute("aria-expanded", "false");
            }
            if (heroTreatmentDropdown) {
                heroTreatmentDropdown.setAttribute("aria-hidden", "true");
            }
        }
    });

    heroHealthDropdown
        .querySelectorAll("a")
        .forEach(link => {
            link.addEventListener("click", closeHeroHealthMenu);
        });

    document.addEventListener("click", event => {
        if (!heroHealthMenu.contains(event.target)) {
            closeHeroHealthMenu();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeHeroHealthMenu();
        }
    });
}




// =====================================
// V35 - TEDAVİ ALANLARI AYRI SAYFA
// =====================================

const heroDiseasesButtonV35 =
    document.getElementById("heroDiseasesButton");

const treatmentPage =
    document.getElementById("tedaviAlanlariPage");

const treatmentBackHome =
    document.getElementById("treatmentBackHome");

function openTreatmentPage() {

    if (!treatmentPage) {
        return;
    }

    // Açık dropdownlar varsa kapat
    if (
        typeof heroTreatmentMenu !== "undefined" &&
        heroTreatmentMenu
    ) {
        heroTreatmentMenu.classList.remove("open");
    }

    if (
        typeof heroHealthMenu !== "undefined" &&
        heroHealthMenu
    ) {
        heroHealthMenu.classList.remove("open");
    }

    document.body.classList.add(
        "treatment-page-open"
    );

    treatmentPage.setAttribute(
        "aria-hidden",
        "false"
    );

    history.pushState(
        { page: "tedavi-alanlari" },
        "",
        "#tedavi-alanlari"
    );

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function closeTreatmentPage() {

    if (!treatmentPage) {
        return;
    }

    document.body.classList.remove(
        "treatment-page-open"
    );

    treatmentPage.setAttribute(
        "aria-hidden",
        "true"
    );

    if (location.hash === "#tedavi-alanlari") {
        history.pushState(
            { page: "home" },
            "",
            location.pathname + location.search
        );
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

if (heroDiseasesButtonV35) {

    heroDiseasesButtonV35.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            openTreatmentPage();
        }
    );
}

if (treatmentBackHome) {

    treatmentBackHome.addEventListener(
        "click",
        closeTreatmentPage
    );
}

window.addEventListener(
    "popstate",
    () => {

        if (location.hash === "#tedavi-alanlari") {
            document.body.classList.add(
                "treatment-page-open"
            );

            if (treatmentPage) {
                treatmentPage.setAttribute(
                    "aria-hidden",
                    "false"
                );
            }

            window.scrollTo(0, 0);
        } else {
            document.body.classList.remove(
                "treatment-page-open"
            );

            if (treatmentPage) {
                treatmentPage.setAttribute(
                    "aria-hidden",
                    "true"
                );
            }

            window.scrollTo(0, 0);
        }
    }
);

/* Sayfa doğrudan #tedavi-alanlari ile açılırsa */
if (
    location.hash === "#tedavi-alanlari" &&
    treatmentPage
) {
    document.body.classList.add(
        "treatment-page-open"
    );

    treatmentPage.setAttribute(
        "aria-hidden",
        "false"
    );
}


// =========================================================
// V41 - TEDAVİ ALANLARI MENÜSÜ SCROLL DAVRANIŞI
// İlk görünüm beyaz/sade; aşağı kaydırınca mavi sabit bar.
// =========================================================

(function () {
    const updateTreatmentNavState = () => {
        if (!document.body.classList.contains("treatment-page-open")) {
            document.body.classList.remove("treatment-nav-scrolled");
            return;
        }

        if (window.scrollY > 45) {
            document.body.classList.add("treatment-nav-scrolled");
        } else {
            document.body.classList.remove("treatment-nav-scrolled");
        }
    };

    window.addEventListener("scroll", updateTreatmentNavState, {
        passive: true
    });

    window.addEventListener("load", updateTreatmentNavState);

    /* Tedavi Alanları butonuna girildiği anda başlangıç görünümünü sıfırla */
    if (typeof heroDiseasesButtonV35 !== "undefined" && heroDiseasesButtonV35) {
        heroDiseasesButtonV35.addEventListener("click", () => {
            document.body.classList.remove("treatment-nav-scrolled");
            requestAnimationFrame(updateTreatmentNavState);
        });
    }

    if (typeof treatmentBackHome !== "undefined" && treatmentBackHome) {
        treatmentBackHome.addEventListener("click", () => {
            document.body.classList.remove("treatment-nav-scrolled");
        });
    }
})();


// =========================================================
// V42 - TEDAVİ ALANLARI SAYFASI ÜST MENÜLERİ
// Tedavi + Genel Sağlık gerçekten treatment-page içinde.
// =========================================================

(function () {

    const treatmentMenu =
        document.getElementById("treatmentPageTreatmentMenu");

    const treatmentButton =
        document.getElementById("treatmentPageTreatmentButton");

    const treatmentDropdown =
        document.getElementById("treatmentPageTreatmentDropdown");

    const healthMenu =
        document.getElementById("treatmentPageHealthMenu");

    const healthButton =
        document.getElementById("treatmentPageHealthButton");

    const healthDropdown =
        document.getElementById("treatmentPageHealthDropdown");

    function closeMenu(menu, button, dropdown) {
        if (!menu || !button || !dropdown) {
            return;
        }

        menu.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        dropdown.setAttribute("aria-hidden", "true");
    }

    function openMenu(menu, button, dropdown) {
        if (!menu || !button || !dropdown) {
            return;
        }

        menu.classList.add("open");
        button.setAttribute("aria-expanded", "true");
        dropdown.setAttribute("aria-hidden", "false");
    }

    if (treatmentButton) {
        treatmentButton.addEventListener("click", event => {
            event.stopPropagation();

            const isOpen =
                treatmentMenu.classList.contains("open");

            closeMenu(
                healthMenu,
                healthButton,
                healthDropdown
            );

            if (isOpen) {
                closeMenu(
                    treatmentMenu,
                    treatmentButton,
                    treatmentDropdown
                );
            } else {
                openMenu(
                    treatmentMenu,
                    treatmentButton,
                    treatmentDropdown
                );
            }
        });
    }

    if (healthButton) {
        healthButton.addEventListener("click", event => {
            event.stopPropagation();

            const isOpen =
                healthMenu.classList.contains("open");

            closeMenu(
                treatmentMenu,
                treatmentButton,
                treatmentDropdown
            );

            if (isOpen) {
                closeMenu(
                    healthMenu,
                    healthButton,
                    healthDropdown
                );
            } else {
                openMenu(
                    healthMenu,
                    healthButton,
                    healthDropdown
                );
            }
        });
    }

    document.addEventListener("click", event => {

        if (
            treatmentMenu &&
            !treatmentMenu.contains(event.target)
        ) {
            closeMenu(
                treatmentMenu,
                treatmentButton,
                treatmentDropdown
            );
        }

        if (
            healthMenu &&
            !healthMenu.contains(event.target)
        ) {
            closeMenu(
                healthMenu,
                healthButton,
                healthDropdown
            );
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu(
                treatmentMenu,
                treatmentButton,
                treatmentDropdown
            );

            closeMenu(
                healthMenu,
                healthButton,
                healthDropdown
            );
        }
    });

})();


// =========================================================
// V43 - AĞRI SEKMESİ / AĞRI SAYFASI
// =========================================================

(function () {

    const heroPainButton =
        document.getElementById("heroPainButton");

    const treatmentPagePainButton =
        document.getElementById("treatmentPagePainButton");

    const painPage =
        document.getElementById("agriPage");

    const painBackHome =
        document.getElementById("painBackHome");

    const painTreatmentAreasButton =
        document.getElementById("painPageTreatmentAreasButton");

    function openPainPage() {

        if (!painPage) {
            return;
        }

        document.body.classList.remove(
            "treatment-page-open",
            "treatment-nav-scrolled"
        );

        if (typeof treatmentPage !== "undefined" && treatmentPage) {
            treatmentPage.setAttribute("aria-hidden", "true");
        }

        document.body.classList.add("pain-page-open");
        painPage.setAttribute("aria-hidden", "false");

        history.pushState(
            { page: "agri" },
            "",
            "#agri"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function closePainPage() {

        document.body.classList.remove(
            "pain-page-open",
            "pain-nav-scrolled"
        );

        if (painPage) {
            painPage.setAttribute("aria-hidden", "true");
        }

        history.pushState(
            { page: "home" },
            "",
            location.pathname + location.search
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    if (heroPainButton) {
        heroPainButton.addEventListener("click", event => {
            event.preventDefault();
            openPainPage();
        });
    }

    if (treatmentPagePainButton) {
        treatmentPagePainButton.addEventListener("click", event => {
            event.preventDefault();
            openPainPage();
        });
    }

    if (painBackHome) {
        painBackHome.addEventListener("click", closePainPage);
    }

    if (painTreatmentAreasButton) {
        painTreatmentAreasButton.addEventListener("click", event => {
            event.preventDefault();

            document.body.classList.remove(
                "pain-page-open",
                "pain-nav-scrolled"
            );

            if (painPage) {
                painPage.setAttribute("aria-hidden", "true");
            }

            if (typeof openTreatmentPage === "function") {
                openTreatmentPage();
            }
        });
    }

    /* Scroll sonrası nav sabit mavi */
    function updatePainNav() {
        if (!document.body.classList.contains("pain-page-open")) {
            document.body.classList.remove("pain-nav-scrolled");
            return;
        }

        document.body.classList.toggle(
            "pain-nav-scrolled",
            window.scrollY > 45
        );
    }

    window.addEventListener("scroll", updatePainNav, {
        passive: true
    });

    /* Ağrı sayfasındaki dropdownlar */
    const treatmentMenu =
        document.getElementById("painPageTreatmentMenu");

    const treatmentButton =
        document.getElementById("painPageTreatmentButton");

    const treatmentDropdown =
        document.getElementById("painPageTreatmentDropdown");

    const healthMenu =
        document.getElementById("painPageHealthMenu");

    const healthButton =
        document.getElementById("painPageHealthButton");

    const healthDropdown =
        document.getElementById("painPageHealthDropdown");

    function closeDrop(menu, button, dropdown) {
        if (!menu || !button || !dropdown) return;
        menu.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        dropdown.setAttribute("aria-hidden", "true");
    }

    function toggleDrop(menu, button, dropdown, otherMenu, otherButton, otherDropdown) {
        if (!menu || !button || !dropdown) return;

        const willOpen = !menu.classList.contains("open");

        closeDrop(otherMenu, otherButton, otherDropdown);

        menu.classList.toggle("open", willOpen);
        button.setAttribute("aria-expanded", willOpen ? "true" : "false");
        dropdown.setAttribute("aria-hidden", willOpen ? "false" : "true");
    }

    if (treatmentButton) {
        treatmentButton.addEventListener("click", event => {
            event.stopPropagation();
            toggleDrop(
                treatmentMenu,
                treatmentButton,
                treatmentDropdown,
                healthMenu,
                healthButton,
                healthDropdown
            );
        });
    }

    if (healthButton) {
        healthButton.addEventListener("click", event => {
            event.stopPropagation();
            toggleDrop(
                healthMenu,
                healthButton,
                healthDropdown,
                treatmentMenu,
                treatmentButton,
                treatmentDropdown
            );
        });
    }

    document.addEventListener("click", event => {
        if (treatmentMenu && !treatmentMenu.contains(event.target)) {
            closeDrop(treatmentMenu, treatmentButton, treatmentDropdown);
        }

        if (healthMenu && !healthMenu.contains(event.target)) {
            closeDrop(healthMenu, healthButton, healthDropdown);
        }
    });

    /* Sayfa #agri ile doğrudan açılırsa */
    if (location.hash === "#agri" && painPage) {
        document.body.classList.add("pain-page-open");
        document.body.classList.remove("treatment-page-open");
        painPage.setAttribute("aria-hidden", "false");

        if (typeof treatmentPage !== "undefined" && treatmentPage) {
            treatmentPage.setAttribute("aria-hidden", "true");
        }
    }

})();


// =========================================================
// V44 - TEDAVİ ALANLARI ÜST "ANA SAYFA" BUTONU
// =========================================================

(function () {
    const treatmentPageHomeButton =
        document.getElementById("treatmentPageHomeButton");

    if (treatmentPageHomeButton) {
        treatmentPageHomeButton.addEventListener("click", event => {
            event.preventDefault();

            if (typeof closeTreatmentPage === "function") {
                closeTreatmentPage();
                return;
            }

            document.body.classList.remove(
                "treatment-page-open",
                "treatment-nav-scrolled"
            );

            const treatmentPageLocal =
                document.getElementById("tedaviAlanlariPage");

            if (treatmentPageLocal) {
                treatmentPageLocal.setAttribute(
                    "aria-hidden",
                    "true"
                );
            }

            history.pushState(
                { page: "home" },
                "",
                location.pathname + location.search
            );

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
})();


// =========================================================
// V46 - AĞRI SAYFASI ÜST "ANA SAYFA" BUTONU
// =========================================================

(function () {
    const painPageHomeButton =
        document.getElementById("painPageHomeButton");

    if (painPageHomeButton) {
        painPageHomeButton.addEventListener("click", event => {
            event.preventDefault();

            if (typeof closePainPage === "function") {
                closePainPage();
                return;
            }

            document.body.classList.remove(
                "pain-page-open",
                "pain-nav-scrolled"
            );

            const painPageLocal =
                document.getElementById("agriPage");

            if (painPageLocal) {
                painPageLocal.setAttribute(
                    "aria-hidden",
                    "true"
                );
            }

            history.pushState(
                { page: "home" },
                "",
                location.pathname + location.search
            );

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
})();


// =========================================================
// V47 - HAKKIMDA GÖRSEL YAZISI AKTİF / AYRI SAYFA
// =========================================================

(function () {

    const heroAboutButton =
        document.getElementById("heroAboutButton");

    const aboutPage =
        document.getElementById("hakkimdaPage");

    const aboutPageHomeButton =
        document.getElementById("aboutPageHomeButton");

    const aboutPageTreatmentAreasButton =
        document.getElementById("aboutPageTreatmentAreasButton");

    const aboutPagePainButton =
        document.getElementById("aboutPagePainButton");

    function openAboutPage() {
        if (!aboutPage) return;

        if (typeof window.resetAboutTabsV116 === "function") {
            window.resetAboutTabsV116();
        }

        document.body.classList.remove(
            "treatment-page-open",
            "treatment-nav-scrolled",
            "pain-page-open",
            "pain-nav-scrolled"
        );

        document.body.classList.add("about-page-open");

        aboutPage.setAttribute("aria-hidden", "false");

        history.pushState(
            { page: "hakkimda-v47" },
            "",
            "#hakkimda-sayfasi"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function closeAboutPage() {
        document.body.classList.remove(
            "about-page-open",
            "about-nav-scrolled"
        );

        if (aboutPage) {
            aboutPage.setAttribute("aria-hidden", "true");
        }

        history.pushState(
            { page: "home" },
            "",
            location.pathname + location.search
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    if (heroAboutButton) {
        heroAboutButton.addEventListener("click", event => {
            event.preventDefault();
            openAboutPage();
        });
    }

    if (aboutPageHomeButton) {
        aboutPageHomeButton.addEventListener("click", event => {
            event.preventDefault();
            closeAboutPage();
        });
    }

    if (aboutPageTreatmentAreasButton) {
        aboutPageTreatmentAreasButton.addEventListener("click", event => {
            event.preventDefault();

            document.body.classList.remove(
                "about-page-open",
                "about-nav-scrolled"
            );

            if (aboutPage) {
                aboutPage.setAttribute("aria-hidden", "true");
            }

            if (typeof openTreatmentPage === "function") {
                openTreatmentPage();
            }
        });
    }

    if (aboutPagePainButton) {
        aboutPagePainButton.addEventListener("click", event => {
            event.preventDefault();

            document.body.classList.remove(
                "about-page-open",
                "about-nav-scrolled"
            );

            if (aboutPage) {
                aboutPage.setAttribute("aria-hidden", "true");
            }

            const painPageLocal =
                document.getElementById("agriPage");

            if (painPageLocal) {
                document.body.classList.add("pain-page-open");
                painPageLocal.setAttribute("aria-hidden", "false");

                history.pushState(
                    { page: "agri" },
                    "",
                    "#agri"
                );

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        });
    }

    function updateAboutNav() {
        if (!document.body.classList.contains("about-page-open")) {
            document.body.classList.remove("about-nav-scrolled");
            return;
        }

        document.body.classList.toggle(
            "about-nav-scrolled",
            window.scrollY > 45
        );
    }

    window.addEventListener(
        "scroll",
        updateAboutNav,
        { passive: true }
    );

})();


// =========================================================
// V48 - MEDYA SEKMESİ / TV PROGRAMLARI + YOUTUBE
// =========================================================

(function () {

    const heroMediaButton =
        document.getElementById("heroMediaButton");

    const mediaPage =
        document.getElementById("medyaPage");

    const mediaPageHomeButton =
        document.getElementById("mediaPageHomeButton");

    const mediaPageTreatmentAreasButton =
        document.getElementById("mediaPageTreatmentAreasButton");

    const mediaPagePainButton =
        document.getElementById("mediaPagePainButton");

    const treatmentPageMediaButton =
        document.getElementById("treatmentPageMediaButton");

    const painPageMediaButton =
        document.getElementById("painPageMediaButton");

    const aboutPageMediaButton =
        document.getElementById("aboutPageMediaButton");

    const mediaTvProgramsButton =
        document.getElementById("mediaTvProgramsButton");

    const mediaYoutubeButton =
        document.getElementById("mediaYoutubeButton");

    const mediaInstagramButtonV98 =
        document.getElementById("mediaInstagramButtonV98");

    const mediaFacebookButtonV98 =
        document.getElementById("mediaFacebookButtonV98");

    const mediaXButtonV98 =
        document.getElementById("mediaXButtonV98");

    const mediaTargetButtonsV98 = [
        mediaTvProgramsButton,
        mediaYoutubeButton,
        mediaInstagramButtonV98,
        mediaFacebookButtonV98,
        mediaXButtonV98
    ].filter(Boolean);

    function setMediaActiveTargetV98(target) {
        mediaTargetButtonsV98.forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.mediaTarget === target
            );
        });
    }

    function openMediaPage(target = "tv") {

        if (!mediaPage) return;

        document.body.classList.remove(
            "treatment-page-open",
            "treatment-nav-scrolled",
            "pain-page-open",
            "pain-nav-scrolled",
            "about-page-open",
            "about-nav-scrolled"
        );

        document.body.classList.add("media-page-open");

        mediaPage.setAttribute("aria-hidden", "false");

        setMediaActiveTargetV98(target);

        history.pushState(
            { page: "medya", target },
            "",
            "#medya"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function closeMediaPage() {

        document.body.classList.remove(
            "media-page-open",
            "media-nav-scrolled"
        );

        if (mediaPage) {
            mediaPage.setAttribute("aria-hidden", "true");
        }

        history.pushState(
            { page: "home" },
            "",
            location.pathname + location.search
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    if (heroMediaButton) {
        heroMediaButton.addEventListener("click", event => {
            event.preventDefault();
            openMediaPage("tv");
        });
    }

    [
        treatmentPageMediaButton,
        painPageMediaButton,
        aboutPageMediaButton
    ].forEach(button => {
        if (!button) return;

        button.addEventListener("click", event => {
            event.preventDefault();
            openMediaPage("tv");
        });
    });

    if (mediaPageHomeButton) {
        mediaPageHomeButton.addEventListener("click", event => {
            event.preventDefault();
            closeMediaPage();
        });
    }

    if (mediaPageTreatmentAreasButton) {
        mediaPageTreatmentAreasButton.addEventListener("click", event => {
            event.preventDefault();

            document.body.classList.remove(
                "media-page-open",
                "media-nav-scrolled"
            );

            if (mediaPage) {
                mediaPage.setAttribute("aria-hidden", "true");
            }

            if (typeof openTreatmentPage === "function") {
                openTreatmentPage();
            }
        });
    }

    if (mediaPagePainButton) {
        mediaPagePainButton.addEventListener("click", event => {
            event.preventDefault();

            document.body.classList.remove(
                "media-page-open",
                "media-nav-scrolled"
            );

            if (mediaPage) {
                mediaPage.setAttribute("aria-hidden", "true");
            }

            const painPageLocal =
                document.getElementById("agriPage");

            if (painPageLocal) {
                document.body.classList.add("pain-page-open");
                painPageLocal.setAttribute("aria-hidden", "false");

                history.pushState(
                    { page: "agri" },
                    "",
                    "#agri"
                );

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        });
    }

    mediaTargetButtonsV98.forEach(button => {
        button.addEventListener("click", () => {
            setMediaActiveTargetV98(
                button.dataset.mediaTarget || "tv"
            );
        });
    });

    function updateMediaNav() {
        if (!document.body.classList.contains("media-page-open")) {
            document.body.classList.remove("media-nav-scrolled");
            return;
        }

        document.body.classList.toggle(
            "media-nav-scrolled",
            window.scrollY > 45
        );
    }

    window.addEventListener(
        "scroll",
        updateMediaNav,
        { passive: true }
    );

    if (location.hash === "#medya" && mediaPage) {
        document.body.classList.add("media-page-open");
        mediaPage.setAttribute("aria-hidden", "false");

        setMediaActiveTargetV98("tv");
    }

})();


// =========================================================
// V51 - YAYIN / CACHE TEMİZLİĞİ
// Eski site dosyalarının tarayıcıda kalmasını azaltır.
// =========================================================

window.addEventListener("load", async () => {
    try {
        if ("serviceWorker" in navigator) {
            const registrations =
                await navigator.serviceWorker.getRegistrations();

            for (const registration of registrations) {
                await registration.unregister();
            }
        }

        if ("caches" in window) {
            const cacheNames = await caches.keys();

            await Promise.all(
                cacheNames.map(cacheName =>
                    caches.delete(cacheName)
                )
            );
        }
    } catch (error) {
        console.warn("V51 cache temizliği atlandı:", error);
    }
});


// =========================================================
// V54 - BİLGİ > KVKK > AYDINLATMA METNİ
// =========================================================

(function () {

    const infoMenus =
        document.querySelectorAll(".info-menu-v54");

    function closeInfoMenu(menu) {
        if (!menu) return;

        menu.classList.remove("open", "kvkk-open");

        const mainButton =
            menu.querySelector(".info-menu-button-v54");

        const panel =
            menu.querySelector(".info-menu-panel-v54");

        const kvkkButton =
            menu.querySelector(".info-kvkk-button-v54");

        const kvkkSubmenu =
            menu.querySelector(".info-kvkk-submenu-v54");

        if (mainButton) {
            mainButton.setAttribute("aria-expanded", "false");
        }

        if (panel) {
            panel.setAttribute("aria-hidden", "true");
        }

        if (kvkkButton) {
            kvkkButton.setAttribute("aria-expanded", "false");
            kvkkButton.classList.remove("active");
        }

        if (kvkkSubmenu) {
            kvkkSubmenu.setAttribute("aria-hidden", "true");
        }
    }

    function closeOtherInfoMenus(currentMenu) {
        infoMenus.forEach(menu => {
            if (menu !== currentMenu) {
                closeInfoMenu(menu);
            }
        });
    }

    infoMenus.forEach(menu => {

        const mainButton =
            menu.querySelector(".info-menu-button-v54");

        const panel =
            menu.querySelector(".info-menu-panel-v54");

        const kvkkButton =
            menu.querySelector(".info-kvkk-button-v54");

        const kvkkSubmenu =
            menu.querySelector(".info-kvkk-submenu-v54");

        const privacyButtons =
            menu.querySelectorAll(".info-open-privacy-v54");

        if (mainButton && panel) {
            mainButton.addEventListener("click", event => {
                event.preventDefault();
                event.stopPropagation();

                const willOpen =
                    !menu.classList.contains("open");

                closeOtherInfoMenus(menu);

                menu.classList.toggle("open", willOpen);

                mainButton.setAttribute(
                    "aria-expanded",
                    willOpen ? "true" : "false"
                );

                panel.setAttribute(
                    "aria-hidden",
                    willOpen ? "false" : "true"
                );

                if (!willOpen) {
                    menu.classList.remove("kvkk-open");

                    if (kvkkButton) {
                        kvkkButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                        kvkkButton.classList.remove("active");
                    }

                    if (kvkkSubmenu) {
                        kvkkSubmenu.setAttribute(
                            "aria-hidden",
                            "true"
                        );
                    }
                }
            });
        }

        if (kvkkButton && kvkkSubmenu) {
            kvkkButton.addEventListener("click", event => {
                event.preventDefault();
                event.stopPropagation();

                const willOpen =
                    !menu.classList.contains("kvkk-open");

                menu.classList.toggle("kvkk-open", willOpen);

                kvkkButton.classList.toggle("active", willOpen);

                kvkkButton.setAttribute(
                    "aria-expanded",
                    willOpen ? "true" : "false"
                );

                kvkkSubmenu.setAttribute(
                    "aria-hidden",
                    willOpen ? "false" : "true"
                );
            });
        }

        privacyButtons.forEach(button => {
            button.addEventListener("click", event => {
                event.preventDefault();
                event.stopPropagation();

                const targetId =
                    button.dataset.privacyTarget || "";

                closeInfoMenu(menu);

                if (typeof openPrivacyModal === "function") {
                    openPrivacyModal();

                    if (targetId) {
                        window.setTimeout(() => {
                            const targetSection =
                                document.getElementById(targetId);

                            if (targetSection) {
                                targetSection.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start"
                                });
                            }
                        }, 80);
                    }
                }
            });
        });
    });

    document.addEventListener("click", event => {
        infoMenus.forEach(menu => {
            if (!menu.contains(event.target)) {
                closeInfoMenu(menu);
            }
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            infoMenus.forEach(closeInfoMenu);
        }
    });

})();


// =========================================================
// V56 - 4 AYRI KVKK BELGESİ
// =========================================================

(function () {

    const legalPage =
        document.getElementById("legalPageV56");

    const legalTitle =
        document.getElementById("legalPageTitleV56");

    const legalDocs =
        document.querySelectorAll("[data-legal-doc-page]");

    const legalSwitchButtons =
        document.querySelectorAll("[data-legal-switch]");

    const legalOpenButtons =
        document.querySelectorAll(".info-legal-open-v56");

    const legalHomeButton =
        document.getElementById("legalHomeButtonV56");

    const titles = {
        "aydinlatma": "Aydınlatma Metni",
        "politika": "Kişisel Verilerin İşlenmesi ve Korunması Politikası",
        "cerez": "Çerez Politikası",
        "acik-riza": "Açık Rıza Metni"
    };

    function closeAllInfoMenusV56() {
        document.querySelectorAll(".info-menu-v54").forEach(menu => {
            menu.classList.remove("open", "kvkk-open");

            const mainButton = menu.querySelector(".info-menu-button-v54");
            const panel = menu.querySelector(".info-menu-panel-v54");
            const kvkkButton = menu.querySelector(".info-kvkk-button-v54");
            const submenu = menu.querySelector(".info-kvkk-submenu-v54");

            if (mainButton) mainButton.setAttribute("aria-expanded", "false");
            if (panel) panel.setAttribute("aria-hidden", "true");

            if (kvkkButton) {
                kvkkButton.setAttribute("aria-expanded", "false");
                kvkkButton.classList.remove("active");
            }

            if (submenu) submenu.setAttribute("aria-hidden", "true");
        });
    }

    function setLegalDocument(docName) {
        const selected = titles[docName] ? docName : "aydinlatma";

        legalDocs.forEach(doc => {
            doc.classList.toggle(
                "active",
                doc.dataset.legalDocPage === selected
            );
        });

        legalSwitchButtons.forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.legalSwitch === selected
            );
        });

        if (legalTitle) legalTitle.textContent = titles[selected];

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function openLegalPage(docName) {
        if (!legalPage) return;

        document.body.classList.remove(
            "treatment-page-open",
            "treatment-nav-scrolled",
            "pain-page-open",
            "pain-nav-scrolled",
            "about-page-open",
            "about-nav-scrolled",
            "media-page-open",
            "media-nav-scrolled"
        );

        document.body.classList.add("legal-page-open-v56");
        legalPage.setAttribute("aria-hidden", "false");

        closeAllInfoMenusV56();
        setLegalDocument(docName);

        history.pushState(
            { page: "kvkk", doc: docName },
            "",
            "#kvkk-" + docName
        );
    }

    function closeLegalPage() {
        document.body.classList.remove("legal-page-open-v56");

        if (legalPage) legalPage.setAttribute("aria-hidden", "true");

        history.pushState(
            { page: "home" },
            "",
            location.pathname + location.search
        );

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    legalOpenButtons.forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            openLegalPage(
                button.dataset.legalDoc || "aydinlatma"
            );
        });
    });

    legalSwitchButtons.forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();

            const doc =
                button.dataset.legalSwitch || "aydinlatma";

            setLegalDocument(doc);

            history.replaceState(
                { page: "kvkk", doc },
                "",
                "#kvkk-" + doc
            );
        });
    });

    if (legalHomeButton) {
        legalHomeButton.addEventListener("click", event => {
            event.preventDefault();
            closeLegalPage();
        });
    }

    if (
        location.hash &&
        location.hash.startsWith("#kvkk-") &&
        legalPage
    ) {
        const doc =
            location.hash.replace("#kvkk-", "");

        document.body.classList.add("legal-page-open-v56");
        legalPage.setAttribute("aria-hidden", "false");
        setLegalDocument(doc);
    }

})();


// =========================================================
// V72 - TEDAVİ DETAYLARI: OSTEOPATİ / FİTOTERAPİ / İĞNE / DAMAR YOLU
// =========================================================

(function () {

    const detailPage =
        document.getElementById("treatmentDetailPageV71");

    const detailLinks =
        document.querySelectorAll("[data-treatment-detail]");

    const detailViews =
        document.querySelectorAll("[data-treatment-detail-view]");

    const treatmentTopMenu =
        document.getElementById("treatmentTopMenuV74");

    const treatmentTopMenuButton =
        document.getElementById("treatmentTopMenuButtonV74");

    const treatmentTopMenuPanel =
        document.getElementById("treatmentTopMenuPanelV74");

    const treatmentTopOptions =
        document.querySelectorAll("[data-treatment-top]");

    const homeButton =
        document.getElementById("treatmentDetailHomeV71");

    const areasButton =
        document.getElementById("treatmentDetailAreasV71");

    const painButton =
        document.getElementById("treatmentDetailPainV71");

    const mediaButton =
        document.getElementById("treatmentDetailMediaV71");

    const validTreatments =
        new Set(["osteopati", "fitoterapi", "geleneksel-tedavi", "igne", "estetik", "damar-yolu"]);

    function hideOtherPagesV71() {

        document.body.classList.remove(
            "treatment-page-open",
            "treatment-nav-scrolled",
            "pain-page-open",
            "pain-nav-scrolled",
            "about-page-open",
            "about-nav-scrolled",
            "media-page-open",
            "media-nav-scrolled",
            "legal-page-open-v56",
            "ankilozan-page-open-v87",
            "general-health-detail-open-v75"
        );

        const pages = [
            document.getElementById("tedaviAlanlariPage"),
            document.getElementById("agriPage"),
            document.getElementById("hakkimdaPage"),
            document.getElementById("medyaPage"),
            document.getElementById("legalPageV56"),
            document.getElementById("ankilozanFaqSectionV85"),
            document.getElementById("generalHealthDetailPageV75")
        ];

        pages.forEach(page => {
            if (page) {
                page.setAttribute("aria-hidden", "true");
            }
        });
    }

    function setTreatmentViewV71(name) {

        const selected =
            validTreatments.has(name) ? name : "osteopati";

        detailViews.forEach(view => {
            view.classList.toggle(
                "active",
                view.dataset.treatmentDetailView === selected
            );
        });

        treatmentTopOptions.forEach(button => {
            button.classList.toggle(
                "is-current-v74",
                button.dataset.treatmentTop === selected
            );
        });

        return selected;
    }

    function openTreatmentDetailV71(name) {

        if (!detailPage) {
            return;
        }

        hideOtherPagesV71();

        const selected =
            setTreatmentViewV71(name);

        document.body.classList.add(
            "treatment-detail-open-v71"
        );

        detailPage.setAttribute(
            "aria-hidden",
            "false"
        );

        /* V101: Osteopati görünümündeki hareketli videoyu güvenli biçimde başlat */
        if (selected === "osteopati") {
            const osteopathyVideoV101 =
                detailPage.querySelector(
                    '.osteopathy-page-v95 video'
                );

            if (osteopathyVideoV101) {
                osteopathyVideoV101.muted = true;
                const playPromiseV101 =
                    osteopathyVideoV101.play();

                if (
                    playPromiseV101 &&
                    typeof playPromiseV101.catch === "function"
                ) {
                    playPromiseV101.catch(() => {});
                }
            }
        }

        history.pushState(
            {
                page: "treatment-detail",
                treatment: selected
            },
            "",
            "#" + selected
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function closeTreatmentDetailV71() {

        document.body.classList.remove(
            "treatment-detail-open-v71"
        );

        if (detailPage) {
            detailPage.setAttribute(
                "aria-hidden",
                "true"
            );
        }
    }

    function closeTreatmentTopMenuV74() {

        if (
            !treatmentTopMenu ||
            !treatmentTopMenuButton ||
            !treatmentTopMenuPanel
        ) {
            return;
        }

        treatmentTopMenu.classList.remove("open");
        treatmentTopMenuButton.setAttribute("aria-expanded", "false");
        treatmentTopMenuPanel.setAttribute("aria-hidden", "true");
    }

    if (treatmentTopMenuButton) {

        treatmentTopMenuButton.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            const willOpen =
                !treatmentTopMenu.classList.contains("open");

            treatmentTopMenu.classList.toggle("open", willOpen);

            treatmentTopMenuButton.setAttribute(
                "aria-expanded",
                willOpen ? "true" : "false"
            );

            treatmentTopMenuPanel.setAttribute(
                "aria-hidden",
                willOpen ? "false" : "true"
            );
        });
    }

    treatmentTopOptions.forEach(button => {

        button.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            const treatment =
                button.dataset.treatmentTop;

            if (!validTreatments.has(treatment)) {
                return;
            }

            closeTreatmentTopMenuV74();
            openTreatmentDetailV71(treatment);
        });
    });

    document.addEventListener("click", event => {

        if (
            treatmentTopMenu &&
            !treatmentTopMenu.contains(event.target)
        ) {
            closeTreatmentTopMenuV74();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeTreatmentTopMenuV74();
        }
    });

    detailLinks.forEach(link => {

        link.addEventListener("click", event => {

            const treatment =
                link.dataset.treatmentDetail;

            if (!validTreatments.has(treatment)) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            /* Üst dropdownu kapat */
            const parentMenu =
                link.closest(".hero-treatment-menu, .treatment-page-nav-item, .pain-page-nav-item");

            if (parentMenu) {
                parentMenu.classList.remove("open");
            }

            openTreatmentDetailV71(treatment);
        });
    });

    if (homeButton) {
        homeButton.addEventListener("click", event => {
            event.preventDefault();

            closeTreatmentDetailV71();

            history.pushState(
                { page: "home" },
                "",
                location.pathname + location.search
            );

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    if (areasButton) {
        areasButton.addEventListener("click", event => {
            event.preventDefault();

            closeTreatmentDetailV71();

            if (typeof openTreatmentPage === "function") {
                openTreatmentPage();
            }
        });
    }

    if (painButton) {
        painButton.addEventListener("click", event => {
            event.preventDefault();

            closeTreatmentDetailV71();

            const painPageLocal =
                document.getElementById("agriPage");

            if (painPageLocal) {
                document.body.classList.add("pain-page-open");
                painPageLocal.setAttribute("aria-hidden", "false");

                history.pushState(
                    { page: "agri" },
                    "",
                    "#agri"
                );

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        });
    }

    if (mediaButton) {
        mediaButton.addEventListener("click", event => {
            event.preventDefault();

            closeTreatmentDetailV71();

            const mediaPageLocal =
                document.getElementById("medyaPage");

            if (mediaPageLocal) {
                document.body.classList.add("media-page-open");
                mediaPageLocal.setAttribute("aria-hidden", "false");

                history.pushState(
                    { page: "medya" },
                    "",
                    "#medya"
                );

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        });
    }

    /* Doğrudan URL/hash ile açılabilsin */
    const initialHash =
        location.hash.replace("#", "");

    if (
        validTreatments.has(initialHash) &&
        detailPage
    ) {
        openTreatmentDetailV71(initialHash);
    }

})();


// =========================================================
// V138 - GENEL SAĞLIK DETAYLARI: BESLENME / SUPPLEMENTLER / DETOKS KÜRLERİ / EGZERSİZLER
// =========================================================
(function () {

    const healthDetailPage =
        document.getElementById("generalHealthDetailPageV75");

    const healthDetailLinks =
        document.querySelectorAll("[data-health-detail]");

    const healthViews =
        document.querySelectorAll("[data-health-detail-view]");

    const healthTopMenu =
        document.getElementById("healthTopMenuV75");

    const healthTopMenuButton =
        document.getElementById("healthTopMenuButtonV75");

    const healthTopMenuPanel =
        document.getElementById("healthTopMenuPanelV75");

    const healthTopOptions =
        document.querySelectorAll("[data-health-top]");

    const homeButton =
        document.getElementById("healthDetailHomeV75");

    const areasButton =
        document.getElementById("healthDetailAreasV75");

    const painButton =
        document.getElementById("healthDetailPainV75");

    const mediaButton =
        document.getElementById("healthDetailMediaV75");

    const validHealthSections =
        new Set(["beslenme", "supplementler", "kurler", "egzersizler"]);

    function closeHealthTopMenuV75() {
        if (!healthTopMenu || !healthTopMenuButton || !healthTopMenuPanel) {
            return;
        }

        healthTopMenu.classList.remove("open");
        healthTopMenuButton.setAttribute("aria-expanded", "false");
        healthTopMenuPanel.setAttribute("aria-hidden", "true");
    }

    function hideOtherPagesV75() {
        document.body.classList.remove(
            "treatment-page-open",
            "treatment-nav-scrolled",
            "pain-page-open",
            "pain-nav-scrolled",
            "about-page-open",
            "about-nav-scrolled",
            "media-page-open",
            "media-nav-scrolled",
            "legal-page-open-v56",
            "treatment-detail-open-v71",
            "general-health-detail-open-v75"
        );

        [
            document.getElementById("tedaviAlanlariPage"),
            document.getElementById("agriPage"),
            document.getElementById("hakkimdaPage"),
            document.getElementById("medyaPage"),
            document.getElementById("legalPageV56"),
            document.getElementById("treatmentDetailPageV71"),
            document.getElementById("generalHealthDetailPageV75")
        ].forEach(page => {
            if (page) {
                page.setAttribute("aria-hidden", "true");
            }
        });
    }

    function setHealthViewV75(name) {
        const selected =
            validHealthSections.has(name) ? name : "beslenme";

        healthViews.forEach(view => {
            view.classList.toggle(
                "active",
                view.dataset.healthDetailView === selected
            );
        });

        healthTopOptions.forEach(button => {
            button.classList.toggle(
                "is-current-v75",
                button.dataset.healthTop === selected
            );
        });

        return selected;
    }

    function openGeneralHealthDetailV75(name) {
        if (!healthDetailPage) {
            return;
        }

        hideOtherPagesV75();

        const selected = setHealthViewV75(name);

        document.body.classList.add("general-health-detail-open-v75");
        healthDetailPage.setAttribute("aria-hidden", "false");

        history.pushState(
            {
                page: "general-health-detail",
                topic: selected
            },
            "",
            "#" + selected
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function closeGeneralHealthDetailV75() {
        document.body.classList.remove("general-health-detail-open-v75");

        if (healthDetailPage) {
            healthDetailPage.setAttribute("aria-hidden", "true");
        }

        closeHealthTopMenuV75();
    }

    function openSimplePageV75(pageId, bodyClass, hash) {
        hideOtherPagesV75();

        const page = document.getElementById(pageId);

        if (page) {
            document.body.classList.add(bodyClass);
            page.setAttribute("aria-hidden", "false");

            history.pushState({ page: hash.replace("#", "") }, "", hash);

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }

    if (healthTopMenuButton) {
        healthTopMenuButton.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            const willOpen =
                !healthTopMenu.classList.contains("open");

            healthTopMenu.classList.toggle("open", willOpen);
            healthTopMenuButton.setAttribute("aria-expanded", willOpen ? "true" : "false");
            healthTopMenuPanel.setAttribute("aria-hidden", willOpen ? "false" : "true");
        });
    }

    healthTopOptions.forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            const topic = button.dataset.healthTop;

            if (!validHealthSections.has(topic)) {
                return;
            }

            closeHealthTopMenuV75();
            openGeneralHealthDetailV75(topic);
        });
    });

    healthDetailLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();

            const topic = link.dataset.healthDetail;

            if (!validHealthSections.has(topic)) {
                return;
            }

            openGeneralHealthDetailV75(topic);
        });
    });

    document.addEventListener("click", event => {
        if (healthTopMenu && !healthTopMenu.contains(event.target)) {
            closeHealthTopMenuV75();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeHealthTopMenuV75();
        }
    });

    if (homeButton) {
        homeButton.addEventListener("click", event => {
            event.preventDefault();
            closeGeneralHealthDetailV75();

            history.pushState({ page: "home" }, "", "#ana-sayfa");
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    if (areasButton) {
        areasButton.addEventListener("click", event => {
            event.preventDefault();
            openSimplePageV75("tedaviAlanlariPage", "treatment-page-open", "#tedavi-alanlari");
        });
    }

    if (painButton) {
        painButton.addEventListener("click", event => {
            event.preventDefault();
            openSimplePageV75("agriPage", "pain-page-open", "#agri");
        });
    }

    if (mediaButton) {
        mediaButton.addEventListener("click", event => {
            event.preventDefault();
            openSimplePageV75("medyaPage", "media-page-open", "#medya");
        });
    }

    const initialHash =
        location.hash.replace("#", "");

    if (validHealthSections.has(initialHash) && healthDetailPage) {
        openGeneralHealthDetailV75(initialHash);
    }

})();


// =========================================================
// V84 - MEDYA SAYFASI GENEL SAĞLIK DROPDOWN
// =========================================================
(function () {

    const menu =
        document.getElementById("mediaHealthMenuV84");

    const button =
        document.getElementById("mediaHealthButtonV84");

    const dropdown =
        document.getElementById("mediaHealthDropdownV84");

    if (!menu || !button || !dropdown) {
        return;
    }

    function closeMediaHealthMenuV84() {
        menu.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        dropdown.setAttribute("aria-hidden", "true");
    }

    button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        const willOpen =
            !menu.classList.contains("open");

        menu.classList.toggle("open", willOpen);

        button.setAttribute(
            "aria-expanded",
            willOpen ? "true" : "false"
        );

        dropdown.setAttribute(
            "aria-hidden",
            willOpen ? "false" : "true"
        );
    });

    dropdown.addEventListener("click", () => {
        closeMediaHealthMenuV84();
    });

    document.addEventListener("click", event => {
        if (!menu.contains(event.target)) {
            closeMediaHealthMenuV84();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMediaHealthMenuV84();
        }
    });

})();


// =========================================================
// V85 - ANA SAYFA ANKİLOZAN SPONDİLİT HERO + SSS
// =========================================================
(function () {
    const faqSection = document.getElementById('ankilozanFaqSectionV85');
    const heroTitleButton = document.getElementById('ankilozanHeroButtonV85');
    const openButtons = document.querySelectorAll('.js-open-ankilozan-v85');
    const faqQuestions = document.querySelectorAll('.ankilozan-faq-question-v85');

    function openAnkilozanSectionV85() {
        if (!faqSection) return;
        faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (heroTitleButton) {
        heroTitleButton.addEventListener('click', openAnkilozanSectionV85);
    }

    openButtons.forEach(button => {
        button.addEventListener('click', openAnkilozanSectionV85);
    });

    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.ankilozan-faq-item-v85');
            if (!item) return;
            const isOpen = item.classList.contains('is-open');

            faqQuestions.forEach(otherButton => {
                const otherItem = otherButton.closest('.ankilozan-faq-item-v85');
                if (!otherItem) return;
                otherItem.classList.remove('is-open');
                otherButton.setAttribute('aria-expanded', 'false');
            });

            if (!isOpen) {
                item.classList.add('is-open');
                button.setAttribute('aria-expanded', 'true');
            }
        });
    });
})();


// =========================================================
// V86 - ANA HERO: DOKTOR VARSAYILAN, AS İSTEĞE BAĞLI
// =========================================================
(function () {

    const slider = document.getElementById("heroSliderV86");
    const doctorSlide = slider
        ? slider.querySelector('[data-hero-slide="doctor"]')
        : null;
    const asSlide = slider
        ? slider.querySelector('[data-hero-slide="ankilozan"]')
        : null;

    const nextButton = document.getElementById("heroNextV86");
    const prevButton = document.getElementById("heroPrevV86");

    if (!doctorSlide || !asSlide) return;

    function showDoctorSlideV86() {
        doctorSlide.classList.add("is-active");
        doctorSlide.removeAttribute("aria-hidden");

        asSlide.classList.remove("is-active");
        asSlide.setAttribute("aria-hidden", "true");
    }

    function showAnkilozanSlideV86() {
        asSlide.classList.add("is-active");
        asSlide.removeAttribute("aria-hidden");

        doctorSlide.classList.remove("is-active");
        doctorSlide.setAttribute("aria-hidden", "true");
    }

    if (nextButton) {
        nextButton.addEventListener("click", showAnkilozanSlideV86);
    }

    if (prevButton) {
        prevButton.addEventListener("click", showDoctorSlideV86);
    }

    // Sayfa her açıldığında ilk görünen ekran daima doktor olsun.
    showDoctorSlideV86();

})();


// =========================================================
// V87 - ANKİLOZAN SPONDİLİT ÖZEL SAYFASI
// =========================================================
(function () {

    const page =
        document.getElementById("ankilozanFaqSectionV85");

    const heroTitle =
        document.getElementById("ankilozanHeroButtonV85");

    const openButtons =
        document.querySelectorAll(".js-open-ankilozan-v85");

    const treatmentCard =
        document.querySelector(".ankilozan-card-link-v87");

    const homeButton =
        document.getElementById("ankilozanHomeButtonV87");

    const treatmentAreasButton =
        document.getElementById("ankilozanTreatmentAreasButtonV87");

    const painButton =
        document.getElementById("ankilozanPainButtonV87");

    const mediaButton =
        document.getElementById("ankilozanMediaButtonV87");

    function closeOtherPagesV87() {

        document.body.classList.remove(
            "treatment-page-open",
            "treatment-nav-scrolled",
            "pain-page-open",
            "pain-nav-scrolled",
            "media-page-open",
            "about-page-open",
            "about-nav-scrolled",
            "legal-page-open-v56",
            "treatment-detail-open-v71",
            "general-health-detail-open-v75"
        );

        const otherPages = [
            document.getElementById("tedaviAlanlariPage"),
            document.getElementById("agriPage"),
            document.getElementById("medyaPage"),
            document.getElementById("hakkimdaPage")
        ];

        otherPages.forEach(item => {
            if (item) {
                item.setAttribute("aria-hidden", "true");
            }
        });
    }

    function openAnkilozanPageV87() {

        if (!page) return;

        closeOtherPagesV87();

        document.body.classList.add(
            "ankilozan-page-open-v87"
        );

        page.setAttribute(
            "aria-hidden",
            "false"
        );

        history.pushState(
            { page: "ankilozan-spondilit" },
            "",
            "#ankilozan-spondilit"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function closeAnkilozanPageV87() {

        if (!page) return;

        document.body.classList.remove(
            "ankilozan-page-open-v87"
        );

        page.setAttribute(
            "aria-hidden",
            "true"
        );

        history.pushState(
            { page: "home" },
            "",
            location.pathname + location.search
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // Hero'daki "Ankilozan Spondilit" yazısı
    if (heroTitle) {
        heroTitle.addEventListener(
            "click",
            event => {
                event.preventDefault();
                event.stopPropagation();
                openAnkilozanPageV87();
            },
            true
        );
    }

    // Hero içindeki Neden Olur / Belirtiler / Nasıl Geçer / İçeriği Aç
    openButtons.forEach(button => {
        button.addEventListener(
            "click",
            event => {
                event.preventDefault();
                event.stopPropagation();
                openAnkilozanPageV87();
            },
            true
        );
    });

    // Tedavi Alanları içindeki Ankilozan Spondilit kartı
    if (treatmentCard) {
        treatmentCard.addEventListener(
            "click",
            event => {
                event.preventDefault();
                openAnkilozanPageV87();
            }
        );
    }

    if (homeButton) {
        homeButton.addEventListener(
            "click",
            event => {
                event.preventDefault();
                closeAnkilozanPageV87();
            }
        );
    }

    if (treatmentAreasButton) {
        treatmentAreasButton.addEventListener(
            "click",
            event => {
                event.preventDefault();

                document.body.classList.remove(
                    "ankilozan-page-open-v87"
                );

                if (page) {
                    page.setAttribute(
                        "aria-hidden",
                        "true"
                    );
                }

                const target =
                    document.getElementById(
                        "tedaviAlanlariPage"
                    );

                if (target) {
                    target.setAttribute(
                        "aria-hidden",
                        "false"
                    );
                }

                document.body.classList.add(
                    "treatment-page-open"
                );

                history.pushState(
                    { page: "tedavi-alanlari" },
                    "",
                    "#tedavi-alanlari"
                );

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        );
    }

    if (painButton) {
        painButton.addEventListener(
            "click",
            event => {
                event.preventDefault();

                document.body.classList.remove(
                    "ankilozan-page-open-v87"
                );

                if (page) {
                    page.setAttribute(
                        "aria-hidden",
                        "true"
                    );
                }

                const target =
                    document.getElementById(
                        "agriPage"
                    );

                if (target) {
                    target.setAttribute(
                        "aria-hidden",
                        "false"
                    );
                }

                document.body.classList.add(
                    "pain-page-open"
                );

                history.pushState(
                    { page: "agri" },
                    "",
                    "#agri"
                );

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        );
    }

    if (mediaButton) {
        mediaButton.addEventListener(
            "click",
            event => {
                event.preventDefault();

                document.body.classList.remove(
                    "ankilozan-page-open-v87"
                );

                if (page) {
                    page.setAttribute(
                        "aria-hidden",
                        "true"
                    );
                }

                const target =
                    document.getElementById(
                        "medyaPage"
                    );

                if (target) {
                    target.setAttribute(
                        "aria-hidden",
                        "false"
                    );
                }

                document.body.classList.add(
                    "media-page-open"
                );

                history.pushState(
                    { page: "medya" },
                    "",
                    "#medya"
                );

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        );
    }

    // Doğrudan #ankilozan-spondilit URL'si ile açılırsa sayfayı getir
    if (
        location.hash ===
        "#ankilozan-spondilit"
    ) {
        setTimeout(
            openAnkilozanPageV87,
            0
        );
    }

})();


// =========================================================
// V88 - ANKİLOZAN SAYFASI GENEL SAĞLIK DROPDOWN
// =========================================================
(function () {

    const menu =
        document.getElementById("ankilozanHealthMenuV88");

    const button =
        document.getElementById("ankilozanHealthButtonV88");

    const dropdown =
        document.getElementById("ankilozanHealthDropdownV88");

    if (!menu || !button || !dropdown) {
        return;
    }

    function closeMenuV88() {
        menu.classList.remove("open");

        button.setAttribute(
            "aria-expanded",
            "false"
        );

        dropdown.setAttribute(
            "aria-hidden",
            "true"
        );
    }

    button.addEventListener(
        "click",
        event => {
            event.preventDefault();
            event.stopPropagation();

            const willOpen =
                !menu.classList.contains("open");

            menu.classList.toggle(
                "open",
                willOpen
            );

            button.setAttribute(
                "aria-expanded",
                willOpen ? "true" : "false"
            );

            dropdown.setAttribute(
                "aria-hidden",
                willOpen ? "false" : "true"
            );
        }
    );

    dropdown.addEventListener(
        "click",
        () => {
            closeMenuV88();
        }
    );

    document.addEventListener(
        "click",
        event => {
            if (!menu.contains(event.target)) {
                closeMenuV88();
            }
        }
    );

    document.addEventListener(
        "keydown",
        event => {
            if (event.key === "Escape") {
                closeMenuV88();
            }
        }
    );

})();


// =========================================================
// V90 - GÜVENLİ SCROLL ANİMASYONLARI
// Hero ve üst menü yapısını ASLA gizlemez/değiştirmez.
// =========================================================
(function () {

    const revealSelector = [
        ".treatment-card-v77",
        ".pain-card-v76",
        ".serum-card-v71",
        ".injection-card-v72",
        ".detail-card",
        ".service-info-card",
        ".location-info-card",
        ".map-card",
        ".general-health-empty-card-v75",
        ".ankilozan-faq-item-v85",
        ".section-heading"
    ].join(",");

    const revealItems =
        Array.from(document.querySelectorAll(revealSelector));

    revealItems.forEach((item, index) => {
        item.classList.add("v90-reveal");
        item.style.transitionDelay =
            Math.min((index % 4) * 65, 195) + "ms";
    });

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-visible");
                            revealObserver.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.10,
                    rootMargin: "0px 0px -5% 0px"
                }
            );

        revealItems.forEach(item => {
            revealObserver.observe(item);
        });

    } else {

        revealItems.forEach(item => {
            item.classList.add("is-visible");
        });

    }

    function updateV90ScrollState() {
        document.body.classList.toggle(
            "v90-scrolled",
            window.scrollY > 70
        );
    }

    updateV90ScrollState();

    window.addEventListener(
        "scroll",
        updateV90ScrollState,
        { passive: true }
    );

})();


// =========================================================
// V103 - GEÇİŞ / REVEAL ANİMASYONLARINI GERİ YÜKLE
// =========================================================
(function () {
    const selector = [
        ".treatment-card-v77",
        ".pain-card-v76",
        ".serum-card-v71",
        ".injection-card-v72",
        ".detail-card",
        ".service-info-card",
        ".location-info-card",
        ".map-card",
        ".general-health-empty-card-v75",
        ".ankilozan-faq-item-v85",
        ".section-heading",
        ".osteopathy-info-card-v95"
    ].join(",");

    const seen = new WeakSet();

    const observer = ("IntersectionObserver" in window)
        ? new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("v103-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: "0px 0px -4% 0px"
        })
        : null;

    function prepareRevealItems(root = document) {
        const items = Array.from(root.querySelectorAll(selector));

        items.forEach((item, index) => {
            if (seen.has(item)) return;

            seen.add(item);
            item.classList.add("v103-reveal");
            item.style.transitionDelay =
                Math.min((index % 4) * 65, 195) + "ms";

            if (observer) {
                observer.observe(item);
            } else {
                item.classList.add("v103-visible");
            }
        });
    }

    function replayVisiblePageAnimation() {
        const candidates = [
            document.querySelector(".treatment-page"),
            document.querySelector(".pain-page"),
            document.querySelector(".media-page-v48"),
            document.querySelector(".about-page-v47"),
            document.querySelector(".legal-page-v56"),
            document.querySelector(".treatment-detail-page-v71"),
            document.querySelector(".general-health-detail-page-v75"),
            document.querySelector(".ankilozan-page-v87")
        ].filter(Boolean);

        candidates.forEach(page => {
            const hidden =
                page.getAttribute("aria-hidden") === "true" ||
                getComputedStyle(page).display === "none";

            if (!hidden) {
                page.style.animation = "none";
                void page.offsetWidth;
                page.style.animation = "";
            }
        });

        prepareRevealItems(document);
    }

    prepareRevealItems(document);

    const bodyObserver = new MutationObserver(mutations => {
        const changed = mutations.some(m =>
            m.type === "attributes" &&
            (m.attributeName === "class" || m.attributeName === "aria-hidden")
        );

        if (changed) {
            requestAnimationFrame(replayVisiblePageAnimation);
        }
    });

    bodyObserver.observe(document.body, {
        attributes: true,
        subtree: true,
        attributeFilter: ["class", "aria-hidden"]
    });
})();


// =========================================================
// V105 - OSTEOPATİ SAYFA İÇİ SEKME / FAQ ETKİLEŞİMLERİ
// =========================================================
(function () {
    const osteoPage = document.querySelector('.osteopathy-page-v95');
    if (!osteoPage) return;

    const localButtons = Array.from(
        osteoPage.querySelectorAll('[data-osteo-scroll]')
    );

    function scrollToOsteoTarget(id) {
        const target = document.getElementById(id);
        if (!target) return;

        const y = target.getBoundingClientRect().top + window.scrollY - 145;
        window.scrollTo({
            top: Math.max(0, y),
            behavior: 'smooth'
        });
    }

    localButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.osteoScroll;
            scrollToOsteoTarget(id);

            localButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    const faqItems = Array.from(
        osteoPage.querySelectorAll('.osteo-faq-item-v105')
    );

    faqItems.forEach(item => {
        const button = item.querySelector('button');
        const answer = item.querySelector('.osteo-faq-answer-v105');
        if (!button || !answer) return;

        button.addEventListener('click', () => {
            const willOpen = !item.classList.contains('open');

            faqItems.forEach(other => {
                other.classList.remove('open');
                const otherButton = other.querySelector('button');
                const otherAnswer = other.querySelector('.osteo-faq-answer-v105');
                if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
                if (otherAnswer) otherAnswer.style.maxHeight = null;
            });

            if (willOpen) {
                item.classList.add('open');
                button.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    const trackedSections = [
        'osteoExercisesV105',
        'osteoPhysicalV105',
        'osteoChiroV105',
        'osteoFaqV105',
        'osteoArticlesV105',
        'osteoSportsV105'
    ]
        .map(id => document.getElementById(id))
        .filter(Boolean);

    if ('IntersectionObserver' in window && trackedSections.length) {
        const sectionObserver = new IntersectionObserver(entries => {
            const visible = entries
                .filter(entry => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (!visible) return;

            localButtons.forEach(button => {
                button.classList.toggle(
                    'active',
                    button.dataset.osteoScroll === visible.target.id
                );
            });
        }, {
            threshold: [0.15, 0.35, 0.55],
            rootMargin: '-120px 0px -55% 0px'
        });

        trackedSections.forEach(section => sectionObserver.observe(section));
    }
})();




// =========================================================
// V107 - OSTEOPATİ "AĞRI" = ANA AĞRI SAYFASI
// Osteopati içindeki eski Ağrı bölümü artık kullanılmaz.
// =========================================================
(function () {
    const osteoPainButton =
        document.getElementById("osteoGlobalPainButtonV107");

    const painPage =
        document.getElementById("agriPage");

    const treatmentDetailPage =
        document.getElementById("treatmentDetailPageV71");

    if (!osteoPainButton || !painPage) {
        return;
    }

    function closeOtherSpecialPagesV107() {
        document.body.classList.remove(
            "treatment-detail-open-v71",
            "treatment-detail-nav-scrolled-v71",
            "treatment-page-open",
            "treatment-nav-scrolled",
            "general-health-detail-open-v75",
            "ankilozan-page-open-v87",
            "media-page-open",
            "media-nav-scrolled",
            "about-page-open",
            "about-nav-scrolled",
            "legal-page-open-v56"
        );

        const pagesToHide = [
            treatmentDetailPage,
            document.getElementById("tedaviAlanlariPage"),
            document.getElementById("hakkimdaPage"),
            document.getElementById("medyaPage"),
            document.getElementById("legalPageV56"),
            document.getElementById("generalHealthDetailPageV75"),
            document.getElementById("ankilozanFaqSectionV85")
        ];

        pagesToHide.forEach(page => {
            if (page) {
                page.setAttribute("aria-hidden", "true");
            }
        });
    }

    osteoPainButton.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        closeOtherSpecialPagesV107();

        document.body.classList.add("pain-page-open");
        painPage.setAttribute("aria-hidden", "false");

        history.pushState(
            { page: "agri" },
            "",
            "#agri"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
})();


// =========================================================
// V110 - TÜM ANA SEKMELERE 1.5 SN MODERN GEÇİŞ
// =========================================================
(function () {
    const overlay =
        document.getElementById("sitePageTransitionV110");

    const kickerNode =
        document.getElementById("siteTransitionKickerV110");

    const titleNode =
        document.getElementById("siteTransitionTitleV110");

    const subtitleNode =
        document.getElementById("siteTransitionSubtitleV110");

    if (!overlay || !kickerNode || !titleNode || !subtitleNode) {
        return;
    }

    const treatmentMeta = {
        "osteopati": {
            kicker: "TEDAVİ",
            title: "Osteopati",
            subtitle: "Bütüncül hareket ve manuel değerlendirme"
        },
        "fitoterapi": {
            kicker: "TEDAVİ",
            title: "Fitoterapi - Beslenme",
            subtitle: "Bitkisel içerikler, beslenme ve kişiye özel değerlendirme"
        },
        "igne": {
            kicker: "TEDAVİ",
            title: "İğneli Uygulamalar",
            subtitle: "Girişimsel ve rejeneratif uygulamalar"
        },
        "estetik": {
            kicker: "TEDAVİ",
            title: "Estetiğe Bakış",
            subtitle: "PRP, eksozom ve yenileyici estetik uygulamalar"
        },
        "damar-yolu": {
            kicker: "TEDAVİ",
            title: "Damar Yolu",
            subtitle: "Serum ve damar yolu uygulamaları"
        }
    };

    const healthMeta = {
        "beslenme": {
            kicker: "GENEL SAĞLIK",
            title: "Beslenme",
            subtitle: "Bütüncül beslenme değerlendirmesi"
        },
        "supplementler": {
            kicker: "GENEL SAĞLIK",
            title: "Supplementler",
            subtitle: "Destek ürünleri ve kişiye özel değerlendirme"
        },
        "kurler": {
            kicker: "GENEL SAĞLIK",
            title: "Detoks Kürleri",
            subtitle: "Bütüncül detoks ve destek programları"
        },
        "egzersizler": {
            kicker: "GENEL SAĞLIK",
            title: "Egzersizler",
            subtitle: "Hareket ve egzersiz önerileri"
        },
    };

    const legalMeta = {
        "aydinlatma": {
            kicker: "BİLGİ",
            title: "Aydınlatma Metni",
            subtitle: "Bilgilendirme ve yasal metin"
        },
        "politika": {
            kicker: "BİLGİ",
            title: "KVKK Politikası",
            subtitle: "Kişisel verilerin işlenmesi ve korunması"
        },
        "cerez": {
            kicker: "BİLGİ",
            title: "Çerez Politikası",
            subtitle: "Web sitesi kullanım bilgileri"
        },
        "acik-riza": {
            kicker: "BİLGİ",
            title: "Açık Rıza Metni",
            subtitle: "Kişisel veri bilgilendirmesi"
        }
    };

    const fixedIds = {
        "heroGeneralButtonV124": {
            kicker: "GENEL",
            title: "Öne Çıkanlar",
            subtitle: "Sitedeki öne çıkan içeriklere hızlı erişim"
        },
        "generalFeaturedHomeButtonV124": {
            kicker: "ANA SAYFA",
            title: "Ana Sayfa",
            subtitle: "Dr. Ceyhun Nuri"
        },
        "treatmentPageHomeButton": {
            kicker: "ANA SAYFA",
            title: "Ana Sayfa",
            subtitle: "Dr. Ceyhun Nuri"
        },
        "treatmentBackHome": {
            kicker: "ANA SAYFA",
            title: "Ana Sayfa",
            subtitle: "Dr. Ceyhun Nuri"
        },
        "painPageHomeButton": {
            kicker: "ANA SAYFA",
            title: "Ana Sayfa",
            subtitle: "Dr. Ceyhun Nuri"
        },
        "painBackHome": {
            kicker: "ANA SAYFA",
            title: "Ana Sayfa",
            subtitle: "Dr. Ceyhun Nuri"
        },
        "aboutPageHomeButton": {
            kicker: "ANA SAYFA",
            title: "Ana Sayfa",
            subtitle: "Dr. Ceyhun Nuri"
        },
        "mediaPageHomeButton": {
            kicker: "ANA SAYFA",
            title: "Ana Sayfa",
            subtitle: "Dr. Ceyhun Nuri"
        },
        "legalHomeButtonV56": {
            kicker: "ANA SAYFA",
            title: "Ana Sayfa",
            subtitle: "Dr. Ceyhun Nuri"
        },
        "treatmentDetailHomeV71": {
            kicker: "ANA SAYFA",
            title: "Ana Sayfa",
            subtitle: "Dr. Ceyhun Nuri"
        },
        "healthDetailHomeV75": {
            kicker: "ANA SAYFA",
            title: "Ana Sayfa",
            subtitle: "Dr. Ceyhun Nuri"
        },
        "ankilozanHomeButtonV87": {
            kicker: "ANA SAYFA",
            title: "Ana Sayfa",
            subtitle: "Dr. Ceyhun Nuri"
        },

        "heroDiseasesButton": {
            kicker: "KEŞFET",
            title: "Tedavi Alanları",
            subtitle: "Tedavi ve değerlendirme alanlarını keşfedin"
        },
        "painPageTreatmentAreasButton": {
            kicker: "KEŞFET",
            title: "Tedavi Alanları",
            subtitle: "Tedavi ve değerlendirme alanlarını keşfedin"
        },
        "aboutPageTreatmentAreasButton": {
            kicker: "KEŞFET",
            title: "Tedavi Alanları",
            subtitle: "Tedavi ve değerlendirme alanlarını keşfedin"
        },
        "mediaPageTreatmentAreasButton": {
            kicker: "KEŞFET",
            title: "Tedavi Alanları",
            subtitle: "Tedavi ve değerlendirme alanlarını keşfedin"
        },
        "ankilozanTreatmentAreasButtonV87": {
            kicker: "KEŞFET",
            title: "Tedavi Alanları",
            subtitle: "Tedavi ve değerlendirme alanlarını keşfedin"
        },
        "treatmentDetailAreasV71": {
            kicker: "KEŞFET",
            title: "Tedavi Alanları",
            subtitle: "Tedavi ve değerlendirme alanlarını keşfedin"
        },
        "healthDetailAreasV75": {
            kicker: "KEŞFET",
            title: "Tedavi Alanları",
            subtitle: "Tedavi ve değerlendirme alanlarını keşfedin"
        },

        "heroPainButton": {
            kicker: "DEĞERLENDİRME",
            title: "Ağrı",
            subtitle: "Ağrı bölgeleri ve değerlendirme seçenekleri"
        },
        "treatmentPagePainButton": {
            kicker: "DEĞERLENDİRME",
            title: "Ağrı",
            subtitle: "Ağrı bölgeleri ve değerlendirme seçenekleri"
        },
        "mediaPagePainButton": {
            kicker: "DEĞERLENDİRME",
            title: "Ağrı",
            subtitle: "Ağrı bölgeleri ve değerlendirme seçenekleri"
        },
        "aboutPagePainButton": {
            kicker: "DEĞERLENDİRME",
            title: "Ağrı",
            subtitle: "Ağrı bölgeleri ve değerlendirme seçenekleri"
        },
        "ankilozanPainButtonV87": {
            kicker: "DEĞERLENDİRME",
            title: "Ağrı",
            subtitle: "Ağrı bölgeleri ve değerlendirme seçenekleri"
        },
        "treatmentDetailPainV71": {
            kicker: "DEĞERLENDİRME",
            title: "Ağrı",
            subtitle: "Ağrı bölgeleri ve değerlendirme seçenekleri"
        },
        "healthDetailPainV75": {
            kicker: "DEĞERLENDİRME",
            title: "Ağrı",
            subtitle: "Ağrı bölgeleri ve değerlendirme seçenekleri"
        },
        "osteoGlobalPainButtonV107": {
            kicker: "DEĞERLENDİRME",
            title: "Ağrı",
            subtitle: "Ağrı bölgeleri ve değerlendirme seçenekleri"
        },

        "heroMediaButton": {
            kicker: "MEDYA",
            title: "Medya",
            subtitle: "TV programları, YouTube ve sosyal medya"
        },
        "treatmentPageMediaButton": {
            kicker: "MEDYA",
            title: "Medya",
            subtitle: "TV programları, YouTube ve sosyal medya"
        },
        "painPageMediaButton": {
            kicker: "MEDYA",
            title: "Medya",
            subtitle: "TV programları, YouTube ve sosyal medya"
        },
        "aboutPageMediaButton": {
            kicker: "MEDYA",
            title: "Medya",
            subtitle: "TV programları, YouTube ve sosyal medya"
        },
        "ankilozanMediaButtonV87": {
            kicker: "MEDYA",
            title: "Medya",
            subtitle: "TV programları, YouTube ve sosyal medya"
        },
        "treatmentDetailMediaV71": {
            kicker: "MEDYA",
            title: "Medya",
            subtitle: "TV programları, YouTube ve sosyal medya"
        },
        "healthDetailMediaV75": {
            kicker: "MEDYA",
            title: "Medya",
            subtitle: "TV programları, YouTube ve sosyal medya"
        },

        "heroAboutButton": {
            kicker: "BİLGİ",
            title: "Hakkımda",
            subtitle: "Dr. Ceyhun Nuri"
        }
    };

    const selectors = [
        "#heroGeneralButtonV124",
        "#generalFeaturedHomeButtonV124",
        "#treatmentPageHomeButton",
        "#treatmentBackHome",
        "#painPageHomeButton",
        "#painBackHome",
        "#aboutPageHomeButton",
        "#mediaPageHomeButton",
        "#legalHomeButtonV56",
        "#treatmentDetailHomeV71",
        "#healthDetailHomeV75",
        "#ankilozanHomeButtonV87",
        "[data-treatment-detail]",
        "[data-treatment-top]",
        "[data-health-detail]",
        ".info-legal-open-v56",
        "#heroDiseasesButton",
        "#painPageTreatmentAreasButton",
        "#aboutPageTreatmentAreasButton",
        "#mediaPageTreatmentAreasButton",
        "#ankilozanTreatmentAreasButtonV87",
        "#treatmentDetailAreasV71",
        "#healthDetailAreasV75",
        "#heroPainButton",
        "#treatmentPagePainButton",
        "#mediaPagePainButton",
        "#aboutPagePainButton",
        "#ankilozanPainButtonV87",
        "#treatmentDetailPainV71",
        "#healthDetailPainV75",
        "#osteoGlobalPainButtonV107",
        "#heroMediaButton",
        "#treatmentPageMediaButton",
        "#painPageMediaButton",
        "#aboutPageMediaButton",
        "#ankilozanMediaButtonV87",
        "#treatmentDetailMediaV71",
        "#healthDetailMediaV75",
        "#heroAboutButton"
    ].join(",");

    let running = false;
    let bypassTrigger = null;

    function getMeta(trigger) {
        if (!trigger) return null;

        const treatment =
            trigger.dataset.treatmentDetail ||
            trigger.dataset.treatmentTop;

        if (treatment && treatmentMeta[treatment]) {
            return treatmentMeta[treatment];
        }

        const health =
            trigger.dataset.healthDetail;

        if (health && healthMeta[health]) {
            return healthMeta[health];
        }

        const legal =
            trigger.dataset.legalDoc;

        if (legal && legalMeta[legal]) {
            return legalMeta[legal];
        }

        return fixedIds[trigger.id] || null;
    }

    function runTransition(meta, trigger) {
        if (running) return;

        const reduceMotion =
            window.matchMedia &&
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

        if (reduceMotion) {
            bypassTrigger = trigger;
            trigger.click();
            return;
        }

        running = true;

        kickerNode.textContent = meta.kicker || "BÖLÜM";
        titleNode.textContent = meta.title || "Sayfa";
        subtitleNode.textContent =
            meta.subtitle || "İçerik hazırlanıyor";

        document.body.classList.add(
            "site-transition-running-v110"
        );

        overlay.setAttribute(
            "aria-hidden",
            "false"
        );

        overlay.classList.remove(
            "is-running-v110"
        );

        void overlay.offsetWidth;

        overlay.classList.add(
            "is-running-v110"
        );

        // Geçişin tam ortasında gerçek sekme açılır.
        window.setTimeout(() => {
            bypassTrigger = trigger;
            trigger.click();
        }, 750);

        // Toplam 1.5 saniye.
        window.setTimeout(() => {
            overlay.classList.remove(
                "is-running-v110"
            );

            overlay.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.classList.remove(
                "site-transition-running-v110"
            );

            running = false;
        }, 1500);
    }

    document.addEventListener(
        "click",
        event => {
            if (
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
            ) {
                return;
            }

            if (!(event.target instanceof Element)) {
                return;
            }

            const trigger =
                event.target.closest(selectors);

            if (!trigger) {
                return;
            }

            // 750 ms'de yaptığımız programatik tıklamayı normal handler'a bırak.
            if (bypassTrigger === trigger) {
                bypassTrigger = null;
                return;
            }

            const meta = getMeta(trigger);

            if (!meta) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();

            runTransition(meta, trigger);
        },
        true
    );
})();


// =========================================================
// V116 - HAKKIMDA 3 SEKMELİ İÇERİK
// Varsayılan: Dr. Ceyhun Nuri Hakkında
// =========================================================
(function () {
    const page =
        document.getElementById("hakkimdaPage");

    if (!page) return;

    const buttons =
        Array.from(
            page.querySelectorAll(
                "[data-about-tab-v116]"
            )
        );

    const panels =
        Array.from(
            page.querySelectorAll(
                "[data-about-panel-v116]"
            )
        );

    function activateAboutTabV116(name, focusButton = false) {
        buttons.forEach(button => {
            const active =
                button.dataset.aboutTabV116 === name;

            button.classList.toggle(
                "active",
                active
            );

            button.setAttribute(
                "aria-selected",
                active ? "true" : "false"
            );

            if (active && focusButton) {
                button.focus({
                    preventScroll: true
                });
            }
        });

        panels.forEach(panel => {
            const active =
                panel.dataset.aboutPanelV116 === name;

            panel.classList.toggle(
                "active",
                active
            );

            panel.setAttribute(
                "aria-hidden",
                active ? "false" : "true"
            );
        });
    }

    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            activateAboutTabV116(
                button.dataset.aboutTabV116
            );
        });

        button.addEventListener("keydown", event => {
            if (
                event.key !== "ArrowRight" &&
                event.key !== "ArrowLeft"
            ) {
                return;
            }

            event.preventDefault();

            const direction =
                event.key === "ArrowRight"
                    ? 1
                    : -1;

            const nextIndex =
                (index + direction + buttons.length)
                % buttons.length;

            activateAboutTabV116(
                buttons[nextIndex]
                    .dataset.aboutTabV116,
                true
            );
        });
    });

    window.resetAboutTabsV116 =
        function () {
            activateAboutTabV116(
                "doctor"
            );
        };

    activateAboutTabV116(
        "doctor"
    );
})();


// =========================================================
// V124 - GENEL > ÖNE ÇIKANLAR
// =========================================================
(function () {
    const generalButton =
        document.getElementById("heroGeneralButtonV124");

    const featuredPage =
        document.getElementById("generalFeaturedPageV124");

    const homeButton =
        document.getElementById("generalFeaturedHomeButtonV124");

    const treatmentAreasButton =
        document.getElementById("generalFeaturedTreatmentAreasV124");

    const painButton =
        document.getElementById("generalFeaturedPainV124");

    const mediaButton =
        document.getElementById("generalFeaturedMediaV124");

    const featureCards =
        Array.from(
            document.querySelectorAll(
                "[data-general-feature-v124]"
            )
        );

    if (!generalButton || !featuredPage) return;

    function hideOtherPagesV124() {
        document.body.classList.remove(
            "treatment-page-open",
            "treatment-nav-scrolled",
            "pain-page-open",
            "pain-nav-scrolled",
            "about-page-open",
            "about-nav-scrolled",
            "media-page-open",
            "media-nav-scrolled",
            "legal-page-open-v56",
            "treatment-detail-open-v71",
            "treatment-detail-nav-scrolled-v71",
            "general-health-detail-open-v75",
            "ankilozan-page-open-v87"
        );

        [
            "tedaviAlanlariPage",
            "agriPage",
            "hakkimdaPage",
            "medyaPage",
            "legalPageV56",
            "treatmentDetailPageV71",
            "generalHealthDetailPageV75",
            "ankilozanFaqSectionV85"
        ].forEach(id => {
            const page = document.getElementById(id);
            if (page) {
                page.setAttribute("aria-hidden", "true");
            }
        });
    }

    function openFeaturedV124() {
        hideOtherPagesV124();

        document.body.classList.add(
            "general-featured-open-v124"
        );

        featuredPage.setAttribute(
            "aria-hidden",
            "false"
        );

        history.pushState(
            { page: "one-cikanlar-v124" },
            "",
            "#one-cikanlar"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function closeFeaturedV124() {
        document.body.classList.remove(
            "general-featured-open-v124"
        );

        featuredPage.setAttribute(
            "aria-hidden",
            "true"
        );

        history.pushState(
            { page: "home" },
            "",
            location.pathname + location.search
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function leaveFeaturedAndClickV124(target) {
        if (!target) return;

        document.body.classList.remove(
            "general-featured-open-v124"
        );

        featuredPage.setAttribute(
            "aria-hidden",
            "true"
        );

        requestAnimationFrame(() => {
            target.click();
        });
    }

    generalButton.addEventListener(
        "click",
        event => {
            event.preventDefault();
            openFeaturedV124();
        }
    );

    if (homeButton) {
        homeButton.addEventListener(
            "click",
            event => {
                event.preventDefault();
                closeFeaturedV124();
            }
        );
    }

    if (treatmentAreasButton) {
        treatmentAreasButton.addEventListener(
            "click",
            () => {
                leaveFeaturedAndClickV124(
                    document.getElementById(
                        "heroDiseasesButton"
                    )
                );
            }
        );
    }

    if (painButton) {
        painButton.addEventListener(
            "click",
            () => {
                leaveFeaturedAndClickV124(
                    document.getElementById(
                        "heroPainButton"
                    )
                );
            }
        );
    }

    if (mediaButton) {
        mediaButton.addEventListener(
            "click",
            () => {
                leaveFeaturedAndClickV124(
                    document.getElementById(
                        "heroMediaButton"
                    )
                );
            }
        );
    }

    featureCards.forEach(card => {
        card.addEventListener(
            "click",
            () => {
                const target =
                    card.dataset.generalFeatureV124;

                if (target === "about") {
                    leaveFeaturedAndClickV124(
                        document.getElementById(
                            "heroAboutButton"
                        )
                    );
                    return;
                }

                if (
                    target === "osteopati" ||
                    target === "fitoterapi"
                ) {
                    leaveFeaturedAndClickV124(
                        document.querySelector(
                            '[data-treatment-detail="' +
                            target +
                            '"]'
                        )
                    );
                    return;
                }

                if (target === "ankilozan") {
                    leaveFeaturedAndClickV124(
                        document.getElementById(
                            "ankilozanHeroButtonV85"
                        )
                    );
                    return;
                }

                if (target === "pain") {
                    leaveFeaturedAndClickV124(
                        document.getElementById(
                            "heroPainButton"
                        )
                    );
                    return;
                }

                if (target === "media") {
                    leaveFeaturedAndClickV124(
                        document.getElementById(
                            "heroMediaButton"
                        )
                    );
                }
            }
        );
    });
})();


// =========================================================
// V143 - BİLGİ REHBERİ
// =========================================================
(function () {
    const page = document.getElementById("infoGuidePageV143");
    const title = document.getElementById("infoGuideTitleV143");
    const openButtons = document.querySelectorAll(".info-guide-open-v143");
    const switchButtons = document.querySelectorAll("[data-info-guide-switch]");
    const views = document.querySelectorAll("[data-info-guide-view]");
    const homeButton = document.getElementById("infoGuideHomeV143");

    const titles = {
        "randevu-oncesi": "Randevu Öncesi Rehber",
        "uygulama-sonrasi": "Uygulama Sonrası Rehber",
        "randevu-gunu": "Randevu Günü İçin Bilgilendirme",
        "gorus-bildirimi": "Şikâyet / Görüş Bildirimi"
    };

    function closeInfoMenusV143() {
        document.querySelectorAll(".info-menu-v54").forEach(menu => {
            menu.classList.remove("open", "kvkk-open");
            const main = menu.querySelector(".info-menu-button-v54");
            const panel = menu.querySelector(".info-menu-panel-v54");
            const kvkk = menu.querySelector(".info-kvkk-button-v54");
            const sub = menu.querySelector(".info-kvkk-submenu-v54");
            if (main) main.setAttribute("aria-expanded", "false");
            if (panel) panel.setAttribute("aria-hidden", "true");
            if (kvkk) kvkk.setAttribute("aria-expanded", "false");
            if (sub) sub.setAttribute("aria-hidden", "true");
        });
    }

    function hideOtherPagesV143() {
        document.body.classList.remove(
            "treatment-page-open",
            "treatment-nav-scrolled",
            "pain-page-open",
            "pain-nav-scrolled",
            "about-page-open",
            "about-nav-scrolled",
            "media-page-open",
            "media-nav-scrolled",
            "legal-page-open-v56",
            "treatment-detail-open-v71",
            "ankilozan-page-open-v87",
            "general-health-detail-open-v75",
            "general-featured-open-v124"
        );

        [
            "tedaviAlanlariPage",
            "agriPage",
            "hakkimdaPage",
            "medyaPage",
            "legalPageV56",
            "treatmentDetailPageV71",
            "ankilozanFaqSectionV85",
            "generalHealthDetailPageV75",
            "generalFeaturedPageV124"
        ].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.setAttribute("aria-hidden", "true");
        });
    }

    function setViewV143(name) {
        const selected = titles[name] ? name : "randevu-oncesi";

        if (title) title.textContent = titles[selected];

        views.forEach(view => {
            view.classList.toggle(
                "active",
                view.dataset.infoGuideView === selected
            );
        });

        switchButtons.forEach(button => {
            button.classList.toggle(
                "is-active",
                button.dataset.infoGuideSwitch === selected
            );
        });

        return selected;
    }

    function openGuideV143(name) {
        if (!page) return;

        hideOtherPagesV143();
        closeInfoMenusV143();

        const selected = setViewV143(name);

        document.body.classList.add("info-guide-open-v143");
        page.setAttribute("aria-hidden", "false");

        history.pushState(
            { page: "info-guide", guide: selected },
            "",
            "#" + selected
        );

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function closeGuideV143() {
        document.body.classList.remove("info-guide-open-v143");
        if (page) page.setAttribute("aria-hidden", "true");
    }

    openButtons.forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
            openGuideV143(button.dataset.infoGuide);
        });
    });

    switchButtons.forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();
            const selected = setViewV143(button.dataset.infoGuideSwitch);
            history.replaceState(
                { page: "info-guide", guide: selected },
                "",
                "#" + selected
            );
        });
    });

    if (homeButton) {
        homeButton.addEventListener("click", event => {
            event.preventDefault();
            closeGuideV143();
            history.pushState({ page: "home" }, "", "#anasayfa");
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    const initial = location.hash.replace("#", "");
    if (titles[initial]) {
        openGuideV143(initial);
    }
})();
