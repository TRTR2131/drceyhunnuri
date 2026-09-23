// V258 - Osteopati bağımsız premium sekme sistemi.
// V257 - Osteopati signature tasarımı; mevcut etkileşimler korunur.
// V254 - Dikey boşluk düzeltmesi CSS tarafında yapıldı; mevcut davranış korunur.
// V207 - Hakkımda içerik görünürlüğü CSS ile düzeltildi; mevcut davranış korunur.
// V206 - Eğitim ve Görevler paneli kısa ekran görünümü düzeltildi
// V205 - Üst menü yalnızca CSS ile kompakt/hizalı güncellendi; mevcut animasyonlar korunur.
// V204 - Ana sayfa üst menü beyaz tema; mevcut animasyon ve yönlendirmeler korunur
// V203 - Romatoid Artrit hero konu başlıkları 8 başlığa tamamlandı
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

        const name = document.getElementById("name")?.value.trim() || "";
        const age = document.getElementById("age")?.value.trim() || "";
        const complaint = document.getElementById("complaint")?.value.trim() || "";
        const phone = document.getElementById("phone")?.value.trim() || "";

        const cleanPhone = phone.replace(/\D/g, "");

        if (!name || !age || !complaint || cleanPhone.length < 10) {
            alert("Lütfen isim soyad, yaş, şikayet / ağrı bilgisi ve telefon numaranızı eksiksiz doldurun.");
            return;
        }

        const message =
`Merhaba,

*RANDEVU TALEBİ*
------------------------------

*Ad Soyad:* ${name}
*Yaş:* ${age}
*Telefon:* ${phone}
*Şikayet / Hastalık / Ağrı:* ${complaint}

------------------------------

Uygunluk durumuna göre dönüş sağlayabilir misiniz?

Teşekkür ederim.`;

        pendingWhatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);

        if (appointmentPreview) {
            appointmentPreview.innerHTML = `
                <div class="preview-row"><span>Ad Soyad</span><strong>${name}</strong></div>
                <div class="preview-row"><span>Yaş</span><strong>${age}</strong></div>
                <div class="preview-row"><span>Telefon</span><strong>${phone}</strong></div>
                <div class="preview-row"><span>Şikayet / Hastalık / Ağrı</span><strong>${complaint}</strong></div>
            `;
        }

        if (appointmentModal) {
            appointmentModal.classList.add("show");
            appointmentModal.setAttribute("aria-hidden", "false");
            document.body.classList.add("modal-open");
        } else {
            window.open(pendingWhatsappURL, "_blank", "noopener,noreferrer");
        }

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

    // V288: Tedavi Alanları ana sayfası açılırken
    // hastalık özel sayfaları / ağrı / medya / bilgi katmanları arkada kalmasın.
    document.body.classList.remove(
        "pain-page-open",
        "pain-nav-scrolled",
        "media-page-open",
        "media-nav-scrolled",
        "about-page-open",
        "about-nav-scrolled",
        "legal-page-open-v56",
        "treatment-detail-open-v71",
        "treatment-detail-nav-scrolled-v71",
        "general-health-detail-open-v75",
        "ankilozan-page-open-v87",
        "romatoid-page-open-v198",
        "condition-disease-page-open-v246",
        "as-special-open-v274",
        "treatment-special-open-v279",
        "osteo-standalone-open-v260",
        "device-detail-page-open-v157",
        "general-featured-open-v124"
    );

    [
        "agriPage",
        "medyaPage",
        "hakkimdaPage",
        "legalPageV56",
        "treatmentDetailPageV71",
        "generalHealthDetailPageV75",
        "ankilozanFaqSectionV85",
        "romatoidFaqSectionV198",
        "conditionDiseasePageV246",
        "ankilozanSpecialViewV274",
        "treatmentSpecialViewV279",
        "osteoSpecialViewV259",
        "deviceDetailPageV157",
        "generalFeaturedPageV124",
        "infoGuidePageV143"
    ].forEach(function (id) {
        const el = document.getElementById(id);
        if (el) {
            el.setAttribute("aria-hidden", "true");
        }
    });

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
        new Set(["osteopati", "fitoterapi", "robotik-lazer", "geleneksel-tedavi", "diger-cihazlar", "igne", "estetik", "damar-yolu"]);

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
            "treatment-detail-nav-scrolled-v71",
            "general-health-detail-open-v75",

            /* V282: hastalık özel sayfalarını da tamamen kapat */
            "ankilozan-page-open-v87",
            "romatoid-page-open-v198",
            "condition-disease-page-open-v246",

            /* Açık kalmış bağımsız özel içerik ekranlarını kapat */
            "as-special-open-v274",
            "treatment-special-open-v279",
            "osteo-standalone-open-v260",

            /* Diğer tam ekran detay sayfaları */
            "info-guide-page-open-v143",
            "device-detail-page-open-v157",
            "general-featured-open-v124"
        );

        [
            document.getElementById("tedaviAlanlariPage"),
            document.getElementById("agriPage"),
            document.getElementById("hakkimdaPage"),
            document.getElementById("medyaPage"),
            document.getElementById("legalPageV56"),
            document.getElementById("treatmentDetailPageV71"),
            document.getElementById("generalHealthDetailPageV75"),

            /* V282: tedavi alanlarındaki açık hastalık sayfalarını kapat */
            document.getElementById("ankilozanFaqSectionV85"),
            document.getElementById("romatoidFaqSectionV198"),
            document.getElementById("conditionDiseasePageV246"),

            /* Açık olabilecek bağımsız özel içerik ekranları */
            document.getElementById("ankilozanSpecialViewV274"),
            document.getElementById("treatmentSpecialViewV279"),
            document.getElementById("osteoSpecialViewV259"),

            /* Diğer tam ekran detaylar */
            document.getElementById("infoGuidePageV143"),
            document.getElementById("deviceDetailPageV157")
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
// V202 - ANA HERO: DOKTOR -> ANKİLOZAN -> ROMATOİD ARTRİT
// =========================================================
(function () {
    const slider = document.getElementById("heroSliderV86");
    if (!slider) return;

    const doctorSlide = slider.querySelector('[data-hero-slide="doctor"]');
    const asSlide = slider.querySelector('[data-hero-slide="ankilozan"]');
    const raSlide = slider.querySelector('[data-hero-slide="romatoid"]');

    const doctorNext = document.getElementById("heroNextV86");
    const asPrev = document.getElementById("heroPrevV86");
    const asNext = document.getElementById("heroNextRomatoidV202");
    const raPrev = document.getElementById("heroPrevRomatoidV202");

    if (!doctorSlide || !asSlide || !raSlide) return;

    function activate(slide) {
        [doctorSlide, asSlide, raSlide].forEach(item => {
            const active = item === slide;
            item.classList.toggle("is-active", active);
            if (active) item.removeAttribute("aria-hidden");
            else item.setAttribute("aria-hidden", "true");
        });
    }

    if (doctorNext) doctorNext.addEventListener("click", () => activate(asSlide));
    if (asPrev) asPrev.addEventListener("click", () => activate(doctorSlide));
    if (asNext) asNext.addEventListener("click", () => activate(raSlide));
    if (raPrev) raPrev.addEventListener("click", () => activate(asSlide));

    activate(doctorSlide);
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
            "general-health-detail-open-v75",

            /* V284: başka hastalık sayfası arkada kalmasın */
            "romatoid-page-open-v198",
            "condition-disease-page-open-v246"
        );

        const otherPages = [
            document.getElementById("tedaviAlanlariPage"),
            document.getElementById("agriPage"),
            document.getElementById("medyaPage"),
            document.getElementById("hakkimdaPage"),

            /* V284: RA / diğer hastalık sayfaları da kapanır */
            document.getElementById("romatoidFaqSectionV198"),
            document.getElementById("conditionDiseasePageV246")
        ];

        otherPages.forEach(item => {
            if (item) {
                item.setAttribute("aria-hidden", "true");
            }
        });
    }

    function openAnkilozanPageV87(options = {}) {

        if (!page) return;

        closeOtherPagesV87();

        document.body.classList.add(
            "ankilozan-page-open-v87"
        );

        page.setAttribute(
            "aria-hidden",
            "false"
        );

        if (typeof window.updateDiseaseSwitcherV250 === 'function') {
            window.updateDiseaseSwitcherV250('as');
        }

        history.pushState(
            { page: "ankilozan-spondilit" },
            "",
            "#ankilozan-spondilit"
        );

        if (!options.skipScroll) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }

    window.openAnkilozanPageV87 = openAnkilozanPageV87;

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
// V231 - TÜM ANA SEKMELERE 1.5 SN ESKİ TARZA YAKIN PREMIUM GEÇİŞ
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
            title: "FitoTerapi-Bitkisel",
            subtitle: "Bitkisel destekler, beslenme ve kişiye özel değerlendirme"
        },
        "robotik-lazer": {
            kicker: "TEDAVİ",
            title: "Robotik Lazer",
            subtitle: "Modern cihaz desteği ve kişiye özel klinik planlama"
        },
        "geleneksel-tedavi": {
            kicker: "TEDAVİ",
            title: "Geleneksel Tedavi",
            subtitle: "Hacamat ve sülük uygulamalarına dair tamamlayıcı yaklaşım"
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
            title: "Damar Yolu Uygulamaları",
            subtitle: "Serum ve destek amaçlı damar yolu uygulamaları"
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
        "romatoidHomeButtonV198": {
            kicker: "ANA SAYFA",
            title: "Ana Sayfa",
            subtitle: "Dr. Ceyhun Nuri"
        },
        "deviceDetailHomeV157": {
            kicker: "ANA SAYFA",
            title: "Ana Sayfa",
            subtitle: "Dr. Ceyhun Nuri"
        },
        "infoGuideHomeV143": {
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
        "romatoidTreatmentAreasButtonV198": {
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
        "romatoidPainButtonV198": {
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
        "romatoidMediaButtonV198": {
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
        "#romatoidHomeButtonV198",
        "#deviceDetailHomeV157",
        "#infoGuideHomeV143",
        "[data-treatment-detail]",
        "[data-treatment-top]",
        "[data-health-detail]",
        ".info-legal-open-v56",
        "#heroDiseasesButton",
        "#painPageTreatmentAreasButton",
        "#aboutPageTreatmentAreasButton",
        "#mediaPageTreatmentAreasButton",
        "#ankilozanTreatmentAreasButtonV87",
        "#romatoidTreatmentAreasButtonV198",
        "#treatmentDetailAreasV71",
        "#healthDetailAreasV75",
        "#heroPainButton",
        "#treatmentPagePainButton",
        "#mediaPagePainButton",
        "#aboutPagePainButton",
        "#ankilozanPainButtonV87",
        "#romatoidPainButtonV198",
        "#treatmentDetailPainV71",
        "#healthDetailPainV75",
        "#osteoGlobalPainButtonV107",
        "#heroMediaButton",
        "#treatmentPageMediaButton",
        "#painPageMediaButton",
        "#aboutPageMediaButton",
        "#ankilozanMediaButtonV87",
        "#romatoidMediaButtonV198",
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
    const heroText = document.getElementById("infoGuideHeroTextV225");
    const summaryText = document.getElementById("infoGuideSummaryTextV225");
    const breadcrumbTitle = document.getElementById("infoGuideBreadcrumbTitleV225");
    const openButtons = document.querySelectorAll(".info-guide-open-v143");
    const switchButtons = document.querySelectorAll("[data-info-guide-switch]");
    const views = document.querySelectorAll("[data-info-guide-view]");
    const homeButton = document.getElementById("infoGuideHomeV143");

    const titles = {
        "randevu-oncesi": "Randevu Öncesi Rehber",
        "uygulama-sonrasi": "Uygulama Sonrası Rehber",
        "randevu-gunu": "Randevu Günü İçin Bilgilendirme"
    };

    const guideCopyV225 = {
        "randevu-oncesi": {
            hero: "Randevu ve uygulama süreçlerinde işinizi kolaylaştıracak kısa, anlaşılır ve pratik bilgilendirmeleri modern bir rehber yapısında burada bulabilirsiniz.",
            summary: "Randevu öncesinden uygulama sonrasına kadar ihtiyaç duyabileceğiniz temel bilgiler tek alanda toplandı."
        },
        "uygulama-sonrasi": {
            hero: "Uygulama ve tedavi süreçlerinin ardından dikkat etmeniz gereken öneriler ve pratik bilgileri anlaşılır bir şekilde burada bulabilirsiniz.",
            summary: "Uygulama sonrasında ihtiyaç duyabileceğiniz temel bilgiler tek alanda, anlaşılır ve pratik bir şekilde toplandı."
        },
        "randevu-gunu": {
            hero: "Randevu gününde hazırlıklı gelmeniz, sürecin daha verimli ve rahat geçmesini sağlar. Kısa, anlaşılır ve pratik bilgilendirmeleri burada bulabilirsiniz.",
            summary: "Randevu gününüzde ihtiyaç duyabileceğiniz temel bilgiler tek alanda toplandı."
        }
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
        if (breadcrumbTitle) breadcrumbTitle.textContent = titles[selected];
        if (heroText) heroText.textContent = guideCopyV225[selected].hero;
        if (summaryText) summaryText.textContent = guideCopyV225[selected].summary;

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

// =========================================================
// V154 - ROBOTİK LAZER HERO / RANDEVU YÖNLENDİRMESİ
// =========================================================
(function () {
    const appointmentButtons = [
        document.getElementById("roboticAppointmentHotspotV154"),
        document.getElementById("roboticAppointmentMobileV154")
    ].filter(Boolean);

    if (!appointmentButtons.length) return;

    function goToAppointmentV154() {
        const treatmentHomeButton =
            document.getElementById("treatmentDetailHomeV71");

        if (treatmentHomeButton) {
            treatmentHomeButton.click();
        } else {
            document.body.classList.remove("treatment-detail-open-v71");
            const treatmentPage = document.getElementById("treatmentDetailPageV71");
            if (treatmentPage) treatmentPage.setAttribute("aria-hidden", "true");
        }

        window.setTimeout(() => {
            const contact = document.getElementById("iletisim");
            if (contact) {
                history.pushState({ page: "home", section: "iletisim" }, "", "#iletisim");
                contact.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 120);
    }

    appointmentButtons.forEach(button => {
        button.addEventListener("click", goToAppointmentV154);
    });
})();


// =========================================================
// V155 - DİĞER CİHAZLAR POSTER HERO
// Navigasyon mevcut anchor/data-treatment-detail altyapısını kullanır.
// =========================================================


// =========================================================
// V157 - DİĞER CİHAZLAR / AYRI CİHAZ DETAY SAYFASI
// =========================================================
(function(){
    const page=document.getElementById("deviceDetailPageV157"); if(!page)return;
    const title=document.getElementById("deviceDetailTitleV157");
    const breadcrumbTitle=document.getElementById("deviceDetailBreadcrumbTitleV157");
    const homeButton=document.getElementById("deviceDetailHomeV157");
    const backButton=document.getElementById("deviceDetailBackV157");
    const breadcrumbBack=document.getElementById("deviceDetailBreadcrumbBackV157");
    const tabs=page.querySelectorAll("[data-device-detail-tab]");
    const panels=page.querySelectorAll("[data-device-detail-panel]");
    const openers=document.querySelectorAll("[data-device-detail-open]");
    const meta={ems:{title:"EMS Yatak",hash:"#cihaz-ems-yatak"},magneto:{title:"Magneto",hash:"#cihaz-magneto"},induktif:{title:"İndüktif Magneto",hash:"#cihaz-induktif-magneto"},lenf:{title:"Lenf Drenaj",hash:"#cihaz-lenf-drenaj"}};
    function setDevice(name){const selected=meta[name]?name:"ems";tabs.forEach(b=>{const a=b.dataset.deviceDetailTab===selected;b.classList.toggle("active",a);b.setAttribute("aria-current",a?"page":"false")});panels.forEach(p=>{const a=p.dataset.deviceDetailPanel===selected;p.classList.toggle("active",a);p.hidden=!a});title.textContent=meta[selected].title;breadcrumbTitle.textContent=meta[selected].title;return selected}
    function hideKnown(){document.body.classList.remove("treatment-page-open","treatment-nav-scrolled","pain-page-open","pain-nav-scrolled","about-page-open","about-nav-scrolled","media-page-open","media-nav-scrolled","legal-page-open-v56","treatment-detail-open-v71","treatment-detail-nav-scrolled-v71","general-health-detail-open-v75","ankilozan-page-open-v87","info-guide-page-open-v143");["tedaviAlanlariPage","agriPage","hakkimdaPage","medyaPage","legalPageV56","treatmentDetailPageV71","generalHealthDetailPageV75","ankilozanFaqSectionV85","infoGuidePageV143"].forEach(id=>{const e=document.getElementById(id);if(e)e.setAttribute("aria-hidden","true")})}
    function openDevice(name,push=true){hideKnown();const selected=setDevice(name);document.body.classList.add("device-detail-page-open-v157");page.setAttribute("aria-hidden","false");if(push)history.pushState({page:"device-detail",device:selected},"",meta[selected].hash);window.scrollTo({top:0,behavior:"smooth"})}
    function openOther(push=true){document.body.classList.remove("device-detail-page-open-v157");page.setAttribute("aria-hidden","true");const t=document.getElementById("treatmentDetailPageV71");if(t){document.body.classList.add("treatment-detail-open-v71");t.setAttribute("aria-hidden","false");t.querySelectorAll("[data-treatment-detail-view]").forEach(v=>v.classList.toggle("active",v.dataset.treatmentDetailView==="diger-cihazlar"));t.querySelectorAll("[data-treatment-top]").forEach(b=>b.classList.toggle("is-current-v74",b.dataset.treatmentTop==="diger-cihazlar"))}if(push)history.pushState({page:"treatment-detail",treatment:"diger-cihazlar"},"","#diger-cihazlar");window.scrollTo({top:0,behavior:"smooth"})}
    function goHome(){document.body.classList.remove("device-detail-page-open-v157","treatment-detail-open-v71");page.setAttribute("aria-hidden","true");const t=document.getElementById("treatmentDetailPageV71");if(t)t.setAttribute("aria-hidden","true");history.pushState({page:"home"},"",location.pathname+location.search);window.scrollTo({top:0,behavior:"smooth"})}
    openers.forEach(o=>o.addEventListener("click",e=>{e.preventDefault();openDevice(o.dataset.deviceDetailOpen)}));
    tabs.forEach(b=>b.addEventListener("click",()=>openDevice(b.dataset.deviceDetailTab)));
    if(homeButton)homeButton.addEventListener("click",goHome);if(backButton)backButton.addEventListener("click",()=>openOther());if(breadcrumbBack)breadcrumbBack.addEventListener("click",()=>openOther());
    function resolve(){const found=Object.entries(meta).find(([,v])=>v.hash===location.hash);if(found){openDevice(found[0],false);return true}return false}
    window.addEventListener("popstate",()=>{if(resolve())return;if(location.hash==="#diger-cihazlar")openOther(false);else{document.body.classList.remove("device-detail-page-open-v157");page.setAttribute("aria-hidden","true")}});
    resolve();
})();


// =========================================================
// V158 - DİĞER CİHAZLAR GERİYE UYUMLU TIKLAMA
// Eski özel-sekme butonları kalsa bile cihaz detay sayfasını açsın.
// =========================================================
(function () {
    const legacyOpeners = document.querySelectorAll("[data-device-special-open]");
    legacyOpeners.forEach(opener => {
        opener.addEventListener("click", function () {
            const key = opener.getAttribute("data-device-special-open");
            if (!key) return;
            opener.setAttribute("data-device-detail-open", key);
        }, { capture: true });
    });
})();


// =========================================================
// V160 - TEDAVİ DETAY MODERN NAV EK DAVRANIŞLARI
// =========================================================
(function(){
 const brand=document.getElementById("treatmentDetailBrandV160");
 const home=document.getElementById("treatmentDetailHomeV71");
 const appointment=document.getElementById("treatmentDetailAppointmentV160");
 if(brand&&home){brand.addEventListener("click",()=>home.click());}
 if(appointment){appointment.addEventListener("click",()=>{if(home){home.click();}else{document.body.classList.remove("treatment-detail-open-v71");const page=document.getElementById("treatmentDetailPageV71");if(page)page.setAttribute("aria-hidden","true");}setTimeout(()=>{const contact=document.getElementById("iletisim");if(contact){history.pushState({page:"home",section:"iletisim"},"","#iletisim");contact.scrollIntoView({behavior:"smooth",block:"start"});}},120);});}
})();


// =========================================================
// V161 - MODERN TEDAVİ MENÜ HARDENING
// =========================================================
(function(){
  function hardenTreatmentNavV161(){
    const nav=document.querySelector('#treatmentDetailPageV71 .treatment-detail-nav-v71');
    if(nav) nav.classList.add('treatment-detail-nav-modern-v160');
  }
  document.addEventListener('DOMContentLoaded',hardenTreatmentNavV161);
  hardenTreatmentNavV161();
})();


// =========================================================
// V168 - GELENEKSEL TEDAVİ / HACAMAT & SÜLÜK ÖZEL SAYFALARI
// =========================================================
(function () {
    const treatmentView = document.querySelector('[data-treatment-detail-view="geleneksel-tedavi"]');
    if (!treatmentView) return;

    const overview = document.getElementById('traditionalOverviewV168');
    const detailViews = treatmentView.querySelectorAll('[data-traditional-detail]');
    const openers = treatmentView.querySelectorAll('[data-traditional-open]');
    const backButtons = treatmentView.querySelectorAll('[data-traditional-back]');
    const scrollButtons = treatmentView.querySelectorAll('[data-traditional-scroll]');
    const traditionalTopLinks = document.querySelectorAll('[data-treatment-detail="geleneksel-tedavi"], [data-treatment-top="geleneksel-tedavi"]');

    function showOverviewV168(updateHash = false) {
        if (overview) {
            overview.classList.add('active');
            overview.setAttribute('aria-hidden', 'false');
        }
        detailViews.forEach(view => {
            view.classList.remove('active');
            view.setAttribute('aria-hidden', 'true');
        });
        if (updateHash && history.replaceState) {
            history.replaceState(history.state, '', '#geleneksel-tedavi');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showDetailV168(name, updateHash = true) {
        const target = treatmentView.querySelector('[data-traditional-detail="' + name + '"]');
        if (!target) return;
        if (overview) {
            overview.classList.remove('active');
            overview.setAttribute('aria-hidden', 'true');
        }
        detailViews.forEach(view => {
            const active = view === target;
            view.classList.toggle('active', active);
            view.setAttribute('aria-hidden', active ? 'false' : 'true');
        });
        if (updateHash && history.replaceState) {
            history.replaceState(history.state, '', name === 'hacamat' ? '#geleneksel-hacamat' : '#geleneksel-suluk');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    openers.forEach(button => {
        button.addEventListener('click', () => showDetailV168(button.dataset.traditionalOpen));
    });

    backButtons.forEach(button => {
        button.addEventListener('click', () => showOverviewV168(true));
    });

    scrollButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = document.getElementById(button.dataset.traditionalScroll);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    traditionalTopLinks.forEach(link => {
        link.addEventListener('click', () => {
            window.setTimeout(() => showOverviewV168(false), 30);
        });
    });

    function resolveTraditionalHashV168() {
        if (location.hash === '#geleneksel-hacamat') {
            showDetailV168('hacamat', false);
            return true;
        }
        if (location.hash === '#geleneksel-suluk') {
            showDetailV168('suluk', false);
            return true;
        }
        return false;
    }

    window.addEventListener('popstate', resolveTraditionalHashV168);
    resolveTraditionalHashV168();
})();


// =========================================================
// V172 - TÜM ALT SAYFA MARKA ALANI / ANA SAYFA DAVRANIŞI
// =========================================================
(function () {
    const brands = document.querySelectorAll('[data-global-brand-v172]');
    if (!brands.length) return;

    const homeSelectors = [
        '#generalFeaturedHomeButtonV124',
        '#ankilozanHomeButtonV87',
        '#treatmentPageHomeButton',
        '#painPageHomeButton',
        '#legalHomeButtonV56',
        '#infoGuideHomeV143',
        '#treatmentDetailHomeV71',
        '#deviceDetailHomeV157',
        '#aboutPageHomeButton',
        '#healthDetailHomeV75',
        '#mediaPageHomeButton'
    ];

    brands.forEach(function (brand) {
        brand.addEventListener('click', function (event) {
            // Existing treatment detail brand already has its own handler; avoid duplicate navigation.
            if (brand.id === 'treatmentDetailBrandV160') return;
            event.preventDefault();
            const nav = brand.closest('nav');
            let home = null;
            if (nav) {
                for (const selector of homeSelectors) {
                    const candidate = nav.querySelector(selector);
                    if (candidate) { home = candidate; break; }
                }
            }
            if (home) {
                home.click();
                return;
            }
            for (const selector of homeSelectors) {
                const candidate = document.querySelector(selector);
                if (candidate) { candidate.click(); return; }
            }
            window.location.hash = '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
})();


// =========================================================
// V175 - BESLENME DETAY SAYFALARI
// =========================================================
(function () {
    const nutritionView = document.querySelector('[data-health-detail-view="beslenme"]');
    if (!nutritionView) return;

    const overview = document.getElementById('nutritionOverviewV175');
    const details = nutritionView.querySelectorAll('[data-nutrition-detail]');
    const openers = nutritionView.querySelectorAll('[data-nutrition-open]');
    const backButtons = nutritionView.querySelectorAll('[data-nutrition-back]');
    const nutritionTopLinks = document.querySelectorAll('[data-health-detail="beslenme"], [data-health-top="beslenme"]');
    const valid = new Set(['balanced','pregnancy','children','autoimmune','digestion','heart','weight','detox']);

    function showOverviewV175(updateHash) {
        if (overview) {
            overview.classList.add('active');
            overview.setAttribute('aria-hidden','false');
        }
        details.forEach(view => {
            view.classList.remove('active');
            view.setAttribute('aria-hidden','true');
        });
        if (updateHash && history.replaceState) history.replaceState(history.state,'','#beslenme');
        window.scrollTo({top:0,behavior:'smooth'});
    }

    function showDetailV175(name, updateHash=true) {
        if (!valid.has(name)) return;
        const target = nutritionView.querySelector('[data-nutrition-detail="' + name + '"]');
        if (!target) return;
        if (overview) {
            overview.classList.remove('active');
            overview.setAttribute('aria-hidden','true');
        }
        details.forEach(view => {
            const active = view === target;
            view.classList.toggle('active', active);
            view.setAttribute('aria-hidden', active ? 'false':'true');
        });
        if (updateHash && history.replaceState) history.replaceState(history.state,'','#beslenme-' + name);
        window.scrollTo({top:0,behavior:'smooth'});
    }

    openers.forEach(btn => btn.addEventListener('click', () => showDetailV175(btn.dataset.nutritionOpen)));
    backButtons.forEach(btn => btn.addEventListener('click', () => showOverviewV175(true)));
    nutritionTopLinks.forEach(link => link.addEventListener('click', () => window.setTimeout(() => showOverviewV175(false), 40)));

    function resolveHashV175() {
        const hash = location.hash.replace('#','');
        if (hash.startsWith('beslenme-')) {
            const key = hash.replace('beslenme-','');
            if (valid.has(key)) {
                showDetailV175(key,false);
                return true;
            }
        }
        return false;
    }
    window.addEventListener('popstate', resolveHashV175);
    resolveHashV175();
})();


// =========================================================
// V177 - MEDYA İÇERİK PANELLERİ
// =========================================================
(function () {
    const mediaContentV177 = document.getElementById("mediaPageContent");
    if (!mediaContentV177) return;

    const panelsV177 = Array.from(mediaContentV177.querySelectorAll("[data-media-panel]"));
    const buttonsV177 = Array.from(document.querySelectorAll("[data-media-target]"));

    function showMediaPanelV177(target) {
        const safeTarget = target || "youtube";
        panelsV177.forEach(panel => {
            const active = panel.dataset.mediaPanel === safeTarget;
            panel.classList.toggle("active", active);
            panel.setAttribute("aria-hidden", active ? "false" : "true");
        });
        buttonsV177.forEach(button => {
            button.classList.toggle("active", button.dataset.mediaTarget === safeTarget);
        });
    }

    buttonsV177.forEach(button => {
        button.addEventListener("click", function () {
            showMediaPanelV177(button.dataset.mediaTarget || "youtube");
        });
    });

    // TV içerikleri kullanıcı tarafından daha sonra ekleneceği için Medya ilk açılışta YouTube'u gösterir.
    const mediaOpenersV177 = [
        document.getElementById("heroMediaButton"),
        document.getElementById("treatmentPageMediaButton"),
        document.getElementById("painPageMediaButton"),
        document.getElementById("aboutPageMediaButton")
    ].filter(Boolean);

    mediaOpenersV177.forEach(button => {
        button.addEventListener("click", () => {
            window.setTimeout(() => showMediaPanelV177("youtube"), 0);
        });
    });

    if (document.body.classList.contains("media-page-open") || location.hash === "#medya") {
        showMediaPanelV177("youtube");
    } else {
        showMediaPanelV177("youtube");
    }
})();


// =========================================================
// V185 - CİHAZ DESTEKLİ UYGULAMALAR ROUTE GÜVENLİĞİ
// Robotik Lazer içindeki butonların beyaz ekran vermesini engeller.
// =========================================================
(function () {
    const hub = document.querySelector('[data-treatment-detail-view="diger-cihazlar"]');
    const page = document.getElementById('treatmentDetailPageV71');
    if (!hub || !page) return;

    document.querySelectorAll('[data-treatment-detail="diger-cihazlar"]').forEach(link => {
        link.addEventListener('click', function () {
            // Ana V72 handler aynı eventte çalışır; bu mikro görev sadece görünürlüğü garanti eder.
            window.setTimeout(() => {
                if (location.hash !== '#diger-cihazlar') return;
                document.body.classList.add('treatment-detail-open-v71');
                page.setAttribute('aria-hidden', 'false');
                page.querySelectorAll('[data-treatment-detail-view]').forEach(view => {
                    view.classList.toggle('active', view === hub);
                });
            }, 0);
        });
    });
})();


/* =========================================================
   V191 - ANA SAYFA ÜST MENÜ PREMIUM TIKLAMA ANİMASYONU
   Sadece görsel sınıflar ekler; mevcut route / dropdown eventlerini bozmaz.
   ========================================================= */
(function () {
    function initHomeTopNavAnimationV191() {
        const heroNav = document.querySelector('.hero-modern-nav-v82');
        if (!heroNav || heroNav.dataset.animV191 === '1') return;

        heroNav.dataset.animV191 = '1';
        const buttons = heroNav.querySelectorAll('button');

        buttons.forEach((button) => {
            button.addEventListener('pointerdown', (event) => {
                const rect = button.getBoundingClientRect();
                const x = Number.isFinite(event.clientX) && event.clientX !== 0
                    ? event.clientX - rect.left
                    : rect.width / 2;
                const y = Number.isFinite(event.clientY) && event.clientY !== 0
                    ? event.clientY - rect.top
                    : rect.height / 2;

                button.style.setProperty('--nav-click-x-v191', `${x}px`);
                button.style.setProperty('--nav-click-y-v191', `${y}px`);
            }, { passive: true });

            button.addEventListener('click', () => {
                button.classList.remove('nav-click-v191');
                void button.offsetWidth;
                button.classList.add('nav-click-v191');

                window.setTimeout(() => {
                    button.classList.remove('nav-click-v191');
                }, 820);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHomeTopNavAnimationV191, { once: true });
    } else {
        initHomeTopNavAnimationV191();
    }
})();

/* =========================================================
   V196 - ANKİLOZAN SPONDİLİT DETAY SEKMELERİ
   ========================================================= */
(function () {
    function initAnkilozanDetailTabsV196() {
        const hub = document.getElementById('ankilozanDetailHubV196');
        if (!hub || hub.dataset.readyV196 === '1') return;
        hub.dataset.readyV196 = '1';

        const triggers = document.querySelectorAll('[data-ank-detail-v196]');
        const tabs = hub.querySelectorAll('.ankilozan-detail-tab-v196');
        const panels = hub.querySelectorAll('[data-ank-panel-v196]');

        function openDetail(key, shouldScroll) {
            tabs.forEach((tab) => {
                const active = tab.dataset.ankDetailV196 === key;
                tab.classList.toggle('is-active', active);
                tab.setAttribute('aria-selected', active ? 'true' : 'false');
            });

            panels.forEach((panel) => {
                const active = panel.dataset.ankPanelV196 === key;
                panel.classList.toggle('is-active', active);
                panel.hidden = !active;
            });

            if (shouldScroll) {
                window.requestAnimationFrame(() => {
                    hub.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            }
        }

        window.openAnkilozanDetailV196 = openDetail;

        triggers.forEach((trigger) => {
            trigger.addEventListener('click', () => {
                openDetail(trigger.dataset.ankDetailV196, true);
            });
        });

        tabs.forEach((tab, index) => {
            tab.addEventListener('keydown', (event) => {
                if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
                event.preventDefault();
                const direction = event.key === 'ArrowRight' ? 1 : -1;
                const next = tabs[(index + direction + tabs.length) % tabs.length];
                next.focus();
                next.click();
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnkilozanDetailTabsV196, { once: true });
    } else {
        initAnkilozanDetailTabsV196();
    }
})();


/* =========================================================
   V197 - ANA HERO KONU BUTONLARI -> İLGİLİ AÇIKLAMAYA GİT
   ========================================================= */
(function () {
    function initAnkilozanTopicRoutingV197() {
        const topicButtons = document.querySelectorAll('[data-ank-topic-v197]');
        if (!topicButtons.length) return;

        topicButtons.forEach((button) => {
            if (button.dataset.ankTopicReadyV197 === '1') return;
            button.dataset.ankTopicReadyV197 = '1';

            button.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();

                const key = button.dataset.ankTopicV197;
                if (!key) return;

                if (typeof window.openAnkilozanPageV87 === 'function') {
                    window.openAnkilozanPageV87({ skipScroll: true });
                }

                window.requestAnimationFrame(() => {
                    window.setTimeout(() => {
                        if (typeof window.openAnkilozanDetailV196 === 'function') {
                            window.openAnkilozanDetailV196(key, true);
                        } else {
                            const hub = document.getElementById('ankilozanDetailHubV196');
                            const target = document.querySelector(`[data-ank-detail-v196="${key}"]`);
                            if (target) target.click();
                            if (hub) hub.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 40);
                });
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnkilozanTopicRoutingV197, { once: true });
    } else {
        initAnkilozanTopicRoutingV197();
    }
})();


// =========================================================
// V200 - ROMATOİD ARTRİT ÖZEL SAYFASI
// =========================================================
(function(){
  const page=document.getElementById('romatoidFaqSectionV198');
  const card=document.querySelector('.romatoid-card-link-v198');
  const home=document.getElementById('romatoidHomeButtonV198');
  const areas=document.getElementById('romatoidTreatmentAreasButtonV198');
  const pain=document.getElementById('romatoidPainButtonV198');
  const media=document.getElementById('romatoidMediaButtonV198');
  const info=document.getElementById('romatoidInfoButtonV198');
  const healthMenu=document.getElementById('romatoidHealthMenuV198');
  const healthBtn=document.getElementById('romatoidHealthButtonV198');
  const healthDrop=document.getElementById('romatoidHealthDropdownV198');
  if(!page) return;

  function closeKnown(){
    document.body.classList.remove('treatment-page-open','treatment-nav-scrolled','pain-page-open','pain-nav-scrolled','media-page-open','media-nav-scrolled','about-page-open','about-nav-scrolled','legal-page-open-v56','treatment-detail-open-v71','general-health-detail-open-v75','ankilozan-page-open-v87','condition-disease-page-open-v246','info-guide-page-open-v143','device-detail-page-open-v157','general-featured-open-v124');
    ['tedaviAlanlariPage','agriPage','medyaPage','hakkimdaPage','legalPageV56','treatmentDetailPageV71','generalHealthDetailPageV75','ankilozanFaqSectionV85','conditionDiseasePageV246','infoGuidePageV143'].forEach(id=>{const e=document.getElementById(id);if(e)e.setAttribute('aria-hidden','true')});
  }
  function openRA(push=true){
    closeKnown();
    document.body.classList.add('romatoid-page-open-v198');
    page.setAttribute('aria-hidden','false');
    if (typeof window.updateDiseaseSwitcherV250 === 'function') window.updateDiseaseSwitcherV250('ra');
    if(push) history.pushState({page:'romatoid-artrit'},'','#romatoid-artrit');
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function closeRA(){
    document.body.classList.remove('romatoid-page-open-v198');
    page.setAttribute('aria-hidden','true');
  }
  window.openRomatoidPageV198=openRA;

  if(card) card.addEventListener('click',e=>{e.preventDefault();openRA(true)});
  if(home) home.addEventListener('click',e=>{e.preventDefault();closeRA();history.pushState({page:'home'},'',location.pathname+location.search);window.scrollTo({top:0,behavior:'smooth'})});
  if(areas) areas.addEventListener('click',e=>{e.preventDefault();closeRA();const p=document.getElementById('tedaviAlanlariPage');if(p){document.body.classList.add('treatment-page-open');p.setAttribute('aria-hidden','false');history.pushState({page:'tedavi-alanlari'},'','#tedavi-alanlari');window.scrollTo({top:0,behavior:'smooth'})}});
  if(pain) pain.addEventListener('click',e=>{e.preventDefault();closeRA();const p=document.getElementById('agriPage');if(p){document.body.classList.add('pain-page-open');p.setAttribute('aria-hidden','false');history.pushState({page:'agri'},'','#agri');window.scrollTo({top:0,behavior:'smooth'})}});
  if(media) media.addEventListener('click',e=>{e.preventDefault();closeRA();const p=document.getElementById('medyaPage');if(p){document.body.classList.add('media-page-open');p.setAttribute('aria-hidden','false');history.pushState({page:'medya'},'','#medya');window.scrollTo({top:0,behavior:'smooth'})}});
  if(info) info.addEventListener('click',e=>{e.preventDefault();const t=page.querySelector('.ra-faq-shell-v198');if(t)t.scrollIntoView({behavior:'smooth',block:'start'})});

  function closeHealth(){if(!healthMenu||!healthBtn||!healthDrop)return;healthMenu.classList.remove('open');healthBtn.setAttribute('aria-expanded','false');healthDrop.setAttribute('aria-hidden','true')}
  if(healthBtn) healthBtn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const o=!healthMenu.classList.contains('open');healthMenu.classList.toggle('open',o);healthBtn.setAttribute('aria-expanded',o?'true':'false');healthDrop.setAttribute('aria-hidden',o?'false':'true')});
  document.addEventListener('click',e=>{if(healthMenu&&!healthMenu.contains(e.target))closeHealth()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeHealth()});

  if(location.hash.replace('#','')==='romatoid-artrit') setTimeout(()=>openRA(false),0);
})();

// V201 - Romatoid Artrit konu sekmeleri + yan sekme
(function(){
  const hub=document.getElementById('romatoidDetailHubV198');
  if(!hub) return;
  const tabs=[...hub.querySelectorAll('.ra-detail-tab-v198')];
  const panels=[...hub.querySelectorAll('.ra-detail-panel-v198')];
  const sideLinks=[...hub.querySelectorAll('.ra-side-link-v200')];
  const triggers=[...document.querySelectorAll('[data-ra-detail-v198]')];

  function show(key,scroll=false){
    tabs.forEach(t=>{const a=t.dataset.raDetailV198===key;t.classList.toggle('is-active',a);t.setAttribute('aria-selected',a?'true':'false')});
    panels.forEach(p=>{const a=p.dataset.raPanelV198===key;p.classList.toggle('is-active',a);p.hidden=!a});
    sideLinks.forEach(l=>{const a=l.dataset.raDetailV198===key;l.classList.toggle('is-active',a)});
    if(scroll) hub.scrollIntoView({behavior:'smooth',block:'start'});
  }

  triggers.forEach(el=>{
    el.addEventListener('click',e=>{
      const key=el.dataset.raDetailV198;
      if(!key) return;
      e.preventDefault();
      const isTab=el.classList.contains('ra-detail-tab-v198');
      const isSide=el.classList.contains('ra-side-link-v200');
      show(key,!(isTab||isSide));
    });
  });

  window.openRomatoidDetailV198=show;
})();

// V200 - Romatoid Artrit SSS
(function(){
  const buttons=[...document.querySelectorAll('.ra-faq-question-v198')];
  buttons.forEach(btn=>btn.addEventListener('click',()=>{
    const item=btn.closest('.ra-faq-item-v198');if(!item)return;const was=item.classList.contains('is-open');
    buttons.forEach(b=>{const i=b.closest('.ra-faq-item-v198');if(i)i.classList.remove('is-open');b.setAttribute('aria-expanded','false')});
    if(!was){item.classList.add('is-open');btn.setAttribute('aria-expanded','true')}
  }));
})();


// =========================================================
// V202 - ROMATOİD ARTRİT HERO SLIDE YÖNLENDİRMELERİ
// =========================================================
(function(){
    function openRomatoidHeroV202(detailKey){
        if (typeof window.openRomatoidPageV198 === 'function') {
            window.openRomatoidPageV198(true);
            if (detailKey) {
                window.setTimeout(() => {
                    if (typeof window.openRomatoidDetailV198 === 'function') {
                        window.openRomatoidDetailV198(detailKey, true);
                    }
                }, 120);
            }
        }
    }

    document.querySelectorAll('.js-open-romatoid-hero-v202').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            openRomatoidHeroV202();
        });
    });

    document.querySelectorAll('.ra-hero-topic-v202').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            openRomatoidHeroV202(btn.dataset.raHeroTopicV202 || 'neden');
        });
    });
})();


// =========================================================
// V208 - BASİT RANDEVU FORMU
// =========================================================
(function(){
    const age=document.getElementById('age');
    const complaint=document.getElementById('complaint');
    if(age){
        age.addEventListener('input',()=>{
            if(Number(age.value)>120) age.value='120';
            if(Number(age.value)<0) age.value='';
        });
    }
    if(complaint){
        complaint.addEventListener('input',()=>{
            complaint.classList.toggle('valid-field',complaint.value.trim().length>=5);
        });
    }
})();


// =========================================================
// V215 - AĞRI KARTLARI -> TAM SAYFA ÖZEL DETAY
// V210 stabil sürüm üstüne bağımsız olarak eklenmiştir.
// =========================================================
(function() {
    const painPage=document.getElementById('agriPage');
    const detailPage=document.getElementById('painFullDetailPageV215');
    const cards=Array.from(document.querySelectorAll('#agriPage .pain-card-v76[data-pain]'));
    if(!painPage || !detailPage || !cards.length) return;

    const data={
        'diz': {
            title: 'Diz Ağrısı',
            lead: 'Diz ağrısı; eklem yüzeyi, bağ yapıları, çevre kaslar ve yük aktarımı birlikte değerlendirilerek ele alınır.',
            summaryTitle: 'Diz bölgesindeki ağrı ve zorlanma çok yönlü değerlendirilmeli.',
            summaryText: 'Şikâyetin yeri, merdiven çıkma-çömelme ile ilişkisi, tutukluk hissi ve yük taşırken artış gösterip göstermediği birlikte sorgulanır.',
            summaryCards: [
                ['Eklem Yüzeyi', 'Kıkırdak, menisküs ve eklem çevresi hassasiyetleri değerlendirilir.'],
                ['Yük Aktarımı', 'Diz-kalça-ayak hattındaki yük dağılımı incelenir.'],
                ['Hareket', 'Bükme-açma hareketleri ve fonksiyonel zorlanmalar gözden geçirilir.']
            ],
            symptomsTitle: 'Dizde öne çıkan belirtiler',
            symptomsLead: 'Özellikle hareket ve yüklenme ile ilişkili yakınmalar sık öne çıkar.',
            symptoms: [
                'Dizde ağrı, hassasiyet veya şişlik hissi',
                'Merdiven çıkarken ya da çömelirken zorlanma',
                'Uzun süre hareketsizlik sonrası tutukluk',
                'Yük verirken güvensizlik veya klik sesi'
            ],
            whoTitle: 'Kimlerde daha sık görülebilir?',
            whoText: 'Merdiven inip çıkarken zorlananlar, sporcularda yüklenme yaşayanlar, uzun süre ayakta kalanlar ve hareket kısıtlılığı hisseden kişilerde sık görülebilir.',
            evalTitle: 'Diz için değerlendirme başlıkları',
            evalText: 'Eklem hareketi, yüklenme paterni, çevre kas dengesi ve günlük yaşamı zorlayan hareketler birlikte incelenir.',
            evalCards: [
                ['Muayene', 'Eklem hattı, bağ dokular ve ağrılı noktalar değerlendirilir.'],
                ['Kas Dengesi', 'Quadriceps, hamstring ve kalça kasları birlikte ele alınır.'],
                ['Fonksiyon', 'Yürüme, çömelme ve merdiven kullanımı analiz edilir.']
            ],
            approachTitle: 'Diz ağrısında yaklaşım',
            approachText: 'Amaç; zorlayan mekanikleri belirlemek, hareket kalitesini korumak ve günlük yaşamı kolaylaştıracak kişiye özel yönlendirme oluşturmaktır.',
            approachTags: ['Yüklenme Analizi', 'Kas Dengesi', 'Fonksiyonel Test', 'Günlük Yaşam']
        },
        'ayak-ayak-bilegi': {
            title: 'Ayak - Ayak Bileği Ağrısı',
            lead: 'Ayak ve ayak bileği ağrılarında basış paterni, yük dağılımı ve eklem hareket açıklığı büyük önem taşır.',
            summaryTitle: 'Ayak-bilek bölgesi yürüyüş ve dengede temel rol oynar.',
            summaryText: 'Ağrının basarken artması, burkulma öyküsü, topuk veya taban etkilenimi ve günlük yürüyüş kapasitesi birlikte değerlendirilir.',
            summaryCards: [
                ['Basış', 'Ayak arkı ve zemine temas biçimi gözlenir.'],
                ['Denge', 'Ayak bileği stabilitesi ve kontrolü incelenir.'],
                ['Yük Dağılımı', 'Ağrının gün içindeki yüklenmeyle ilişkisi değerlendirilir.']
            ],
            symptomsTitle: 'Ayak ve ayak bileğinde belirtiler',
            symptomsLead: 'Basarken artan yakınmalar ve dengesizlik hissi sık karşılaşılabilir.',
            symptoms: [
                'Basarken artan ağrı veya hassasiyet',
                'Ayak bileğinde tutukluk ya da instabilite hissi',
                'Topuk, taban veya bilek çevresinde rahatsızlık',
                'Yürüyüş sırasında dengesizlik veya çabuk yorulma'
            ],
            whoTitle: 'Kimlerde görülebilir?',
            whoText: 'Uzun süre ayakta kalanlar, yürüyüş sırasında ağrı yaşayanlar, spor yapanlar ve tekrarlayan burkulma öyküsü olan kişilerde daha sık görülebilir.',
            evalTitle: 'Ayak-bilek değerlendirme başlıkları',
            evalText: 'Ayak arkı, subtalar hareketler, bilek mobilitesi ve yürüyüş alışkanlıkları birlikte ele alınır.',
            evalCards: [
                ['Yürüyüş', 'Basış paterni ve adım mekanikleri izlenir.'],
                ['Mobilite', 'Ayak bileği hareket açıklığı gözden geçirilir.'],
                ['Destek', 'Ayakkabı kullanımı ve günlük alışkanlıklar değerlendirilir.']
            ],
            approachTitle: 'Ayak-bilek yaklaşımı',
            approachText: 'Gerektiğinde günlük kullanım düzenlemeleri, destekleyici öneriler ve kişiye uygun hareket yaklaşımı planlanır.',
            approachTags: ['Basış Analizi', 'Yürüyüş', 'Mobilite', 'Destekleyici Öneriler']
        },
        'kalca': {
            title: 'Kalça Ağrısı',
            lead: 'Kalça ağrısı; eklem, çevre kaslar, sakroiliak bölge ve omurga ilişkisiyle birlikte ele alınır.',
            summaryTitle: 'Kalça ağrısı hareket kalitesini doğrudan etkileyebilir.',
            summaryText: 'Kasık, yan kalça veya kalça arkası yakınmaları; oturup kalkma, yürüme ve dönme hareketleriyle birlikte değerlendirilir.',
            summaryCards: [
                ['Hareket Açıklığı', 'Kalçanın dönme ve bükülme hareketleri incelenir.'],
                ['Pelvis', 'Pelvik hizalanma ve yük aktarımı gözden geçirilir.'],
                ['Kas Yapıları', 'Gluteal kaslar ve çevre yumuşak dokular değerlendirilir.']
            ],
            symptomsTitle: 'Kalçada öne çıkan belirtiler',
            symptomsLead: 'Kasık veya yan kalça kaynaklı ağrılar günlük hareketleri etkileyebilir.',
            symptoms: [
                'Kalça veya kasık bölgesinde ağrı',
                'Yürürken, oturup kalkarken zorlanma',
                'Hareket açıklığında azalma',
                'Kalça çevresinde sertlik veya yük aktarımında bozulma'
            ],
            whoTitle: 'Kimlerde daha sık olabilir?',
            whoText: 'Uzun süre oturanlar, yürümede zorlananlar, kalça çevresinde sıkışma veya gerginlik hisseden kişilerde sık görülebilir.',
            evalTitle: 'Kalça için değerlendirme',
            evalText: 'Kalça eklem hareketleri, gluteal kas dengesi, pelvik hizalanma ve omurga-kalça ilişkisi birlikte değerlendirilir.',
            evalCards: [
                ['Eklem', 'Kalça ekleminin fonksiyonel hareketleri analiz edilir.'],
                ['Kas Dengesi', 'Gluteal ve çevre kaslar değerlendirilir.'],
                ['Fonksiyonel Kullanım', 'Yürüme ve oturup kalkma hareketi ele alınır.']
            ],
            approachTitle: 'Kalça ağrısında yaklaşım',
            approachText: 'Şikâyeti artıran mekanik yükleri azaltmak, günlük fonksiyonu desteklemek ve hareketi rahatlatmak hedeflenir.',
            approachTags: ['Pelvis', 'Kalça Hareketi', 'Kas Dengesi', 'Fonksiyonel Analiz']
        },
        'bel': {
            title: 'Bel Ağrısı',
            lead: 'Bel ağrısı; postür, omurga hareketi, disk-eklem ilişkisi ve günlük yaşam yüklenmeleri açısından detaylı değerlendirme gerektirir.',
            summaryTitle: 'Bel bölgesindeki yakınmalar kişiye özel ele alınmalıdır.',
            summaryText: 'Bel ağrısının ne zaman arttığı, hangi pozisyonlarda rahatladığı, günlük yaşam ve çalışma düzenini nasıl etkilediği birlikte değerlendirilir.',
            summaryCards: [
                ['Postür', 'Oturma, ayakta durma ve yük taşıma alışkanlıkları incelenir.'],
                ['Omurga - Kalça', 'Belin kalça ve pelvis ile ilişkisi değerlendirilir.'],
                ['Günlük Yaşam', 'Uzun oturma, eğilme ve dönme gibi hareketler gözden geçirilir.']
            ],
            symptomsTitle: 'Bel ağrısında sık görülen belirtiler',
            symptomsLead: 'Duruş ve hareketle ilişkili yakınmalar ön planda olabilir.',
            symptoms: [
                'Bel bölgesinde ağrı, tutukluk veya yanma hissi',
                'Uzun oturma veya ayakta kalma sonrası rahatsızlık',
                'Eğilme, dönme veya kalkma sırasında zorlanma',
                'Bazen kalça veya bacağa yayılan ağrı hissi'
            ],
            whoTitle: 'Kimlerde sık görülebilir?',
            whoText: 'Masa başı çalışanlar, uzun süre aynı pozisyonda kalanlar, yük kaldıranlar ve duruş problemi yaşayan kişilerde sık görülür.',
            evalTitle: 'Bel ağrısında değerlendirme',
            evalText: 'Postür analizi, omurga-kalça biyomekaniği, kas dengesizlikleri ve günlük yaşam alışkanlıkları birlikte ele alınır.',
            evalCards: [
                ['Postür Analizi', 'Duruş bozuklukları ve yüklenme paternleri gözden geçirilir.'],
                ['Hareket', 'Eğilme, dönme ve doğrulma hareketleri değerlendirilir.'],
                ['Kas Yapıları', 'Bel, karın, kalça ve çevre kas ilişkileri incelenir.']
            ],
            approachTitle: 'Bel ağrısında yaklaşım',
            approachText: 'Hedef; hareket kalitesini artırmak, zorlayıcı alışkanlıkları düzenlemek ve günlük konforu destekleyecek kişiye özel yol haritası oluşturmaktır.',
            approachTags: ['Postür Analizi', 'Omurga - Kalça', 'Hareket Kısıtlılığı', 'Günlük Konfor']
        },
        'sirt': {
            title: 'Sırt Ağrısı',
            lead: 'Sırt ağrılarında omurga segmentleri, kürek kemiği çevresi, boyun-sırt ilişkisi ve kas gerginlikleri birlikte değerlendirilir.',
            summaryTitle: 'Sırt ağrısı çoğu zaman duruş ve kas gerginliğiyle ilişkilidir.',
            summaryText: 'Öne eğik çalışma, masa başı yaşam, stres ve boyun-sırt bölgesi arasındaki yüklenme ilişkisi ayrıntılı biçimde değerlendirilir.',
            summaryCards: [
                ['Torasik Bölge', 'Sırt omurlarının hareket açıklığı ele alınır.'],
                ['Skapula', 'Kürek kemiği çevresi kas dengesi değerlendirilir.'],
                ['Boyun İlişkisi', 'Boyun-sırt bağlantılı gerginlikler gözden geçirilir.']
            ],
            symptomsTitle: 'Sırt ağrısında belirtiler',
            symptomsLead: 'Kas gerginliği ve omurga çevresinde sıkışma hissi sık öne çıkar.',
            symptoms: [
                'Sırt bölgesinde ağrı veya künt rahatsızlık',
                'Kas gerginliği ve kürek kemikleri arasında sıkışma hissi',
                'Omurga hareketlerinde sertlik veya zorlanma',
                'Boyun ile sırt arasında yayılan gerginlik'
            ],
            whoTitle: 'Kimlerde görülebilir?',
            whoText: 'Bilgisayar başında çalışanlar, stresle birlikte kas gerginliği yaşayanlar ve uzun süre öne eğik pozisyonda kalan kişilerde sık görülebilir.',
            evalTitle: 'Sırt ağrısında değerlendirme',
            evalText: 'Duruş, solunum paterni, skapular denge ve torasik hareket açıklığı birlikte değerlendirilir.',
            evalCards: [
                ['Kas Gerginliği', 'Sırt kaslarındaki gergin alanlar incelenir.'],
                ['Mobilite', 'Torasik omurga ve kaburga hareketleri değerlendirilir.'],
                ['Postür', 'Çalışma düzeni ve oturuş alışkanlıkları ele alınır.']
            ],
            approachTitle: 'Sırt ağrısında yaklaşım',
            approachText: 'Kas gevşetici yaklaşım, omurga mobilitesi, yaşam tarzı önerileri ve bölgeye uygun hareket planlaması birlikte düşünülür.',
            approachTags: ['Kas Gerginliği', 'Torasik Mobilite', 'Skapular Denge', 'Boyun - Sırt İlişkisi']
        },
        'dirsek': {
            title: 'Dirsek Ağrısı',
            lead: 'Dirsek ağrılarında tekrarlayan kullanım, tendon yapıları ve el-bilek-dirsek zinciri birlikte değerlendirilir.',
            summaryTitle: 'Dirsek ağrısı çoğu zaman kullanım alışkanlıklarıyla ilişkilidir.',
            summaryText: 'Kavrama, taşıma, yazı yazma veya bilgisayar kullanımı gibi tekrar eden yüklenmeler sorgulanarak değerlendirme yapılır.',
            summaryCards: [
                ['Tendon Yapıları', 'Dirsek çevresindeki tendon hassasiyetleri incelenir.'],
                ['Kullanım Şekli', 'Gün içindeki tekrar eden hareketler değerlendirilir.'],
                ['Ön Kol', 'Kas gerginliği ve kuvvet dengesi gözden geçirilir.']
            ],
            symptomsTitle: 'Dirsek ağrısında belirtiler',
            symptomsLead: 'Kavrama ve taşıma ile artan rahatsızlık öne çıkabilir.',
            symptoms: [
                'Dirsek çevresinde ağrı ve hassasiyet',
                'Kavrama veya taşıma sırasında artan rahatsızlık',
                'Açma-kapama hareketlerinde zorlanma',
                'Ön kol boyunca gerginlik hissi'
            ],
            whoTitle: 'Kimlerde sık görülebilir?',
            whoText: 'Bilgisayar kullananlarda, tekrarlayan kavrama hareketi yapanlarda ve sporcularda dirsek ağrısı daha sık izlenebilir.',
            evalTitle: 'Dirsek için değerlendirme',
            evalText: 'Dirsek hareket açıklığı, tendon hassasiyeti, ön kol kas dengesi ve tekrarlayıcı kullanım alışkanlıkları ele alınır.',
            evalCards: [
                ['Muayene', 'Ağrılı bölgenin yerleşimi değerlendirilir.'],
                ['Fonksiyon', 'Kavrama ve kaldırma hareketleri gözden geçirilir.'],
                ['Ergonomi', 'İş ve kullanım düzeni analiz edilir.']
            ],
            approachTitle: 'Dirsek ağrısında yaklaşım',
            approachText: 'Tekrarlayıcı yüklenmeyi azaltmak, fonksiyonel kullanımı rahatlatmak ve kişiye özel öneriler geliştirmek amaçlanır.',
            approachTags: ['Tendon Yapıları', 'Tekrarlayıcı Kullanım', 'Ön Kol', 'Fonksiyon']
        },
        'omuz': {
            title: 'Omuz Ağrısı',
            lead: 'Omuz ağrısında eklem hareket açıklığı, rotator manşet yapıları, skapula dengesi ve boyun-omuz ilişkisi önemlidir.',
            summaryTitle: 'Omuz hareketi günlük yaşam için kritik öneme sahiptir.',
            summaryText: 'Kol kaldırma, uzanma, giyinme veya gece ağrısı gibi yakınmaların seyri ve hareketle ilişkisi birlikte değerlendirilir.',
            summaryCards: [
                ['Hareket Açıklığı', 'Omuzun kaldırma ve döndürme hareketleri incelenir.'],
                ['Skapula', 'Kürek kemiği ritmi ve dengesi gözden geçirilir.'],
                ['Boyun İlişkisi', 'Boyundan kaynaklı etkiler birlikte değerlendirilir.']
            ],
            symptomsTitle: 'Omuz ağrısında belirtiler',
            symptomsLead: 'Özellikle kolu kaldırırken zorlanma ve gece rahatsızlığı sık görülebilir.',
            symptoms: [
                'Omuzda ağrı ve hareket kısıtlılığı',
                'Kol kaldırırken zorlanma',
                'Gece artan omuz rahatsızlığı',
                'Omuz çevresinde güçsüzlük veya sertlik hissi'
            ],
            whoTitle: 'Kimlerde görülebilir?',
            whoText: 'Kolunu yukarı kaldırırken ağrı hissedenler, tekrarlayan omuz kullanımı olanlar ve donukluk yaşayan kişilerde sık görülebilir.',
            evalTitle: 'Omuz için değerlendirme',
            evalText: 'Omuz eklemi, skapular ritim, boyunla ilişkili etkiler ve çevre kas dengesizlikleri birlikte değerlendirilir.',
            evalCards: [
                ['Eklem', 'Omuz ekleminin hareket kapasitesi incelenir.'],
                ['Kas Yapıları', 'Rotator manşet ve çevre kas yapıları değerlendirilir.'],
                ['Fonksiyon', 'Günlük omuz kullanımı ve kısıtlılık ele alınır.']
            ],
            approachTitle: 'Omuz ağrısında yaklaşım',
            approachText: 'Ağrıyı artıran mekanik yükleri azaltmak, omuz hareket kalitesini desteklemek ve günlük fonksiyonu korumak hedeflenir.',
            approachTags: ['Rotator Manşet', 'Skapula', 'Hareket Açıklığı', 'Fonksiyonel Kullanım']
        },
        'el-bilegi': {
            title: 'El Bileği Ağrısı',
            lead: 'El bileği ağrılarında eklem hareketi, tendon yapıları, kavrama fonksiyonu ve günlük kullanım alışkanlıkları değerlendirilir.',
            summaryTitle: 'El bileği günlük kullanımın merkezinde yer alır.',
            summaryText: 'Yazma, bilgisayar kullanma, taşıma, kavrama ve ince motor aktivitelerde artan yakınmalar değerlendirme için önemlidir.',
            summaryCards: [
                ['Kavrama', 'Tutuş sırasında rahatsızlık olup olmadığı değerlendirilir.'],
                ['Tendonlar', 'El bileği çevresi yumuşak doku yapıları incelenir.'],
                ['Günlük Kullanım', 'Tekrarlayıcı hareketler ve kullanım sıklığı gözden geçirilir.']
            ],
            symptomsTitle: 'El bileği ağrısında belirtiler',
            symptomsLead: 'Hareket ve kavrama ile ilişkili yakınmalar sık ön planda olabilir.',
            symptoms: [
                'El bileğinde ağrı veya hassasiyet',
                'Kavrama sırasında rahatsızlık',
                'Hareketle artan zorlanma',
                'Günlük kullanımda çabuk yorulma hissi'
            ],
            whoTitle: 'Kimlerde sık görülebilir?',
            whoText: 'Bilgisayar kullanıcılarında, elini yoğun kullananlarda, tekrarlayan hareket yapanlarda ve yük taşırken zorlanan kişilerde görülebilir.',
            evalTitle: 'El bileği değerlendirme başlıkları',
            evalText: 'El bileği mobilitesi, el-kol zinciri, kavrama gücü ve tekrarlayıcı yüklenmeler birlikte ele alınır.',
            evalCards: [
                ['Mobilite', 'El bileği hareket açıklığı değerlendirilir.'],
                ['Ergonomi', 'Kullanım alışkanlıkları ve çalışma düzeni incelenir.'],
                ['Fonksiyon', 'Kavrama, taşıma ve ince motor beceriler ele alınır.']
            ],
            approachTitle: 'El bileği ağrısında yaklaşım',
            approachText: 'Şikâyete göre ergonomi, kullanım önerileri ve hareket planlaması ile günlük işlevlerin desteklenmesi amaçlanır.',
            approachTags: ['Kavrama Fonksiyonu', 'Ergonomi', 'Mobilite', 'Günlük Kullanım']
        }
    };

    // V265 - Osteopati Ağrı Rehberi için doğrudan açılan birleşik ağrı başlıkları.
    data['boyun-ense'] = {
        title: 'Boyun & Ense Ağrısı',
        lead: 'Boyun ve ense yakınmaları; servikal hareketlilik, omuz kuşağı, postür ve günlük yüklenmelerle birlikte değerlendirilir.',
        summaryTitle: 'Boyun ve ense bölgesi baş, omuz ve sırtla birlikte çalışır.',
        summaryText: 'Ağrının baş hareketleriyle ilişkisi, masa başı çalışma, uyku pozisyonu ve omuz kuşağı gerginliği birlikte sorgulanır.',
        summaryCards: [
            ['Servikal Hareket', 'Boynun dönme, eğilme ve doğrulma hareketleri gözden geçirilir.'],
            ['Omuz Kuşağı', 'Skapula ve üst trapez bölgesindeki yüklenmeler değerlendirilir.'],
            ['Postür', 'Başın öne taşınması ve uzun süreli çalışma pozisyonları incelenir.']
        ],
        symptomsTitle: 'Boyun ve ense bölgesinde öne çıkan belirtiler',
        symptomsLead: 'Hareket kısıtlılığı, tutukluk ve omuzlara yayılan gerginlik hissi eşlik edebilir.',
        symptoms: ['Boyun veya ense bölgesinde ağrı ve tutukluk','Başı çevirirken hareket kısıtlılığı','Omuz kuşağına yayılan gerginlik','Uzun masa başı çalışma sonrası artan rahatsızlık'],
        whoTitle: 'Boyun & Ense Ağrısı kimlerde görülebilir?',
        whoText: 'Uzun süre ekran karşısında çalışanlarda, aynı pozisyonda kalanlarda ve baş-boyun postüründe zorlanma yaşayanlarda görülebilir.',
        evalTitle: 'Boyun ve ense için değerlendirme',
        evalText: 'Servikal hareket açıklığı, omuz kuşağı, torakal bölge ve postür ilişkisi birlikte ele alınır.',
        evalCards: [['Hareket','Boyun hareket açıklığı değerlendirilir.'],['Postür','Baş-boyun ve omuz hizalanması gözlenir.'],['Hareket Zinciri','Toraks ve skapula ile ilişkiler incelenir.']],
        approachTitle: 'Boyun ve ense ağrısında yaklaşım',
        approachText: 'Amaç; zorlayıcı günlük alışkanlıkları belirlemek, hareket kalitesini desteklemek ve kişiye uygun yönlendirme oluşturmaktır.',
        approachTags: ['Boyun Mobilitesi','Postür','Omuz Kuşağı','Günlük Ergonomi']
    };

    data['bel-sirt'] = {
        ...data['bel'],
        title: 'Bel & Sırt Ağrısı',
        lead: 'Bel ve sırt ağrısı; omurga hareketliliği, postür, pelvis ve günlük yüklenme paternleri birlikte değerlendirilerek ele alınır.',
        summaryTitle: 'Bel ve sırt bölgesi bütün bir omurga zinciri olarak değerlendirilir.',
        summaryText: 'Uzun oturma, eğilme, dönme, ayakta kalma ve çalışma düzeninin bel-sırt bölgesindeki yakınmalarla ilişkisi incelenir.',
        symptomsTitle: 'Bel ve sırt ağrısında sık görülen belirtiler',
        symptomsLead: 'Tutukluk, hareketle artan rahatsızlık ve uzun pozisyonlarda zorlanma öne çıkabilir.',
        whoTitle: 'Bel & Sırt Ağrısı kimlerde görülebilir?',
        evalTitle: 'Bel ve sırt için değerlendirme',
        approachTitle: 'Bel ve sırt ağrısında yaklaşım',
        approachTags: ['Omurga Hareketi','Postür','Pelvis','Günlük Yüklenme']
    };

    data['omuz-kol'] = {
        ...data['omuz'],
        title: 'Omuz & Kol Ağrısı',
        lead: 'Omuz ve kol ağrısında omuz eklemi, skapula, boyun ilişkisi ve üst ekstremite kullanım paterni birlikte değerlendirilir.',
        summaryTitle: 'Omuz ve kol hareketleri aynı fonksiyonel zincirin parçalarıdır.',
        summaryText: 'Kol kaldırma, uzanma, taşıma ve tekrarlayıcı kullanım sırasında oluşan yakınmalar birlikte değerlendirilir.',
        symptomsTitle: 'Omuz ve kol bölgesinde öne çıkan belirtiler',
        symptomsLead: 'Kolu kaldırırken zorlanma, hareket kısıtlılığı ve yayılan rahatsızlık görülebilir.',
        whoTitle: 'Omuz & Kol Ağrısı kimlerde görülebilir?',
        evalTitle: 'Omuz ve kol için değerlendirme',
        approachTitle: 'Omuz ve kol ağrısında yaklaşım',
        approachTags: ['Omuz Hareketi','Skapula','Boyun İlişkisi','Üst Ekstremite']
    };

    data['kalca-diz'] = {
        ...data['kalca'],
        title: 'Kalça & Diz Ağrısı',
        lead: 'Kalça ve diz ağrısında pelvis, kalça eklemi, diz ve ayak hattındaki yük aktarımı birlikte değerlendirilir.',
        summaryTitle: 'Kalça ve diz alt ekstremite hareket zincirinin temel parçalarıdır.',
        summaryText: 'Yürüme, merdiven, oturup kalkma ve çömelme gibi hareketlerde yükün kalça-diz hattında nasıl aktarıldığı incelenir.',
        symptomsTitle: 'Kalça ve diz bölgesinde öne çıkan belirtiler',
        symptomsLead: 'Yürüme ve yüklenme ile artan yakınmalar, hareket kısıtlılığı veya tutukluk görülebilir.',
        whoTitle: 'Kalça & Diz Ağrısı kimlerde görülebilir?',
        evalTitle: 'Kalça ve diz için değerlendirme',
        approachTitle: 'Kalça ve diz ağrısında yaklaşım',
        approachTags: ['Pelvis','Kalça','Diz','Yük Aktarımı']
    };

    data['cene-bas'] = {
        title: 'Çene & Baş Ağrısı',
        lead: 'Çene ve baş bölgesi yakınmalarında temporomandibular eklem, çiğneme kasları, boyun postürü ve baş-boyun ilişkisi birlikte değerlendirilir.',
        summaryTitle: 'Çene, baş ve boyun bölgesi yakınmaları birbiriyle ilişkili olabilir.',
        summaryText: 'Çiğneme, ağız açma-kapama, diş sıkma öyküsü, baş-boyun postürü ve günlük stres faktörleri birlikte sorgulanır.',
        summaryCards: [
            ['TME', 'Çene eklemi hareketi ve açma-kapama paterni değerlendirilir.'],
            ['Çiğneme Kasları', 'Çene çevresi kas gerginliği ve hassasiyet alanları incelenir.'],
            ['Baş-Boyun İlişkisi', 'Servikal postür ve üst çapraz paternler gözden geçirilir.']
        ],
        symptomsTitle: 'Çene ve baş bölgesinde öne çıkan belirtiler',
        symptomsLead: 'Çene hareketinde rahatsızlık, baş çevresinde gerginlik veya boyun eşlikli yakınmalar görülebilir.',
        symptoms: ['Çene ekleminde ağrı veya hassasiyet','Ağız açarken klik veya zorlanma hissi','Şakak ve baş çevresinde gerginlik','Boyun ve çene yakınmalarının birlikte artması'],
        whoTitle: 'Çene & Baş Ağrısı kimlerde görülebilir?',
        whoText: 'Diş sıkma öyküsü olanlarda, çene ekleminde rahatsızlık yaşayanlarda ve baş-boyun postüründe zorlanma bulunan kişilerde görülebilir.',
        evalTitle: 'Çene ve baş bölgesi için değerlendirme',
        evalText: 'TME hareketi, çiğneme kasları, boyun hareketliliği ve postür ilişkisi birlikte değerlendirilir.',
        evalCards: [['TME Hareketi','Çenenin açma-kapama ve yan hareketleri gözlenir.'],['Kaslar','Çiğneme ve boyun çevresi kaslar değerlendirilir.'],['Postür','Baş-boyun hizalanması ve günlük alışkanlıklar incelenir.']],
        approachTitle: 'Çene ve baş yakınmalarında yaklaşım',
        approachText: 'Yaklaşım; değerlendirme bulgularına göre çene-boyun ilişkisini ve günlük kullanım alışkanlıklarını dikkate alacak şekilde planlanır.',
        approachTags: ['TME','Baş-Boyun','Çiğneme Kasları','Postür']
    };

    const title=document.getElementById('painFullTitleV215');
    const lead=document.getElementById('painFullLeadV215');
    const image=document.getElementById('painFullImageV215');
    const tabs=Array.from(detailPage.querySelectorAll('.pain-full-tab-v215[data-pain-full-tab-v215]'));
    const panels=Array.from(detailPage.querySelectorAll('[data-pain-full-panel-v215]'));
    const generalTitle=document.getElementById('painFullGeneralTitleV215');
    const generalText=document.getElementById('painFullGeneralTextV215');
    const generalCards=document.getElementById('painFullGeneralCardsV215');
    const symptomsTitle=document.getElementById('painFullSymptomsTitleV215');
    const symptomsLead=document.getElementById('painFullSymptomsLeadV215');
    const symptomsList=document.getElementById('painFullSymptomsListV215');
    const whoTitle=document.getElementById('painFullWhoTitleV215');
    const whoText=document.getElementById('painFullWhoTextV215');
    const evalTitle=document.getElementById('painFullEvalTitleV215');
    const evalText=document.getElementById('painFullEvalTextV215');
    const evalCards=document.getElementById('painFullEvalCardsV215');
    const approachTitle=document.getElementById('painFullApproachTitleV215');
    const approachText=document.getElementById('painFullApproachTextV215');
    const approachTags=document.getElementById('painFullApproachTagsV215');
    const backButtons=[document.getElementById('painFullBackV215')].filter(Boolean);
    const homeButton=document.getElementById('painFullHomeV215');
    const treatmentAreasButton=document.getElementById('painFullTreatmentAreasV215');
    const appointment=document.getElementById('painFullAppointmentV215');
    const quickBack=document.getElementById('painFullBackQuickV217');
    const quickButtons=Array.from(detailPage.querySelectorAll('[data-pain-quick-v217]'));
    const contextImages=Array.from(detailPage.querySelectorAll('[data-pain-context-image-v219]'));
    const quickImages=Array.from(detailPage.querySelectorAll('[data-pain-quick-image-v219]'));

    let activePain='';
    let activeImageSrc='';

    const painImageMap={};
    cards.forEach(card=>{
      const img=card.querySelector('img');
      if(img) painImageMap[card.dataset.pain]=img.getAttribute('src')||img.src;
    });
    // V265: Osteopati ağrı kartları için uygun mevcut ağrı görsellerini yeniden kullan.
    painImageMap['boyun-ense'] = painImageMap['omuz'] || painImageMap['sirt'] || '';
    painImageMap['bel-sirt'] = painImageMap['bel'] || painImageMap['sirt'] || '';
    painImageMap['omuz-kol'] = painImageMap['omuz'] || '';
    painImageMap['kalca-diz'] = painImageMap['kalca'] || painImageMap['diz'] || '';
    painImageMap['cene-bas'] = './disease-bas-agrisi-migren-v77.png?v=150';
    quickImages.forEach(img=>{
      const key=img.dataset.painQuickImageV219;
      if(painImageMap[key]) img.src=painImageMap[key];
    });

    function cardHtml(items) {
      return (items||[]).map(item=>`<article class="pain-full-info-card-v215 pain-full-info-card-v219"><div class="pain-full-card-image-v219"><img src="${activeImageSrc||''}" alt="${item[0]} görseli"></div><div class="pain-full-card-body-v219"><strong>${item[0]}</strong><p>${item[1]}</p><span>Detayları İncele →</span></div></article>`).join('');
    }

    function openTab(key) {
      tabs.forEach(tab=>{
        const active=tab.dataset.painFullTabV215===key;
        tab.classList.toggle('is-active',active);
        tab.setAttribute('aria-selected',active?'true':'false');
      });
      panels.forEach(panel=>{
        const active=panel.dataset.painFullPanelV215===key;
        panel.classList.toggle('is-active',active);
        panel.hidden=!active;
      });
      const main=document.querySelector('.pain-full-main-v215');
      if(main && key!=='genel') main.scrollIntoView({behavior:'smooth',block:'start'});
    }

    function render(key,card) {
      const item=data[key];
      if(!item) return;
      activePain=key;
      quickButtons.forEach(btn=>{
        const active=btn.dataset.painQuickV217===key;
        btn.classList.toggle('is-active',active);
        btn.setAttribute('aria-current',active?'page':'false');
      });
      if(title) title.textContent=item.title;
      if(lead) lead.textContent=item.lead+' '+item.summaryText;
      const cardImage=card ? card.querySelector('img') : null;
      activeImageSrc=(cardImage && (cardImage.getAttribute('src')||cardImage.src)) || painImageMap[key] || activeImageSrc;
      if(image && activeImageSrc) { image.src=activeImageSrc; image.alt=item.title+' medikal görseli'; }
      contextImages.forEach(img=>{ if(activeImageSrc){ img.src=activeImageSrc; img.alt=item.title+' medikal görseli'; } });
      if(generalTitle) generalTitle.textContent=item.summaryTitle;
      if(generalText) generalText.textContent=item.summaryText;
      if(generalCards) generalCards.innerHTML=cardHtml(item.summaryCards);
      if(symptomsTitle) symptomsTitle.textContent=item.symptomsTitle;
      if(symptomsLead) symptomsLead.textContent=item.symptomsLead;
      if(symptomsList) symptomsList.innerHTML=(item.symptoms||[]).map(x=>`<li>${x}</li>`).join('');
      if(whoTitle) whoTitle.textContent=item.title+' kimlerde görülebilir?';
      if(whoText) whoText.textContent=item.whoText;
      if(evalTitle) evalTitle.textContent=item.evalTitle;
      if(evalText) evalText.textContent=item.evalText;
      if(evalCards) evalCards.innerHTML=cardHtml(item.evalCards);
      if(approachTitle) approachTitle.textContent=item.approachTitle;
      if(approachText) approachText.textContent=item.approachText;
      if(approachTags) approachTags.innerHTML=(item.approachTags||[]).map(x=>`<span>${x}</span>`).join('');
      openTab('genel');
    }

    function openDetail(key,card,push=true) {
      render(key,card);
      document.body.classList.remove('pain-page-open','pain-nav-scrolled');
      document.body.classList.add('pain-full-detail-open-v215');
      painPage.setAttribute('aria-hidden','true');
      detailPage.setAttribute('aria-hidden','false');
      if(push) history.pushState({page:'pain-full-detail-v215',pain:key},'', '#agri-'+key);
      window.scrollTo({top:0,behavior:'smooth'});
    }

    function closeDetail(push=true) {
      document.body.classList.remove('pain-full-detail-open-v215');
      document.body.classList.add('pain-page-open');
      detailPage.setAttribute('aria-hidden','true');
      painPage.setAttribute('aria-hidden','false');
      if(push) history.pushState({page:'agri'},'', '#agri');
      window.scrollTo({top:0,behavior:'smooth'});
    }

    cards.forEach(card=>{
      const cta=card.querySelector('.pain-card-body-v76 span');
      if(cta) cta.textContent='Detay Sayfasını Aç ↗';
      card.addEventListener('click',event=>{
        event.preventDefault();
        openDetail(card.dataset.pain,card,true);
      });
    });

    tabs.forEach((tab,index)=>{
      tab.addEventListener('click',()=>openTab(tab.dataset.painFullTabV215));
      tab.addEventListener('keydown',event=>{
        if(event.key!=='ArrowRight'&&event.key!=='ArrowLeft') return;
        event.preventDefault();
        const dir=event.key==='ArrowRight'?1:-1;
        const next=tabs[(index+dir+tabs.length)%tabs.length];
        next.focus(); next.click();
      });
    });

    quickButtons.forEach(btn=>{
      btn.addEventListener('click',()=>{
        const key=btn.dataset.painQuickV217;
        const card=cards.find(c=>c.dataset.pain===key);
        if(!card || key===activePain) return;
        render(key,card);
        history.pushState({page:'pain-full-detail-v215',pain:key},'', '#agri-'+key);
        const hero=detailPage.querySelector('.pain-full-hero-v215');
        if(hero) hero.scrollIntoView({behavior:'smooth',block:'start'});
      });
    });

    if(quickBack) quickBack.addEventListener('click',()=>closeDetail(true));

    backButtons.forEach(btn=>btn.addEventListener('click',()=>closeDetail(true)));

    if(homeButton) homeButton.addEventListener('click',()=>{
      document.body.classList.remove('pain-full-detail-open-v215','pain-page-open');
      detailPage.setAttribute('aria-hidden','true');
      painPage.setAttribute('aria-hidden','true');
      history.pushState({page:'home'},'',location.pathname+location.search);
      window.scrollTo({top:0,behavior:'smooth'});
    });

    if(treatmentAreasButton) treatmentAreasButton.addEventListener('click',()=>{
      document.body.classList.remove('pain-full-detail-open-v215');
      detailPage.setAttribute('aria-hidden','true');
      const page=document.getElementById('tedaviAlanlariPage');
      if(typeof window.openTreatmentPage==='function') { window.openTreatmentPage(); return; }
      if(page) { document.body.classList.add('treatment-page-open'); page.setAttribute('aria-hidden','false'); window.scrollTo({top:0,behavior:'smooth'}); }
    });

    if(appointment) appointment.addEventListener('click',event=>{
      event.preventDefault();
      document.body.classList.remove('pain-full-detail-open-v215','pain-page-open');
      detailPage.setAttribute('aria-hidden','true');
      painPage.setAttribute('aria-hidden','true');
      history.pushState({page:'home',section:'randevu'},'', '#randevu');
      const target=document.getElementById('randevu');
      if(target) setTimeout(()=>target.scrollIntoView({behavior:'smooth',block:'start'}),40);
    });

    window.openPainFullDetailV215=openDetail;
    window.closePainFullDetailV215=closeDetail;

    const painHashPattern=/^#agri-(diz|ayak-ayak-bilegi|kalca|bel|sirt|dirsek|omuz|el-bilegi|boyun-ense|bel-sirt|omuz-kol|kalca-diz|cene-bas)$/;
    const match=location.hash.match(painHashPattern);
    if(match && data[match[1]]) {
      const card=cards.find(c=>c.dataset.pain===match[1]) || null;
      openDetail(match[1],card,false);
    }

    window.addEventListener('popstate',()=>{
      const m=location.hash.match(painHashPattern);
      if(m && data[m[1]]) {
        const card=cards.find(c=>c.dataset.pain===m[1]) || null;
        openDetail(m[1],card,false);
      }
      else if(location.hash==='#agri' && document.body.classList.contains('pain-full-detail-open-v215')) closeDetail(false);
    });
})();


// V218: Hızlı ağrı geçişi hero içine taşındı; mevcut data-pain-quick-v217 davranışı korunur.

// =========================================================
// V233 - FİTOTERAPİ AS BUTONU -> ANKİLOZAN ÖZEL SAYFASI
// =========================================================
(function () {
    const asButton = document.querySelector('.phyto-disease-chip-btn-v232[data-phyto-disease="as"]');
    const raButton = document.querySelector('.phyto-disease-chip-btn-v232[data-phyto-disease="ra"]');
    const raSection = document.getElementById('phytoRaPlaceholderV232');
    const diseaseButtons = Array.from(document.querySelectorAll('.phyto-disease-chip-btn-v232'));
    const titleNode = document.getElementById('phytoConditionTitleV232');
    const descNode = document.getElementById('phytoConditionDescV232');
    const imageNode = document.getElementById('phytoConditionImageV232');
    const pointsNode = document.getElementById('phytoConditionPointsV232');
    const goHerbsButton = document.getElementById('phytoGoHerbsV232');
    const openDiseaseButton = document.getElementById('phytoOpenDiseasePageV232');

    const raData = {
        title: 'Romatoid Artrit',
        desc: 'Romatoid artritte küçük eklem yakınmaları, sabah tutukluğu ve inflamatuar aktivite ön planda olabilir. Romatoid artrite özel bitkisel bölüm sonraki adımda aynı yapıyla hazırlanacaktır.',
        image: './disease-romatoid-artrit-v77.png?v=150',
        alt: 'Romatoid artritte el ve el bileği eklemlerini gösteren medikal görsel',
        points: [
            ['El & El Bileği', 'Simetrik küçük eklem tutulumu ve günlük yaşam fonksiyonları değerlendirilir.'],
            ['İnflamatuar Yük', 'Yorgunluk, hassasiyet ve sabah tutukluğu gibi belirtiler birlikte ele alınır.'],
            ['Yakında', 'Romatoid artrite özel bitkisel destek bölümü sonraki adımda eklenecektir.']
        ]
    };

    function renderRaPoints() {
        if (!pointsNode) return;
        pointsNode.innerHTML = raData.points.map(([title, text]) => (
            `<article><strong>${title}</strong><span>${text}</span></article>`
        )).join('');
    }

    function openAnkilozanFromPhyto() {
        if (typeof window.openAnkilozanPageV87 === 'function') {
            window.openAnkilozanPageV87();
            return;
        }

        const card = document.querySelector('.ankilozan-card-link-v87');
        if (card) card.click();
    }

    if (asButton) {
        asButton.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            openAnkilozanFromPhyto();
        });
    }

    if (raButton) {
        raButton.addEventListener('click', () => {
            diseaseButtons.forEach((button) => {
                const active = button === raButton;
                button.classList.toggle('is-active', active);
                button.setAttribute('aria-pressed', String(active));
            });

            if (titleNode) titleNode.textContent = raData.title;
            if (descNode) descNode.textContent = raData.desc;
            if (imageNode) {
                imageNode.src = raData.image;
                imageNode.alt = raData.alt;
            }
            renderRaPoints();

            if (raSection) {
                raSection.hidden = false;
                raSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            if (goHerbsButton) goHerbsButton.textContent = 'RA Bölümünü Gör';
        });
    }

    if (openDiseaseButton) {
        openDiseaseButton.addEventListener('click', () => {
            const raActive = raButton && raButton.classList.contains('is-active');
            if (raActive) {
                const raCard = document.querySelector('.romatoid-card-link-v198');
                if (raCard) raCard.click();
                return;
            }
            openAnkilozanFromPhyto();
        });
    }

    if (goHerbsButton) {
        goHerbsButton.addEventListener('click', () => {
            const raActive = raButton && raButton.classList.contains('is-active');
            if (raActive && raSection) {
                raSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
            openAnkilozanFromPhyto();
        });
    }
})();


// =========================================================
// V238 - C VİTAMİNİ "BİLGİ EDİN" ÖZEL SEKME / METİN İÇİ HASTALIK GEÇİŞLERİ
// =========================================================
(function () {
    const openDetailButton = document.getElementById('openVitaminCDetailV234');
    const closeDetailButton = document.getElementById('closeVitaminCDetailV235');
    const detailSection = document.getElementById('vitaminCDetailV234');
    const vascularView = detailSection?.closest('[data-treatment-detail-view="damar-yolu"]');
    const diseaseButtons = Array.from(document.querySelectorAll('[data-vitamin-c-disease-link]'));
    const asCardLink = document.querySelector('.ankilozan-card-link-v87');
    const raCardLink = document.querySelector('.romatoid-card-link-v198');

    if (!detailSection || !vascularView) {
        return;
    }

    function scrollViewTop() {
        const top = vascularView.getBoundingClientRect().top + window.scrollY - 12;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }

    function openVitaminCTab() {
        vascularView.classList.remove('ozone-tab-open-v239');
        vascularView.classList.remove('major-ozone-tab-open-v240');
        vascularView.classList.remove('glutathione-tab-open-v241');
        vascularView.classList.remove('nad-tab-open-v242');
        vascularView.classList.remove('karnitin-tab-open-v243');

        const ozoneSection = document.getElementById('ozoneDetailV239');
        const majorOzoneSection = document.getElementById('majorOzoneDetailV240');
        const glutathioneSection = document.getElementById('glutathioneDetailV241');
        const nadSection = document.getElementById('nadDetailV242');
        const karnitinSection = document.getElementById('karnitinDetailV243');

        if (ozoneSection) ozoneSection.setAttribute('aria-hidden', 'true');
        if (majorOzoneSection) majorOzoneSection.setAttribute('aria-hidden', 'true');
        if (glutathioneSection) glutathioneSection.setAttribute('aria-hidden', 'true');
        if (nadSection) nadSection.setAttribute('aria-hidden', 'true');

        vascularView.classList.add('vitamin-c-tab-open-v235');
        detailSection.setAttribute('aria-hidden', 'false');

        window.requestAnimationFrame(() => {
            scrollViewTop();
        });
    }

    function closeVitaminCTab(options = {}) {
        vascularView.classList.remove('vitamin-c-tab-open-v235');
        detailSection.setAttribute('aria-hidden', 'true');

        if (options.returnToCard !== false && openDetailButton) {
            window.requestAnimationFrame(() => {
                openDetailButton.closest('.serum-card-v71')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            });
        }
    }

    if (openDetailButton) {
        openDetailButton.addEventListener('click', openVitaminCTab);
    }

    if (closeDetailButton) {
        closeDetailButton.addEventListener('click', () => closeVitaminCTab());
    }

    diseaseButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const target = button.dataset.vitaminCDiseaseLink;
            const link = target === 'ra' ? raCardLink : asCardLink;
            if (!link) return;

            /* Hastalık sayfasına geçerken C vitamini alt sekmesini kapat. */
            closeVitaminCTab({ returnToCard: false });

            window.setTimeout(() => {
                link.click();
            }, 80);
        });
    });

    /* Escape ile özel sekmeden çıkış */
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && vascularView.classList.contains('vitamin-c-tab-open-v235')) {
            closeVitaminCTab();
        }
    });
})();



// =========================================================
// V239 - OZONLU SERUM "BİLGİ EDİN" ÖZEL SEKME
// =========================================================
(function () {
    const openDetailButton = document.getElementById('openOzoneDetailV239');
    const closeDetailButton = document.getElementById('closeOzoneDetailV239');
    const detailSection = document.getElementById('ozoneDetailV239');
    const vascularView = detailSection?.closest('[data-treatment-detail-view="damar-yolu"]');
    const diseaseButtons = Array.from(document.querySelectorAll('[data-ozone-disease-link]'));
    const asCardLink = document.querySelector('.ankilozan-card-link-v87');
    const raCardLink = document.querySelector('.romatoid-card-link-v198');

    if (!detailSection || !vascularView) {
        return;
    }

    function scrollViewTop() {
        const top = vascularView.getBoundingClientRect().top + window.scrollY - 12;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }

    function closeOtherSpecialTabs() {
        vascularView.classList.remove('vitamin-c-tab-open-v235');
        vascularView.classList.remove('major-ozone-tab-open-v240');
        vascularView.classList.remove('glutathione-tab-open-v241');
        vascularView.classList.remove('nad-tab-open-v242');
        vascularView.classList.remove('karnitin-tab-open-v243');

        const vitaminSection = document.getElementById('vitaminCDetailV234');
        const majorOzoneSection = document.getElementById('majorOzoneDetailV240');
        const glutathioneSection = document.getElementById('glutathioneDetailV241');
        const nadSection = document.getElementById('nadDetailV242');
        const karnitinSection = document.getElementById('karnitinDetailV243');

        if (vitaminSection) {
            vitaminSection.setAttribute('aria-hidden', 'true');
        }

        if (majorOzoneSection) {
            majorOzoneSection.setAttribute('aria-hidden', 'true');
        }

        if (glutathioneSection) {
            glutathioneSection.setAttribute('aria-hidden', 'true');
        }

        if (nadSection) {
            nadSection.setAttribute('aria-hidden', 'true');
        }

        if (karnitinSection) {
            karnitinSection.setAttribute('aria-hidden', 'true');
        }
    }

    function openOzoneTab() {
        closeOtherSpecialTabs();
        vascularView.classList.add('ozone-tab-open-v239');
        detailSection.setAttribute('aria-hidden', 'false');

        window.requestAnimationFrame(() => {
            scrollViewTop();
        });
    }

    function closeOzoneTab(options = {}) {
        vascularView.classList.remove('ozone-tab-open-v239');
        detailSection.setAttribute('aria-hidden', 'true');

        if (options.returnToCard !== false && openDetailButton) {
            window.requestAnimationFrame(() => {
                openDetailButton.closest('.serum-card-v71')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            });
        }
    }

    if (openDetailButton) {
        openDetailButton.addEventListener('click', openOzoneTab);
    }

    if (closeDetailButton) {
        closeDetailButton.addEventListener('click', () => closeOzoneTab());
    }

    diseaseButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const target = button.dataset.ozoneDiseaseLink;
            const link = target === 'ra' ? raCardLink : asCardLink;
            if (!link) return;

            closeOzoneTab({ returnToCard: false });

            window.setTimeout(() => {
                link.click();
            }, 80);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && vascularView.classList.contains('ozone-tab-open-v239')) {
            closeOzoneTab();
        }
    });
})();


// =========================================================
// V240 - MAJÖR OZON "BİLGİ EDİN" ÖZEL SEKME
// =========================================================
(function () {
    const openDetailButton = document.getElementById('openMajorOzoneDetailV240');
    const closeDetailButton = document.getElementById('closeMajorOzoneDetailV240');
    const detailSection = document.getElementById('majorOzoneDetailV240');
    const vascularView = detailSection?.closest('[data-treatment-detail-view="damar-yolu"]');
    const diseaseButtons = Array.from(document.querySelectorAll('[data-major-ozone-disease-link]'));
    const asCardLink = document.querySelector('.ankilozan-card-link-v87');
    const raCardLink = document.querySelector('.romatoid-card-link-v198');

    if (!detailSection || !vascularView) {
        return;
    }

    function scrollViewTop() {
        const top = vascularView.getBoundingClientRect().top + window.scrollY - 12;
        window.scrollTo({
            top: Math.max(0, top),
            behavior: 'smooth'
        });
    }

    function closeOtherSpecialTabs() {
        vascularView.classList.remove('vitamin-c-tab-open-v235');
        vascularView.classList.remove('ozone-tab-open-v239');
        vascularView.classList.remove('glutathione-tab-open-v241');
        vascularView.classList.remove('nad-tab-open-v242');
        vascularView.classList.remove('karnitin-tab-open-v243');

        const vitaminSection = document.getElementById('vitaminCDetailV234');
        const ozoneSection = document.getElementById('ozoneDetailV239');
        const glutathioneSection = document.getElementById('glutathioneDetailV241');
        const nadSection = document.getElementById('nadDetailV242');
        const karnitinSection = document.getElementById('karnitinDetailV243');

        if (vitaminSection) {
            vitaminSection.setAttribute('aria-hidden', 'true');
        }

        if (ozoneSection) {
            ozoneSection.setAttribute('aria-hidden', 'true');
        }

        if (glutathioneSection) {
            glutathioneSection.setAttribute('aria-hidden', 'true');
        }

        if (nadSection) {
            nadSection.setAttribute('aria-hidden', 'true');
        }

        if (karnitinSection) {
            karnitinSection.setAttribute('aria-hidden', 'true');
        }
    }

    function openMajorOzoneTab() {
        closeOtherSpecialTabs();
        vascularView.classList.add('major-ozone-tab-open-v240');
        detailSection.setAttribute('aria-hidden', 'false');

        window.requestAnimationFrame(() => {
            scrollViewTop();
        });
    }

    function closeMajorOzoneTab(options = {}) {
        vascularView.classList.remove('major-ozone-tab-open-v240');
        detailSection.setAttribute('aria-hidden', 'true');

        if (options.returnToCard !== false && openDetailButton) {
            window.requestAnimationFrame(() => {
                openDetailButton.closest('.serum-card-v71')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            });
        }
    }

    if (openDetailButton) {
        openDetailButton.addEventListener('click', openMajorOzoneTab);
    }

    if (closeDetailButton) {
        closeDetailButton.addEventListener('click', () => closeMajorOzoneTab());
    }

    diseaseButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const target = button.dataset.majorOzoneDiseaseLink;
            const link = target === 'ra' ? raCardLink : asCardLink;

            if (!link) return;

            closeMajorOzoneTab({ returnToCard: false });

            window.setTimeout(() => {
                link.click();
            }, 80);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (
            event.key === 'Escape' &&
            vascularView.classList.contains('major-ozone-tab-open-v240')
        ) {
            closeMajorOzoneTab();
        }
    });
})();


// =========================================================
// V241 - GLUTATYON "BİLGİ EDİN" ÖZEL SEKME
// =========================================================
(function () {
    const openDetailButton = document.getElementById('openGlutathioneDetailV241');
    const closeDetailButton = document.getElementById('closeGlutathioneDetailV241');
    const detailSection = document.getElementById('glutathioneDetailV241');
    const vascularView = detailSection?.closest('[data-treatment-detail-view="damar-yolu"]');
    const diseaseButtons = Array.from(document.querySelectorAll('[data-glutathione-disease-link]'));
    const asCardLink = document.querySelector('.ankilozan-card-link-v87');
    const raCardLink = document.querySelector('.romatoid-card-link-v198');

    if (!detailSection || !vascularView) {
        return;
    }

    function scrollViewTop() {
        const top = vascularView.getBoundingClientRect().top + window.scrollY - 12;

        window.scrollTo({
            top: Math.max(0, top),
            behavior: 'smooth'
        });
    }

    function closeOtherSpecialTabs() {
        vascularView.classList.remove('vitamin-c-tab-open-v235');
        vascularView.classList.remove('ozone-tab-open-v239');
        vascularView.classList.remove('major-ozone-tab-open-v240');
        vascularView.classList.remove('nad-tab-open-v242');
        vascularView.classList.remove('karnitin-tab-open-v243');

        const vitaminSection = document.getElementById('vitaminCDetailV234');
        const ozoneSection = document.getElementById('ozoneDetailV239');
        const majorOzoneSection = document.getElementById('majorOzoneDetailV240');
        const nadSection = document.getElementById('nadDetailV242');
        const karnitinSection = document.getElementById('karnitinDetailV243');

        if (vitaminSection) {
            vitaminSection.setAttribute('aria-hidden', 'true');
        }

        if (ozoneSection) {
            ozoneSection.setAttribute('aria-hidden', 'true');
        }

        if (majorOzoneSection) {
            majorOzoneSection.setAttribute('aria-hidden', 'true');
        }

        if (nadSection) {
            nadSection.setAttribute('aria-hidden', 'true');
        }

        if (karnitinSection) {
            karnitinSection.setAttribute('aria-hidden', 'true');
        }
    }

    function openGlutathioneTab() {
        closeOtherSpecialTabs();
        vascularView.classList.add('glutathione-tab-open-v241');
        detailSection.setAttribute('aria-hidden', 'false');

        window.requestAnimationFrame(() => {
            scrollViewTop();
        });
    }

    function closeGlutathioneTab(options = {}) {
        vascularView.classList.remove('glutathione-tab-open-v241');
        detailSection.setAttribute('aria-hidden', 'true');

        if (options.returnToCard !== false && openDetailButton) {
            window.requestAnimationFrame(() => {
                openDetailButton.closest('.serum-card-v71')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            });
        }
    }

    if (openDetailButton) {
        openDetailButton.addEventListener('click', openGlutathioneTab);
    }

    if (closeDetailButton) {
        closeDetailButton.addEventListener('click', () => closeGlutathioneTab());
    }

    diseaseButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const target = button.dataset.glutathioneDiseaseLink;
            const link = target === 'ra' ? raCardLink : asCardLink;

            if (!link) return;

            closeGlutathioneTab({ returnToCard: false });

            window.setTimeout(() => {
                link.click();
            }, 80);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (
            event.key === 'Escape' &&
            vascularView.classList.contains('glutathione-tab-open-v241')
        ) {
            closeGlutathioneTab();
        }
    });
})();



// =========================================================
// V242 - IV NAD+ "BİLGİ EDİN" ÖZEL SEKME
// =========================================================
(function () {
    const openDetailButton = document.getElementById('openNadDetailV242');
    const closeDetailButton = document.getElementById('closeNadDetailV242');
    const detailSection = document.getElementById('nadDetailV242');
    const vascularView = detailSection?.closest('[data-treatment-detail-view="damar-yolu"]');
    const diseaseButtons = Array.from(document.querySelectorAll('[data-nad-disease-link]'));
    const asCardLink = document.querySelector('.ankilozan-card-link-v87');
    const raCardLink = document.querySelector('.romatoid-card-link-v198');

    if (!detailSection || !vascularView) {
        return;
    }

    function scrollViewTop() {
        const top = vascularView.getBoundingClientRect().top + window.scrollY - 12;

        window.scrollTo({
            top: Math.max(0, top),
            behavior: 'smooth'
        });
    }

    function closeOtherSpecialTabs() {
        vascularView.classList.remove('vitamin-c-tab-open-v235');
        vascularView.classList.remove('ozone-tab-open-v239');
        vascularView.classList.remove('major-ozone-tab-open-v240');
        vascularView.classList.remove('glutathione-tab-open-v241');
        vascularView.classList.remove('karnitin-tab-open-v243');

        const vitaminSection = document.getElementById('vitaminCDetailV234');
        const ozoneSection = document.getElementById('ozoneDetailV239');
        const majorOzoneSection = document.getElementById('majorOzoneDetailV240');
        const glutathioneSection = document.getElementById('glutathioneDetailV241');
        const karnitinSection = document.getElementById('karnitinDetailV243');

        if (vitaminSection) {
            vitaminSection.setAttribute('aria-hidden', 'true');
        }

        if (ozoneSection) {
            ozoneSection.setAttribute('aria-hidden', 'true');
        }

        if (majorOzoneSection) {
            majorOzoneSection.setAttribute('aria-hidden', 'true');
        }

        if (glutathioneSection) {
            glutathioneSection.setAttribute('aria-hidden', 'true');
        }

        if (karnitinSection) {
            karnitinSection.setAttribute('aria-hidden', 'true');
        }
    }

    function openNadTab() {
        closeOtherSpecialTabs();
        vascularView.classList.add('nad-tab-open-v242');
        detailSection.setAttribute('aria-hidden', 'false');

        window.requestAnimationFrame(() => {
            scrollViewTop();
        });
    }

    function closeNadTab(options = {}) {
        vascularView.classList.remove('nad-tab-open-v242');
        detailSection.setAttribute('aria-hidden', 'true');

        if (options.returnToCard !== false && openDetailButton) {
            window.requestAnimationFrame(() => {
                openDetailButton.closest('.serum-card-v71')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            });
        }
    }

    if (openDetailButton) {
        openDetailButton.addEventListener('click', openNadTab);
    }

    if (closeDetailButton) {
        closeDetailButton.addEventListener('click', () => closeNadTab());
    }

    diseaseButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const target = button.dataset.nadDiseaseLink;
            const link = target === 'ra' ? raCardLink : asCardLink;

            if (!link) return;

            closeNadTab({ returnToCard: false });

            window.setTimeout(() => {
                link.click();
            }, 80);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (
            event.key === 'Escape' &&
            vascularView.classList.contains('nad-tab-open-v242')
        ) {
            closeNadTab();
        }
    });
})();



// =========================================================
// V243 - L-KARNİTİN "BİLGİ EDİN" ÖZEL SEKME
// =========================================================
(function () {
    const openDetailButton = document.getElementById('openKarnitinDetailV243');
    const closeDetailButton = document.getElementById('closeKarnitinDetailV243');
    const detailSection = document.getElementById('karnitinDetailV243');
    const vascularView = detailSection?.closest('[data-treatment-detail-view="damar-yolu"]');
    const diseaseButtons = Array.from(document.querySelectorAll('[data-karnitin-disease-link]'));
    const asCardLink = document.querySelector('.ankilozan-card-link-v87');
    const raCardLink = document.querySelector('.romatoid-card-link-v198');

    if (!detailSection || !vascularView) {
        return;
    }

    function scrollViewTop() {
        const top = vascularView.getBoundingClientRect().top + window.scrollY - 12;

        window.scrollTo({
            top: Math.max(0, top),
            behavior: 'smooth'
        });
    }

    function closeOtherSpecialTabs() {
        vascularView.classList.remove('vitamin-c-tab-open-v235');
        vascularView.classList.remove('ozone-tab-open-v239');
        vascularView.classList.remove('major-ozone-tab-open-v240');
        vascularView.classList.remove('glutathione-tab-open-v241');
        vascularView.classList.remove('nad-tab-open-v242');

        const vitaminSection = document.getElementById('vitaminCDetailV234');
        const ozoneSection = document.getElementById('ozoneDetailV239');
        const majorOzoneSection = document.getElementById('majorOzoneDetailV240');
        const glutathioneSection = document.getElementById('glutathioneDetailV241');
        const nadSection = document.getElementById('nadDetailV242');

        if (vitaminSection) {
            vitaminSection.setAttribute('aria-hidden', 'true');
        }

        if (ozoneSection) {
            ozoneSection.setAttribute('aria-hidden', 'true');
        }

        if (majorOzoneSection) {
            majorOzoneSection.setAttribute('aria-hidden', 'true');
        }

        if (glutathioneSection) {
            glutathioneSection.setAttribute('aria-hidden', 'true');
        }

        if (nadSection) {
            nadSection.setAttribute('aria-hidden', 'true');
        }
    }

    function openKarnitinTab() {
        closeOtherSpecialTabs();
        vascularView.classList.add('karnitin-tab-open-v243');
        detailSection.setAttribute('aria-hidden', 'false');

        window.requestAnimationFrame(() => {
            scrollViewTop();
        });
    }

    function closeKarnitinTab(options = {}) {
        vascularView.classList.remove('karnitin-tab-open-v243');
        detailSection.setAttribute('aria-hidden', 'true');

        if (options.returnToCard !== false && openDetailButton) {
            window.requestAnimationFrame(() => {
                openDetailButton.closest('.serum-card-v71')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            });
        }
    }

    if (openDetailButton) {
        openDetailButton.addEventListener('click', openKarnitinTab);
    }

    if (closeDetailButton) {
        closeDetailButton.addEventListener('click', () => closeKarnitinTab());
    }

    diseaseButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const target = button.dataset.karnitinDiseaseLink;
            const link = target === 'ra' ? raCardLink : asCardLink;

            if (!link) return;

            closeKarnitinTab({ returnToCard: false });

            window.setTimeout(() => {
                link.click();
            }, 80);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (
            event.key === 'Escape' &&
            vascularView.classList.contains('karnitin-tab-open-v243')
        ) {
            closeKarnitinTab();
        }
    });
})();



// =========================================================
// V244 - SELENYUM "BİLGİ EDİN" ÖZEL SEKME
// =========================================================
(function () {
    const openDetailButton = document.getElementById('openSeleniumDetailV244');
    const closeDetailButton = document.getElementById('closeSeleniumDetailV244');
    const detailSection = document.getElementById('seleniumDetailV244');
    const vascularView = detailSection?.closest('[data-treatment-detail-view="damar-yolu"]');
    const diseaseButtons = Array.from(document.querySelectorAll('[data-selenium-disease-link]'));
    const asCardLink = document.querySelector('.ankilozan-card-link-v87');
    const raCardLink = document.querySelector('.romatoid-card-link-v198');
    const foreignButtonsSelector = [
        '#openVitaminCDetailV234',
        '#openOzoneDetailV239',
        '#openMajorOzoneDetailV240',
        '#openGlutathioneDetailV241',
        '#openNadDetailV242',
        '#openKarnitinDetailV243',
        '#closeVitaminCDetailV234',
        '#closeOzoneDetailV239',
        '#closeMajorOzoneDetailV240',
        '#closeGlutathioneDetailV241',
        '#closeNadDetailV242',
        '#closeKarnitinDetailV243'
    ].join(',');

    if (!detailSection || !vascularView) {
        return;
    }

    function scrollViewTop() {
        const top = vascularView.getBoundingClientRect().top + window.scrollY - 12;

        window.scrollTo({
            top: Math.max(0, top),
            behavior: 'smooth'
        });
    }

    function closeOtherSpecialTabs() {
        vascularView.classList.remove('vitamin-c-tab-open-v235');
        vascularView.classList.remove('ozone-tab-open-v239');
        vascularView.classList.remove('major-ozone-tab-open-v240');
        vascularView.classList.remove('glutathione-tab-open-v241');
        vascularView.classList.remove('nad-tab-open-v242');
        vascularView.classList.remove('karnitin-tab-open-v243');

        const vitaminSection = document.getElementById('vitaminCDetailV234');
        const ozoneSection = document.getElementById('ozoneDetailV239');
        const majorOzoneSection = document.getElementById('majorOzoneDetailV240');
        const glutathioneSection = document.getElementById('glutathioneDetailV241');
        const nadSection = document.getElementById('nadDetailV242');
        const karnitinSection = document.getElementById('karnitinDetailV243');

        if (vitaminSection) vitaminSection.setAttribute('aria-hidden', 'true');
        if (ozoneSection) ozoneSection.setAttribute('aria-hidden', 'true');
        if (majorOzoneSection) majorOzoneSection.setAttribute('aria-hidden', 'true');
        if (glutathioneSection) glutathioneSection.setAttribute('aria-hidden', 'true');
        if (nadSection) nadSection.setAttribute('aria-hidden', 'true');
        if (karnitinSection) karnitinSection.setAttribute('aria-hidden', 'true');
    }

    function openSeleniumTab() {
        closeOtherSpecialTabs();
        vascularView.classList.add('selenium-tab-open-v244');
        detailSection.setAttribute('aria-hidden', 'false');

        window.requestAnimationFrame(() => {
            scrollViewTop();
        });
    }

    function closeSeleniumTab(options = {}) {
        vascularView.classList.remove('selenium-tab-open-v244');
        detailSection.setAttribute('aria-hidden', 'true');

        if (options.returnToCard !== false && openDetailButton) {
            window.requestAnimationFrame(() => {
                openDetailButton.closest('.serum-card-v71')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            });
        }
    }

    if (openDetailButton) {
        openDetailButton.addEventListener('click', openSeleniumTab);
    }

    if (closeDetailButton) {
        closeDetailButton.addEventListener('click', () => closeSeleniumTab());
    }

    document.addEventListener('click', (event) => {
        const foreignButton = event.target.closest(foreignButtonsSelector);
        if (!foreignButton) return;

        vascularView.classList.remove('selenium-tab-open-v244');
        detailSection.setAttribute('aria-hidden', 'true');
    }, true);

    diseaseButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const target = button.dataset.seleniumDiseaseLink;
            const link = target === 'ra' ? raCardLink : asCardLink;

            if (!link) return;

            closeSeleniumTab({ returnToCard: false });

            window.setTimeout(() => {
                link.click();
            }, 80);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (
            event.key === 'Escape' &&
            vascularView.classList.contains('selenium-tab-open-v244')
        ) {
            closeSeleniumTab();
        }
    });
})();



// =========================================================
// V249 - TEDAVİ ALANLARI HASTALIKLARI = ANKİLOZAN SAYFA DÜZENİ
// AS ve RA mevcut özel sayfalarını korur; diğer 6 hastalık dinamik
// olarak aynı görsel dilde ayrı sayfa deneyimiyle açılır.
// =========================================================
(function () {
    const page = document.getElementById('conditionDiseasePageV246');
    if (!page) return;

    const title = document.getElementById('conditionTitleV249');
    const kicker = document.getElementById('conditionKickerV249');
    const summary = document.getElementById('conditionSummaryV249');
    const image = document.getElementById('conditionImageV249');
    const imageCaption = document.getElementById('conditionImageCaptionV249');
    const pills = document.getElementById('conditionPillsV249');
    const quickCause = document.getElementById('conditionQuickCauseV249');
    const quickSymptoms = document.getElementById('conditionQuickSymptomsV249');
    const quickDiagnosis = document.getElementById('conditionQuickDiagnosisV249');
    const quickTreatment = document.getElementById('conditionQuickTreatmentV249');

    const detailHub = document.getElementById('conditionDetailHubV249');
    const detailKicker = document.getElementById('conditionDetailKickerV249');
    const detailTitle = document.getElementById('conditionDetailTitleV249');
    const detailDesc = document.getElementById('conditionDetailDescV249');
    const detailGrid = document.getElementById('conditionDetailGridV249');
    const detailNote = document.getElementById('conditionDetailNoteV249');
    const topicButtons = Array.from(page.querySelectorAll('[data-condition-topic-v249]'));

    const faqTitle = document.getElementById('conditionFaqTitleV249');
    const faqList = document.getElementById('conditionFaqListV249');
    const herbKicker = document.getElementById('conditionHerbKickerV249');
    const herbTitle = document.getElementById('conditionHerbTitleV249');
    const herbGrid = document.getElementById('conditionHerbGridV249');
    const herbNote = document.getElementById('conditionHerbNoteV249');

    const homeBrand = document.getElementById('conditionHomeV249');
    const homeButton = document.getElementById('conditionNavHomeV249');
    const areasButton = document.getElementById('conditionAreasV249');
    const painButton = document.getElementById('conditionPainV249');
    const mediaButton = document.getElementById('conditionMediaV249');
    const infoButton = document.getElementById('conditionInfoV249');
    const healthMenu = document.getElementById('conditionHealthMenuV249');
    const healthButton = document.getElementById('conditionHealthButtonV249');
    const healthDropdown = document.getElementById('conditionHealthDropdownV249');

    const labels = {
        'neden': ['NEDEN OLUR?', 'Neden Olur?'],
        'belirtiler': ['BELİRTİLER', 'Belirtiler'],
        'nasil-gecer': ['NASIL HAFİFLER?', 'Nasıl Hafifler?'],
        'kimlerde': ['KİMLERDE GÖRÜLÜR?', 'Kimlerde Görülür?'],
        'tani': ['TANI SÜRECİ', 'Tanı Süreci'],
        'tedavi': ['TEDAVİ YAKLAŞIMI', 'Tedavi Yaklaşımı'],
        'egzersiz': ['EGZERSİZ & HAREKET', 'Egzersiz & Hareket'],
        'gunluk': ['GÜNLÜK YAŞAM', 'Günlük Yaşam']
    };

    const diseaseData = {
        'bas-agrisi-migren': {
            title: 'Baş Ağrısı ve Migren',
            kicker: 'BAŞ • BOYUN • SİNİR SİSTEMİ',
            image: './disease-bas-agrisi-migren-v77.png?v=150',
            alt: 'Baş ağrısı ve migreni temsil eden medikal görsel',
            caption: 'Baş • Boyun • Tetikleyiciler • Nörolojik Değerlendirme',
            summary: 'Baş ağrısı ve migren; ağrının tipi, süresi, tetikleyicileri, boyun-kas ilişkisi ve eşlik eden nörolojik belirtiler birlikte değerlendirilerek ele alınmalıdır.',
            pills: ['Tetikleyiciler', 'Boyun & Postür', 'Uyku & Stres', 'Nörolojik Belirtiler'],
            neden: [['Genetik yatkınlık','Migren ailelerde daha sık görülebilir; tek başına genetik bir hastalık değildir.'],['Sinir sistemi hassasiyeti','Ağrı işleme ve trigeminal sistemdeki hassasiyet ataklara katkıda bulunabilir.'],['Tetikleyiciler','Uyku düzensizliği, açlık, sıvı kaybı ve stres bazı kişilerde atağı başlatabilir.'],['Boyun-kas etkisi','Boyun ve omuz kuşağı gerginliği bazı baş ağrısı tiplerinde tabloya eşlik edebilir.']],
            belirtiler: [['Baş ağrısı','Tek veya iki taraflı, zonklayıcı ya da baskı tarzında ağrı görülebilir.'],['Bulantı','Migren atağında bulantı ve bazen kusma eşlik edebilir.'],['Işık-ses hassasiyeti','Işık, ses ve koku hassasiyeti sık görülen eşlikçi bulgulardandır.'],['Aura','Bazı kişilerde görsel, duysal veya konuşma ile ilgili geçici aura belirtileri olabilir.']],
            'nasil-gecer': [['Atak planı','Hekimin önerdiği atak tedavisini erken dönemde uygulamak önemlidir.'],['Uyku düzeni','Düzenli uyku ve öğün ritmi atak eşiğini olumlu etkileyebilir.'],['Tetikleyici takibi','Baş ağrısı günlüğü kişisel tetikleyicileri fark etmeye yardımcı olur.'],['Boyun rahatlığı','Uygun kişilerde boyun hareketliliği ve postür çalışmaları destekleyici olabilir.']],
            kimlerde: [['Aile öyküsü','Ailesinde migren bulunanlarda görülme olasılığı artabilir.'],['Hormonal dönemler','Bazı kişilerde hormonal değişimler atak sıklığını etkileyebilir.'],['Yoğun stres','Stres, uykusuzluk ve düzensiz yaşam ritmi atağı kolaylaştırabilir.'],['Duyusal hassasiyet','Işık, ses veya kokuya hassas kişilerde tetiklenme daha belirgin olabilir.']],
            tani: [['Ağrı öyküsü','Süre, sıklık, yer ve ağrının karakteri ayrıntılı sorgulanır.'],['Eşlik eden bulgular','Bulantı, aura ve nörolojik belirtiler değerlendirilir.'],['Muayene','Nörolojik muayene ve gerektiğinde boyun-kas sistemi değerlendirmesi yapılır.'],['Görüntüleme gerekliliği','Her baş ağrısında görüntüleme gerekmez; kırmızı bayrak varsa hekim karar verir.']],
            tedavi: [['Atak tedavisi','Atak sırasında kullanılan ilaçlar kişiye göre hekim tarafından planlanır.'],['Koruyucu yaklaşım','Sık veya ağır ataklarda koruyucu tedaviler değerlendirilebilir.'],['Yaşam düzeni','Uyku, sıvı, öğün ve stres yönetimi planın önemli parçasıdır.'],['Destekleyici yaklaşım','Boyun-postür, gevşeme ve egzersiz uygun hastalarda destekleyici olabilir.']],
            egzersiz: [['Düzenli aerobik hareket','Yürüyüş ve benzeri düzenli egzersizler genel sağlık ve stres yönetimini destekler.'],['Boyun mobilitesi','Ağrıyı tetiklemeyen kontrollü hareketler boyun gerginliğini azaltmaya yardımcı olabilir.'],['Aşırı yükten kaçınma','Atak döneminde yoğun egzersiz bazı kişilerde yakınmaları artırabilir.'],['Kademeli ilerleme','Egzersiz sıklığı ve şiddeti kişisel toleransa göre artırılmalıdır.']],
            gunluk: [['Baş ağrısı günlüğü','Atak zamanı, uyku, beslenme ve tetikleyicileri kaydetmek örüntüyü gösterir.'],['Düzenli öğün','Uzun açlık dönemlerinden kaçınmak bazı kişilerde faydalı olabilir.'],['Ekran ve ışık','Uzun ekran kullanımında mola vermek ve ışık düzenini ayarlamak yararlı olabilir.'],['Acil uyarılar','Ani ve yaşamın en şiddetli baş ağrısı gibi yeni belirtilerde acil değerlendirme gerekir.']],
            notes: {neden:'Migren tek bir nedene indirgenmez; biyolojik yatkınlık ve kişisel tetikleyiciler birlikte değerlendirilir.', belirtiler:'Yeni, ani veya alışılmadık şiddette baş ağrısı tıbbi değerlendirme gerektirir.', tani:'Tanı çoğunlukla klinik öykü ve muayeneye dayanır; tetkikler gerektiğinde kullanılır.'},
            herbs: [['Zencefil','phyto-zencefil-v131.jpg','Bulantı ve genel inflamatuar süreçler açısından araştırılmıştır; migren tedavisinin yerine geçmez.'],['Zerdeçal (Kurkumin)','phyto-zerdecal-v131.jpg','Antioksidan ve inflamasyon yolları açısından değerlendirilebilir; doğrudan migren kanıtı sınırlıdır.'],['Biberiye','phyto-biberiye-v131.jpg','Geleneksel kullanım alanı vardır; baş ağrısında klinik etkinlik kanıtı sınırlıdır.'],['Omega-3','phyto-omega3-v131.jpg','Genel antiinflamatuar beslenme düzeninin bir parçası olarak değerlendirilebilir.']],
            herbNote:'Migren bazı bitki ve gıdalardan etkilenebilir. Özellikle düzenli ilaç kullananlarda bitkisel ürünler hekim görüşü olmadan başlanmamalıdır.'
        },
        'bel-sirt-agrisi': {
            title:'Bel ve Sırt Ağrısı', kicker:'OMURGA • KAS • POSTÜR', image:'./disease-bel-sirt-agrisi-v77.png?v=150', alt:'Bel ve sırt ağrısını temsil eden omurga görseli', caption:'Omurga • Kas Dengesi • Hareket • Postür',
            summary:'Bel ve sırt ağrısı; kaslar, eklemler, diskler, postür, günlük yüklenme ve bazı sistemik nedenlerin birlikte değerlendirilmesini gerektiren çok nedenli bir yakınmadır.', pills:['Omurga','Kas Dengesi','Postür','Hareket'],
            neden:[['Kas ve yumuşak doku','Aşırı yüklenme, hareketsizlik veya kas dengesizlikleri ağrıya katkıda bulunabilir.'],['Disk ve eklem yapıları','Omurga diskleri ve faset eklemler bazı ağrı tiplerinde rol oynayabilir.'],['Postür ve ergonomi','Uzun oturma, tekrarlayan eğilme ve uygunsuz çalışma pozisyonları yakınmaları artırabilir.'],['Sistemik nedenler','Daha nadir olarak inflamatuar, enfeksiyöz veya diğer sistemik nedenler araştırılabilir.']],
            belirtiler:[['Bölgesel ağrı','Bel veya sırt bölgesinde lokal ağrı ve hassasiyet görülebilir.'],['Sertlik','Uzun oturma veya sabah saatlerinde sertlik hissi olabilir.'],['Yayılım','Bazı durumlarda ağrı kalçaya, bacağa veya gövdeye yayılabilir.'],['Nörolojik bulgular','Uyuşma, kuvvet kaybı veya idrar-dışkı kontrol sorunu varsa acil değerlendirme gerekir.']],
            'nasil-gecer':[['Hareketi sürdürmek','Uygun düzeyde hareket çoğu mekanik ağrıda uzun süreli yatak istirahatinden daha yararlıdır.'],['Ergonomi','Oturma, çalışma ve kaldırma tekniklerinin düzenlenmesi yükü azaltabilir.'],['Kademeli güçlendirme','Gövde, kalça ve sırt kaslarının kontrollü güçlendirilmesi destekleyici olabilir.'],['Tıbbi değerlendirme','Uzayan veya şiddetlenen ağrıda nedenin belirlenmesi gerekir.']],
            kimlerde:[['Masa başı çalışanlar','Uzun süre oturma ve düşük hareket düzeyi riski artırabilir.'],['Fiziksel yükü yüksek işler','Tekrarlayan kaldırma ve dönme hareketleri yakınmaları artırabilir.'],['Hareketsizlik','Düşük kas dayanıklılığı ve esneklik ağrı riskine katkı sağlayabilir.'],['Önceki yaralanmalar','Geçmiş bel-sırt yaralanmaları bazı kişilerde tekrar eden yakınmalarla ilişkili olabilir.']],
            tani:[['Öykü','Ağrının başlangıcı, süresi ve hareketle ilişkisi sorgulanır.'],['Fizik muayene','Omurga hareketi, kas kuvveti, refleksler ve sinir germe testleri değerlendirilebilir.'],['Kırmızı bayraklar','Travma, ateş, kilo kaybı veya nörolojik kayıp gibi bulgular araştırılır.'],['Görüntüleme','Her bel ağrısında gerekli değildir; klinik gerekliliğe göre planlanır.']],
            tedavi:[['Aktif yaklaşım','Hareket, egzersiz ve günlük aktivitenin korunması çoğu durumda temel yaklaşımdır.'],['Ağrı yönetimi','İlaç ve diğer tıbbi yöntemler kişisel duruma göre hekimce planlanır.'],['Manuel/osteopatik destek','Uygun hastalarda hareket ve kas-iskelet sistemi planına destek olarak değerlendirilebilir.'],['Takip','Devam eden veya değişen belirtiler yeniden değerlendirilmelidir.']],
            egzersiz:[['Yürüyüş','Düşük-orta tempolu yürüyüş hareket toleransını artırabilir.'],['Gövde stabilizasyonu','Karın-bel-kalça kaslarını kontrollü güçlendirmek faydalı olabilir.'],['Mobilite','Kalça ve torakal omurga hareketliliği kişiye uygun şekilde çalışılabilir.'],['Ağrı sınırı','Keskin veya yayılan ağrıyı artıran hareketler zorlanmamalıdır.']],
            gunluk:[['Mola verin','Uzun oturmada düzenli aralıklarla pozisyon değiştirin.'],['Yükü yakın tutun','Kaldırırken yükü gövdeye yakın taşımak mekanik stresi azaltır.'],['Uyku pozisyonu','Kişiye rahat gelen nötr omurga pozisyonu tercih edilmelidir.'],['Belirti takibi','Yeni uyuşma, güç kaybı veya kontrol kaybında gecikmeden değerlendirme alınmalıdır.']],
            notes:{belirtiler:'Kuvvet kaybı, yaygın uyuşma veya idrar-dışkı kontrol sorunu acil değerlendirme gerektirir.', tani:'Görüntüleme kararı ağrının süresi, muayene ve kırmızı bayraklara göre verilir.'},
            herbs:[['Zerdeçal (Kurkumin)','phyto-zerdecal-v131.jpg','İnflamasyon yolları üzerindeki etkileri nedeniyle destekleyici beslenme kapsamında değerlendirilebilir.'],['Boswellia (Akgünlük)','phyto-boswellia-v131.jpg','Eklem ve yumuşak doku rahatlığı bağlamında araştırılmış bitkisel içeriklerden biridir.'],['Zencefil','phyto-zencefil-v131.jpg','Genel ağrı ve inflamasyon mekanizmaları açısından araştırılmaktadır.'],['Omega-3','phyto-omega3-v131.jpg','İnflamatuar yükü azaltmaya yönelik dengeli beslenme planının bir parçası olabilir.']], herbNote:'Bel ve sırt ağrısında bitkisel ürünler altta yatan nedeni ortadan kaldırmaz. Ağrının kaynağının değerlendirilmesi ve hareket planı önceliklidir.'
        },
        'fibromiyalji': {
            title:'Fibromiyalji', kicker:'YAYGIN AĞRI • UYKU • YORGUNLUK', image:'./disease-fibromiyalji-v77.png?v=150', alt:'Fibromiyaljide yaygın ağrı bölgelerini gösteren medikal görsel', caption:'Yaygın Ağrı • Uyku • Enerji • Günlük Yaşam',
            summary:'Fibromiyalji; yaygın ağrı, hassasiyet, uyku bozukluğu, yorgunluk ve bilişsel yakınmaların birlikte görülebildiği kronik bir ağrı sendromudur.', pills:['Yaygın Ağrı','Uyku','Yorgunluk','Hareket'],
            neden:[['Ağrı işleme hassasiyeti','Merkezi sinir sisteminin ağrıyı işleme biçimindeki hassasiyet önemli rol oynar.'],['Uyku bozukluğu','Dinlendirmeyen uyku ağrı ve yorgunluğu artırabilir.'],['Stres yanıtı','Yoğun stres belirtilerin alevlenmesiyle ilişkili olabilir.'],['Tek bir neden yok','Genetik, biyolojik ve çevresel faktörler birlikte etkili olabilir.']],
            belirtiler:[['Yaygın ağrı','Vücudun farklı bölgelerinde uzun süreli ağrı görülebilir.'],['Yorgunluk','Dinlenmeye rağmen devam eden enerji düşüklüğü sık görülür.'],['Uyku sorunu','Uyku süresi yeterli olsa bile dinlenmiş hissetmeme olabilir.'],['Bilişsel yakınmalar','Dikkat ve odaklanmada güçlük bazı kişilerde belirgin olabilir.']],
            'nasil-gecer':[['Kademeli egzersiz','Düzenli ve düşük-orta yoğunlukta hareket belirtileri yönetmeye yardımcı olabilir.'],['Uyku düzeni','Uyku ritmini düzeltmek temel yaklaşımlardan biridir.'],['Stres yönetimi','Gevşeme ve psikolojik destek bazı kişilerde yararlı olabilir.'],['Kişisel tedavi planı','İlaçlar ve destekleyici yöntemler kişiye göre planlanmalıdır.']],
            kimlerde:[['Kadınlarda daha sık','Fibromiyalji kadınlarda daha sık tanınmaktadır.'],['Uyku sorunu olanlar','Kronik uyku bozuklukları belirtilerle ilişkili olabilir.'],['Uzun süreli stres','Stresli dönemler yakınmaların şiddetini etkileyebilir.'],['Eşlik eden ağrı sendromları','Migren veya irritabl bağırsak gibi durumlar eşlik edebilir.']],
            tani:[['Klinik değerlendirme','Tanı öykü ve muayene temelinde konur.'],['Yaygın ağrı örüntüsü','Ağrının dağılımı ve süresi değerlendirilir.'],['Eşlik eden belirtiler','Uyku, yorgunluk ve bilişsel belirtiler sorgulanır.'],['Ayırıcı tanı','Benzer yakınma yapan tiroid, romatizmal veya diğer durumlar gerektiğinde dışlanır.']],
            tedavi:[['Eğitim','Hastalığın mekanizmasını anlamak tedavi uyumunu artırabilir.'],['Egzersiz','Düzenli aerobik ve güçlendirme programları önemli yer tutar.'],['Uyku ve stres','Uyku hijyeni ve stres yönetimi planın parçasıdır.'],['Medikal destek','Gerektiğinde ilaçlar hekim tarafından kişiye göre planlanabilir.']],
            egzersiz:[['Düşük tempolu başlangıç','Yürüyüş, bisiklet veya su egzersizleri düşük yoğunlukta başlanabilir.'],['Kademeli artış','Yoğunluk yavaş artırılmalıdır; aşırı yüklenme alevlenmeye yol açabilir.'],['Güçlendirme','Hafif direnç egzersizleri zamanla programa eklenebilir.'],['Esneme','Nazik esneme ve mobilite çalışmaları rahatlık sağlayabilir.']],
            gunluk:[['Enerji planlaması','Gün içindeki işleri enerji düzeyine göre bölmek yararlı olabilir.'],['Düzenli ritim','Uyku ve aktivite saatlerini olabildiğince düzenli tutmak önemlidir.'],['Aşırı yükten kaçının','İyi günlerde aşırı aktivite, sonraki günlerde alevlenmeyi artırabilir.'],['Belirti günlüğü','Uyku, aktivite ve ağrı ilişkisini takip etmek kişisel örüntüyü gösterir.']],
            notes:{tedavi:'Fibromiyaljide tek bir uygulama yerine düzenli ve çok bileşenli yaklaşım daha gerçekçidir.'},
            herbs:[['Zerdeçal (Kurkumin)','phyto-zerdecal-v131.jpg','İnflamatuar yollar açısından araştırılmaktadır; fibromiyalji için tek başına tedavi değildir.'],['Zencefil','phyto-zencefil-v131.jpg','Genel antioksidan ve inflamasyon süreçleri bağlamında destekleyici olarak değerlendirilebilir.'],['Omega-3','phyto-omega3-v131.jpg','Dengeli beslenme planının bir parçası olarak değerlendirilebilen yağ asidi kaynaklarındandır.'],['Biberiye','phyto-biberiye-v131.jpg','Antioksidan polifenoller içerir; fibromiyaljide doğrudan klinik kanıt sınırlıdır.']], herbNote:'Fibromiyaljide bitkisel ürünlerden mucizevi ve hızlı sonuç beklenmemelidir. Uyku, hareket ve kişiye uygun tıbbi plan temel yaklaşımdır.'
        },
        'huzursuz-bacak': {
            title:'Huzursuz Bacak Sendromu', kicker:'BACAKLAR • UYKU • SİNİR SİSTEMİ', image:'./disease-huzursuz-bacak-v77.png?v=150', alt:'Huzursuz bacak sendromunu temsil eden medikal görsel', caption:'Gece Yakınmaları • Uyku • Demir Durumu • Sinir Sistemi',
            summary:'Huzursuz Bacak Sendromu; özellikle dinlenme sırasında bacakları hareket ettirme ihtiyacı, rahatsız edici duyumlar ve uyku bozukluğu ile seyredebilir.', pills:['Gece Yakınmaları','Uyku','Demir Durumu','İlaçlar'],
            neden:[['Demir durumu','Düşük demir depoları bazı kişilerde belirtilerle ilişkili olabilir.'],['Sinir sistemi','Dopaminerjik sistem ve sinir sistemi mekanizmaları rol oynayabilir.'],['Gebelik','Gebelik döneminde geçici olarak daha sık görülebilir.'],['Eşlik eden durumlar','Böbrek hastalıkları ve bazı ilaçlar belirtileri etkileyebilir.']],
            belirtiler:[['Hareket ettirme isteği','Bacaklarda güçlü hareket ettirme ihtiyacı oluşabilir.'],['Dinlenmede artış','Yakınmalar oturma veya uzanma sırasında belirginleşir.'],['Hareketle rahatlama','Yürüme veya bacakları oynatma geçici rahatlama sağlayabilir.'],['Gece artışı','Belirtiler akşam ve gece saatlerinde daha belirgin olabilir.']],
            'nasil-gecer':[['Demir eksikliğini düzeltme','Eksiklik varsa hekim kontrolünde yerine koyma planlanabilir.'],['Kafein azaltma','Özellikle akşam saatlerinde kafein bazı kişilerde yakınmaları artırabilir.'],['Uyku düzeni','Düzenli uyku ve gevşeme rutini yararlı olabilir.'],['Tıbbi tedavi','Orta-ağır olgularda uygun ilaç seçenekleri hekim tarafından değerlendirilir.']],
            kimlerde:[['Aile öyküsü','Bazı kişilerde ailesel yatkınlık bulunabilir.'],['Gebeler','Özellikle gebeliğin ilerleyen dönemlerinde görülebilir.'],['Demir eksikliği olanlar','Düşük ferritin ile HBS arasında ilişki olabilir.'],['Bazı kronik hastalıklar','Böbrek hastalığı gibi durumlarda görülme sıklığı artabilir.']],
            tani:[['Klinik ölçütler','Tanı tipik belirtiler ve zamanlama örüntüsüne dayanır.'],['Demir değerlendirmesi','Ferritin ve demir durumu gerektiğinde incelenir.'],['İlaç gözden geçirme','Bazı ilaçlar belirtileri artırabileceği için kullanım listesi değerlendirilir.'],['Ayırıcı tanı','Kramp, nöropati ve dolaşım sorunları gibi durumlar ayrılır.']],
            tedavi:[['Nedeni düzeltme','Demir eksikliği veya tetikleyici ilaç gibi etkenler öncelikle ele alınır.'],['Uyku-hijyen planı','Akşam rutinleri ve kafein kullanımı düzenlenir.'],['İlaç tedavisi','Gerekli olgularda nörolojik ilaçlar hekim tarafından planlanabilir.'],['Takip','Belirti sıklığı ve uyku üzerindeki etkisi izlenir.']],
            egzersiz:[['Hafif yürüyüş','Akşam saatlerinde hafif yürüyüş bazı kişilerde rahatlatıcı olabilir.'],['Esneme','Baldır ve uyluk kaslarına nazik esneme uygulanabilir.'],['Aşırı egzersizden kaçınma','Geç saatte yoğun egzersiz bazı kişilerde belirtileri artırabilir.'],['Düzenlilik','Günlük hafif-orta hareket genel uyku düzenini destekleyebilir.']],
            gunluk:[['Kafein takibi','Kahve, çay ve enerji içeceklerinin etkisi gözlenebilir.'],['Akşam rutini','Ilık duş, hafif esneme ve düzenli saatler yararlı olabilir.'],['Uzun oturma','Uzun yolculuklarda düzenli hareket molaları vermek faydalıdır.'],['İlaç danışmanlığı','Belirtileri artırabilecek ilaçlar hekimle görüşülmeden kesilmemelidir.']],
            notes:{tani:'Huzursuz Bacak Sendromu tanısı çoğunlukla tipik klinik belirtilere dayanır; demir durumu sık değerlendirilir.'},
            herbs:[['Zencefil','phyto-zencefil-v131.jpg','Genel beslenme desteği olarak değerlendirilebilir; huzursuz bacak için doğrudan etkinlik kanıtı sınırlıdır.'],['Biberiye','phyto-biberiye-v131.jpg','Geleneksel kullanım alanı vardır; huzursuz bacak tedavisi olarak kabul edilmez.'],['Kekik','phyto-kekik-v131.jpg','Antioksidan bileşenler içerir; HBS için doğrudan klinik kanıt bulunmamaktadır.'],['Civanperçemi','phyto-civanpercemi-v131.jpg','Geleneksel kullanım geçmişi vardır; huzursuz bacak için kanıt sınırlıdır ve ilaç etkileşimleri dikkate alınmalıdır.']], herbNote:'Huzursuz Bacak Sendromunda bitkisel ürünlerin doğrudan etkinliğine ilişkin kanıt sınırlıdır. Demir eksikliği ve diğer nedenlerin araştırılması önceliklidir.'
        },
        'iltihabi-bagirsak': {
            title:'İltihabi Bağırsak Hastalıkları', kicker:'BAĞIRSAK • ENFLAMASYON • BESLENME', image:'./disease-iltihabi-bagirsak-v77.png?v=150', alt:'İltihabi bağırsak hastalıklarını temsil eden medikal görsel', caption:'Bağırsak • Beslenme • Enflamasyon • Takip',
            summary:'İltihabi bağırsak hastalıkları, bağırsak duvarında kronik iltihapla seyreden ve gastroenteroloji takibi gerektiren hastalık grubudur; beslenme ve destekler tedavinin yerine geçmez.', pills:['Bağırsak','Beslenme','Alevlenme','Gastroenteroloji'],
            neden:[['Genetik yatkınlık','Aile öyküsü ve genetik faktörler hastalık riskine katkı sağlayabilir.'],['Bağışıklık yanıtı','Bağırsak dokusunda uygunsuz veya aşırı bağışıklık yanıtı rol oynar.'],['Mikrobiyota','Bağırsak mikrobiyotasındaki değişiklikler araştırılan mekanizmalardandır.'],['Çevresel etkenler','Sigara, yaşam tarzı ve çevresel faktörlerin etkisi hastalık tipine göre değişebilir.']],
            belirtiler:[['İshal','Uzun süren veya tekrarlayan ishal görülebilir.'],['Karın ağrısı','Karın ağrısı ve kramp sık yakınmalardandır.'],['Kanama','Dışkıda kan özellikle ülseratif kolitte görülebilir ve değerlendirme gerektirir.'],['Kilo-yorgunluk','Kilo kaybı, iştahsızlık ve yorgunluk eşlik edebilir.']],
            'nasil-gecer':[['Hastalık kontrolü','Temel amaç bağırsak inflamasyonunu medikal tedaviyle kontrol etmektir.'],['Beslenme desteği','Alevlenme ve sakin döneme göre kişiselleştirilmiş beslenme planlanabilir.'],['Eksiklikleri düzeltme','Demir, B12, D vitamini gibi eksiklikler gerektiğinde değerlendirilir.'],['Düzenli takip','Semptomlar, laboratuvarlar ve gerekirse endoskopi ile hastalık aktivitesi izlenir.']],
            kimlerde:[['Aile öyküsü olanlar','Birinci derece yakınlarda İBH bulunması riski artırabilir.'],['Genç erişkinler','Hastalık sıklıkla genç erişkinlik döneminde başlayabilir.'],['Sigara etkisi','Sigaranın Crohn ve ülseratif kolit üzerindeki etkisi farklıdır; genel olarak bırakılması önerilir.'],['Bağışıklık ilişkili durumlar','Bazı eklem, göz ve cilt bulguları İBH ile birlikte görülebilir.']],
            tani:[['Öykü ve muayene','Belirti süresi, kanama, kilo kaybı ve sistemik bulgular değerlendirilir.'],['Laboratuvar','Kan ve dışkı testleri inflamasyon ve anemi açısından kullanılabilir.'],['Endoskopi','Kolonoskopi ve biyopsi tanıda önemli rol oynar.'],['Görüntüleme','Crohn hastalığında ince bağırsak değerlendirmesi için görüntüleme gerekebilir.']],
            tedavi:[['Gastroenteroloji takibi','Tedavi hastalık tipi, yeri ve aktivitesine göre uzman tarafından planlanır.'],['İlaç tedavisi','Anti-inflamatuar, immün düzenleyici ve biyolojik tedaviler kullanılabilir.'],['Beslenme','Beslenme destekleyicidir; tek başına medikal tedavinin yerine geçmez.'],['Cerrahi','Bazı komplikasyonlarda veya seçilmiş olgularda cerrahi gerekebilir.']],
            egzersiz:[['Hafif-orta hareket','Sakin dönemde yürüyüş ve benzeri aktiviteler genel sağlığı destekler.'],['Alevlenmede uyarlama','Aktif alevlenmede yoğunluk semptomlara göre azaltılmalıdır.'],['Kemik sağlığı','Direnç egzersizleri uygun kişilerde kemik ve kas sağlığını destekleyebilir.'],['Sıvı dengesi','İshal dönemlerinde sıvı-elektrolit kaybına dikkat edilmelidir.']],
            gunluk:[['Semptom takibi','Dışkılama sıklığı, ağrı ve kanama değişimleri izlenmelidir.'],['Besin toleransı','Kişisel tetikleyiciler değişebilir; gereksiz geniş eliminasyon diyetlerinden kaçınılmalıdır.'],['İlaç uyumu','İlaçlar hekim önerisi olmadan kesilmemelidir.'],['Acil uyarılar','Şiddetli karın ağrısı, yüksek ateş veya yoğun kanamada hızlı değerlendirme gerekir.']],
            notes:{tedavi:'Bitkisel ve beslenme destekleri gastroenteroloji tedavisinin yerine geçmez.', gunluk:'Alevlenme döneminde yeni takviye veya bitkisel ürün başlamadan önce hekim görüşü alınmalıdır.'},
            herbs:[['Zerdeçal (Kurkumin)','phyto-zerdecal-v131.jpg','İnflamatuar bağırsak süreçlerinde araştırılmıştır; tedavinin yerine geçmez ve uygunluk hekimce değerlendirilmelidir.'],['Zencefil','phyto-zencefil-v131.jpg','Sindirim sistemi yakınmaları açısından geleneksel kullanımı vardır; aktif hastalıkta tolerans kişiden kişiye değişebilir.'],['Boswellia (Akgünlük)','phyto-boswellia-v131.jpg','İnflamatuar yollar açısından araştırılmıştır; klinik kanıt ve ürün standardizasyonu sınırlıdır.'],['Omega-3','phyto-omega3-v131.jpg','Genel antiinflamatuar beslenme kapsamında değerlendirilebilir; sonuçlar hastalık ve kişiye göre değişebilir.']], herbNote:'İltihabi bağırsak hastalıklarında bitkisel ürünler alevlenme döneminde uygun olmayabilir. Gastroenteroloji tedavisini değiştirmeden önce mutlaka hekime danışılmalıdır.'
        },
        'kronik-yorgunluk': {
            title:'Kronik Yorgunluk', kicker:'ENERJİ • UYKU • METABOLİK DENGE', image:'./disease-kronik-yorgunluk-v77.png?v=150', alt:'Kronik yorgunluğu temsil eden medikal görsel', caption:'Enerji • Uyku • Beslenme • Sistemik Değerlendirme',
            summary:'Uzun süren yorgunluk tek başına bir tanı değildir; uyku, beslenme, anemi, tiroid, enfeksiyonlar, ilaçlar, psikolojik yük ve diğer tıbbi nedenler birlikte değerlendirilmelidir.', pills:['Enerji','Uyku','Tiroid','Beslenme'],
            neden:[['Uyku bozuklukları','Yetersiz veya kalitesiz uyku uzun süreli yorgunluğun sık nedenlerindendir.'],['Anemi ve eksiklikler','Demir, B12 veya diğer besin eksiklikleri enerji düzeyini etkileyebilir.'],['Tiroid ve metabolizma','Tiroid ve bazı metabolik bozukluklar yorgunluğa yol açabilir.'],['Enfeksiyon ve stres','Enfeksiyon sonrası dönem, yoğun stres veya bazı ilaçlar tabloya katkı sağlayabilir.']],
            belirtiler:[['Enerji düşüklüğü','Dinlenmeyle tam düzelmeyen günlük enerji kaybı olabilir.'],['Düşük efor toleransı','Daha önce kolay olan aktiviteler zorlayıcı hale gelebilir.'],['Odaklanma güçlüğü','Dikkat ve zihinsel dayanıklılıkta azalma görülebilir.'],['Uyku düzensizliği','Aşırı uyuma veya dinlendirmeyen uyku eşlik edebilir.']],
            'nasil-gecer':[['Nedeni bulmak','Öncelik altta yatan tıbbi veya yaşam tarzı nedenini belirlemektir.'],['Uyku düzeni','Düzenli uyku ve ışık-maruziyet ritmi önemlidir.'],['Beslenme','Yeterli protein, enerji ve mikrobesin alımı desteklenmelidir.'],['Kademeli aktivite','Nedene ve toleransa göre hareket kademeli planlanmalıdır.']],
            kimlerde:[['Yoğun stres yaşayanlar','Uzun süreli fiziksel veya psikolojik yük enerji düzeyini etkileyebilir.'],['Uyku sorunu olanlar','Uyku apnesi ve diğer uyku bozuklukları önemli nedenler olabilir.'],['Eksiklik riski olanlar','Yetersiz beslenme veya kan kaybı gibi durumlarda yorgunluk gelişebilir.'],['Kronik hastalığı olanlar','Enfeksiyon, endokrin veya inflamatuar hastalıklar yorgunlukla seyredebilir.']],
            tani:[['Ayrıntılı öykü','Süre, uyku, ilaçlar ve eşlik eden belirtiler sorgulanır.'],['Fizik muayene','Genel ve sistemik bulgular değerlendirilir.'],['Laboratuvar','Gerektiğinde kan sayımı, demir, tiroid ve diğer testler istenebilir.'],['Uyku değerlendirmesi','Horlama, gündüz uykululuğu ve uyku kalitesi özellikle sorgulanabilir.']],
            tedavi:[['Nedene yönelik plan','Tedavi, saptanan temel nedene göre değişir.'],['Uyku ve yaşam düzeni','Ritim, stres ve günlük yük planlanır.'],['Eksikliklerin düzeltilmesi','Kanıtlanmış eksiklikler uygun şekilde yerine konur.'],['Takip','Devam eden yorgunlukta yeni belirtiler ve işlev kaybı izlenir.']],
            egzersiz:[['Toleransa göre başlangıç','Hafif yürüyüş veya esneme düşük düzeyde başlanabilir.'],['Kademeli artış','Aktivite artışı kişisel toleransa göre yapılmalıdır.'],['Aşırı efordan kaçınma','Aktivite sonrası belirgin kötüleşme varsa program yeniden değerlendirilmelidir.'],['Düzenlilik','Kısa ve sürdürülebilir hareket periyotları çoğu kişi için daha uygulanabilirdir.']],
            gunluk:[['Enerji günlüğü','Uyku, beslenme ve enerji düzeyini takip etmek örüntüyü göstermeye yardımcı olur.'],['Görevleri bölmek','Büyük işleri küçük parçalara ayırmak enerji yönetimini kolaylaştırabilir.'],['Sıvı ve öğün düzeni','Düzenli sıvı ve öğün ritmi genel enerjiyi destekler.'],['Yeni belirtiler','Kilo kaybı, ateş veya belirgin nefes darlığı gibi bulgular varsa değerlendirme gerekir.']],
            notes:{neden:'Kronik yorgunluk tek bir hastalık adı değildir; farklı nedenlerin ortak belirtisi olabilir.', tedavi:'Serum veya takviye başlamadan önce altta yatan nedenin değerlendirilmesi önemlidir.'},
            herbs:[['Zencefil','phyto-zencefil-v131.jpg','Genel beslenme ve antioksidan destek kapsamında değerlendirilebilir; kronik yorgunluğun nedenini tedavi etmez.'],['Biberiye','phyto-biberiye-v131.jpg','Geleneksel olarak zindelik amacıyla kullanılır; klinik kanıt sınırlıdır.'],['Yeşil Çay (EGCG)','phyto-yesil-cay-v131.jpg','Polifenol içerir; kafein hassasiyeti ve uyku sorunları olanlarda dikkatli kullanılmalıdır.'],['Omega-3','phyto-omega3-v131.jpg','Dengeli beslenme planında değerlendirilebilir; doğrudan kronik yorgunluk tedavisi değildir.']], herbNote:'Uzun süren yorgunlukta bitkisel veya serum desteklerinden önce altta yatan tıbbi nedenlerin araştırılması önemlidir.'
        }
    };

    const diseaseKeys = new Set(Object.keys(diseaseData));
    let activeDisease = null;
    let activeTopic = 'neden';

    window.conditionDiseaseDataV279 = diseaseData;
    window.getConditionDiseaseStateV279 = function () {
        return {
            key: activeDisease,
            topic: activeTopic,
            title: title?.textContent || '',
            summary: summary?.textContent || ''
        };
    };

    function hideKnownPages() {
        document.body.classList.remove(
            'treatment-page-open','treatment-nav-scrolled','pain-page-open','pain-nav-scrolled',
            'media-page-open','media-nav-scrolled','about-page-open','about-nav-scrolled',
            'legal-page-open-v56','treatment-detail-open-v71','treatment-detail-nav-scrolled-v71',
            'general-health-detail-open-v75','ankilozan-page-open-v87','romatoid-page-open-v198',
            'info-guide-page-open-v143','device-detail-page-open-v157','general-featured-open-v124'
        );
        ['tedaviAlanlariPage','agriPage','medyaPage','hakkimdaPage','legalPageV56','treatmentDetailPageV71','generalHealthDetailPageV75','ankilozanFaqSectionV85','romatoidFaqSectionV198','infoGuidePageV143','deviceDetailPageV157','generalFeaturedPageV124'].forEach(id => {
            document.getElementById(id)?.setAttribute('aria-hidden','true');
        });
    }

    function topicIntro(data, topic) {
        const common = {
            neden: `${data.title} tek bir etkene indirgenmeden; biyolojik, mekanik ve yaşam tarzı faktörleri birlikte değerlendirilir.`,
            belirtiler: `${data.title} farklı kişilerde farklı belirti örüntüleri oluşturabilir. Süre, şiddet ve günlük yaşama etkisi birlikte ele alınır.`,
            'nasil-gecer': `Yakınmaları hafifletmek için tek bir uygulama yerine, nedeni ve kişisel tetikleyicileri hedefleyen çok bileşenli yaklaşım tercih edilir.`,
            kimlerde: `${data.title} için risk veya eşlik eden faktörler kişiden kişiye değişir; tek bir özellik hastalık gelişeceği anlamına gelmez.`,
            tani: `Tanı ve değerlendirme; öykü, fizik muayene ve gerekli görülen testlerin birlikte yorumlanmasına dayanır.`,
            tedavi: `Tedavi planı belirtilerin şiddeti, eşlik eden hastalıklar ve kişinin günlük işlevine göre kişiselleştirilir.`,
            egzersiz: `Hareket ve egzersiz programı hastalığın dönemine, toleransa ve kişinin mevcut kapasitesine göre kademeli planlanmalıdır.`,
            gunluk: `Günlük yaşam alışkanlıkları belirtilerin kontrolünde ve genel iyilik halinde önemli rol oynayabilir.`
        };
        return common[topic] || data.summary;
    }

    function topicNote(data, topic) {
        if (data.notes && data.notes[topic]) return data.notes[topic];
        const defaults = {
            neden:'Tek bir risk faktörü tek başına tanı koydurmaz.',
            belirtiler:'Belirtilerin yeni, hızlı ilerleyen veya alışılmadık olması durumunda tıbbi değerlendirme gerekir.',
            'nasil-gecer':'Destekleyici yöntemler, gerektiğinde temel tıbbi tedavinin yerine değil yanında değerlendirilmelidir.',
            kimlerde:'Risk faktörü bulunması hastalığın mutlaka gelişeceği anlamına gelmez.',
            tani:'Tanı kararı tek bir test sonucuna göre verilmemelidir.',
            tedavi:'Tedavi seçenekleri kişisel riskler ve ilaç etkileşimleri dikkate alınarak hekim tarafından planlanmalıdır.',
            egzersiz:'Egzersiz sırasında yeni nörolojik belirti, göğüs ağrısı veya belirgin kötüleşme olursa program durdurulup değerlendirme alınmalıdır.',
            gunluk:'Yeni veya hızla kötüleşen belirtilerde destek yöntemleriyle oyalanmadan tıbbi değerlendirme alınmalıdır.'
        };
        return defaults[topic];
    }

    function renderTopic(topic, scroll = false) {
        if (!activeDisease) return;
        const data = diseaseData[activeDisease];
        const items = data[topic] || data.neden;
        activeTopic = topic;
        const label = labels[topic] || labels.neden;

        detailKicker.textContent = label[0];
        detailTitle.textContent = `${data.title}: ${label[1]}`;
        detailDesc.textContent = topicIntro(data, topic);
        detailGrid.innerHTML = items.map(([heading,text]) => `<div class="ankilozan-detail-mini-v196"><strong>${heading}</strong><p>${text}</p></div>`).join('');
        detailNote.innerHTML = `<strong>Önemli:</strong> ${topicNote(data, topic)}`;
        detailNote.classList.toggle('is-warning', topic === 'tani' || topic === 'belirtiler');

        topicButtons.forEach(button => {
            const selected = button.dataset.conditionTopicV249 === topic;
            button.classList.toggle('is-active', selected);
            if (button.getAttribute('role') === 'tab') button.setAttribute('aria-selected', String(selected));
        });

        if (scroll) detailHub.scrollIntoView({behavior:'smooth', block:'start'});
    }

    window.renderConditionDiseaseTopicV279 = renderTopic;

    function buildFaq(data) {
        const faq = [
            [`${data.title} nedir?`, data.summary],
            [`${data.title} neden olur?`, topicIntro(data,'neden') + ' ' + data.neden.slice(0,2).map(item => item[1]).join(' ')],
            ['Belirtileri nelerdir?', data.belirtiler.map(item => item[1]).join(' ')],
            ['Tanı ve değerlendirme nasıl yapılır?', data.tani.map(item => item[1]).join(' ')],
            ['Günlük yaşamda nelere dikkat edilir?', data.gunluk.slice(0,3).map(item => item[1]).join(' ')]
        ];
        faqList.innerHTML = faq.map(([q,a],i) => `<article class="ankilozan-faq-item-v85${i===0?' is-open':''}"><button type="button" class="ankilozan-faq-question-v85" aria-expanded="${i===0?'true':'false'}"><span>${q}</span><span class="ankilozan-faq-plus-v85">+</span></button><div class="ankilozan-faq-answer-v85"${i===0?'':' hidden'}><p>${a}</p></div></article>`).join('');
    }

    function renderDisease(key) {
        const data = diseaseData[key];
        if (!data) return false;
        activeDisease = key;
        page.dataset.activeDisease = key;

        title.textContent = data.title;
        kicker.textContent = data.kicker;
        summary.textContent = data.summary;
        image.src = data.image;
        image.alt = data.alt;
        imageCaption.textContent = data.caption;
        pills.innerHTML = data.pills.map(item => `<span>${item}</span>`).join('');

        quickCause.textContent = data.neden[0][0] + ' • ' + data.neden[1][0];
        quickSymptoms.textContent = data.belirtiler[0][0] + ' • ' + data.belirtiler[1][0];
        quickDiagnosis.textContent = data.tani[0][0] + ' • ' + data.tani[1][0];
        quickTreatment.textContent = data.tedavi[0][0] + ' • ' + data.tedavi[1][0];

        faqTitle.textContent = `${data.title} Hakkında Sık Sorulanlar`;
        buildFaq(data);

        herbKicker.textContent = `${data.title.toUpperCase()} • FİTOTERAPİ`;
        herbTitle.textContent = `${data.title} için Değerlendirilebilecek Bitkisel Destekler`;
        herbGrid.innerHTML = data.herbs.map(([name,img,text],i) => `<article class="phyto-herbal-card-v232"><img src="${img}" alt="${name} görseli" loading="lazy" decoding="async"><div><span>${String(i+1).padStart(2,'0')}</span><h3>${name}</h3><p>${text}</p></div></article>`).join('');
        herbNote.textContent = data.herbNote;

        renderTopic('neden', false);
        return true;
    }

    function openDisease(key, push = true) {
        if (!renderDisease(key)) return;
        hideKnownPages();
        document.body.classList.add('condition-disease-page-open-v246');
        page.setAttribute('aria-hidden','false');
        if (typeof window.updateDiseaseSwitcherV250 === 'function') window.updateDiseaseSwitcherV250(key);
        if (push) history.pushState({page:'condition-disease-v249', disease:key}, '', '#' + key);
        window.scrollTo({top:0, behavior:'smooth'});
    }

    function closeDisease() {
        document.body.classList.remove('condition-disease-page-open-v246');
        page.setAttribute('aria-hidden','true');
        healthMenu?.classList.remove('open');
        healthButton?.setAttribute('aria-expanded','false');
        healthDropdown?.setAttribute('aria-hidden','true');
    }

    window.openConditionDiseaseV246 = openDisease;
    window.openConditionDiseaseV249 = openDisease;

    document.querySelectorAll('.condition-card-link-v246').forEach(card => {
        card.addEventListener('click', event => {
            event.preventDefault();
            openDisease(card.dataset.disease, true);
        });
    });

    const phytoLinks = document.getElementById('phytoDiseaseLinksV246');
    if (phytoLinks) {
        phytoLinks.addEventListener('click', event => {
            const button = event.target.closest('[data-phyto-disease]');
            if (!button) return;
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            const key = button.dataset.phytoDisease;
            if (key === 'as') {
                if (typeof window.openAnkilozanPageV87 === 'function') window.openAnkilozanPageV87();
                else document.querySelector('.ankilozan-card-link-v87')?.click();
                return;
            }
            if (key === 'ra') {
                if (typeof window.openRomatoidPageV198 === 'function') window.openRomatoidPageV198(true);
                else document.querySelector('.romatoid-card-link-v198')?.click();
                return;
            }
            openDisease(key, true);
        }, true);
    }

    topicButtons.forEach(button => {
        button.addEventListener('click', () => renderTopic(button.dataset.conditionTopicV249, true));
    });

    faqList.addEventListener('click', event => {
        const question = event.target.closest('.ankilozan-faq-question-v85');
        if (!question) return;
        const item = question.closest('.ankilozan-faq-item-v85');
        const answer = item.querySelector('.ankilozan-faq-answer-v85');
        const willOpen = !item.classList.contains('is-open');
        faqList.querySelectorAll('.ankilozan-faq-item-v85').forEach(other => {
            other.classList.remove('is-open');
            other.querySelector('.ankilozan-faq-question-v85')?.setAttribute('aria-expanded','false');
            const otherAnswer = other.querySelector('.ankilozan-faq-answer-v85');
            if (otherAnswer) otherAnswer.hidden = true;
        });
        if (willOpen) {
            item.classList.add('is-open');
            question.setAttribute('aria-expanded','true');
            if (answer) answer.hidden = false;
        }
    });

    function goHome() {
        closeDisease();
        history.pushState({page:'home'}, '', location.pathname + location.search);
        window.scrollTo({top:0, behavior:'smooth'});
    }
    homeBrand?.addEventListener('click', goHome);
    homeButton?.addEventListener('click', goHome);

    areasButton?.addEventListener('click', () => {
        closeDisease();
        if (typeof openTreatmentPage === 'function') openTreatmentPage();
        else {
            document.body.classList.add('treatment-page-open');
            document.getElementById('tedaviAlanlariPage')?.setAttribute('aria-hidden','false');
            history.pushState({page:'tedavi-alanlari'}, '', '#tedavi-alanlari');
            window.scrollTo({top:0,behavior:'smooth'});
        }
    });

    painButton?.addEventListener('click', () => {
        closeDisease();
        document.body.classList.add('pain-page-open');
        document.getElementById('agriPage')?.setAttribute('aria-hidden','false');
        history.pushState({page:'agri'}, '', '#agri');
        window.scrollTo({top:0,behavior:'smooth'});
    });

    mediaButton?.addEventListener('click', () => {
        closeDisease();
        const media = document.getElementById('medyaPage');
        if (media) {
            document.body.classList.add('media-page-open');
            media.setAttribute('aria-hidden','false');
            history.pushState({page:'medya'}, '', '#medya');
            window.scrollTo({top:0,behavior:'smooth'});
        }
    });

    infoButton?.addEventListener('click', () => {
        closeDisease();
        const about = document.getElementById('hakkimdaPage');
        if (about) {
            document.body.classList.add('about-page-open');
            about.setAttribute('aria-hidden','false');
            history.pushState({page:'hakkimda'}, '', '#hakkimda');
            window.scrollTo({top:0,behavior:'smooth'});
        }
    });

    healthButton?.addEventListener('click', event => {
        event.stopPropagation();
        const open = healthMenu.classList.toggle('open');
        healthButton.setAttribute('aria-expanded', String(open));
        healthDropdown.setAttribute('aria-hidden', String(!open));
    });

    document.addEventListener('click', event => {
        if (healthMenu && !healthMenu.contains(event.target)) {
            healthMenu.classList.remove('open');
            healthButton?.setAttribute('aria-expanded','false');
            healthDropdown?.setAttribute('aria-hidden','true');
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && document.body.classList.contains('condition-disease-page-open-v246')) {
            areasButton?.click();
        }
    });

    const initialHash = location.hash.replace('#','');
    if (diseaseKeys.has(initialHash)) {
        window.setTimeout(() => openDisease(initialHash, false), 0);
    }
})();



// =========================================================
// V250 - TÜM TEDAVİ ALANI HASTALIKLARI ARASI HIZLI GEÇİŞ
// =========================================================
(function () {
    const dynamicKeys = new Set([
        'bas-agrisi-migren',
        'bel-sirt-agrisi',
        'fibromiyalji',
        'huzursuz-bacak',
        'iltihabi-bagirsak',
        'kronik-yorgunluk'
    ]);

    function updateActive(key) {
        document.querySelectorAll('[data-disease-switch-v250]').forEach((button) => {
            const active = button.dataset.diseaseSwitchV250 === key;
            button.classList.toggle('is-active', active);
            if (active) button.setAttribute('aria-current', 'page');
            else button.removeAttribute('aria-current');
        });
    }

    window.updateDiseaseSwitcherV250 = updateActive;

    function closeDiseasePagesBeforeSwitch() {
        document.body.classList.remove(
            'ankilozan-page-open-v87',
            'romatoid-page-open-v198',
            'condition-disease-page-open-v246'
        );

        document.getElementById('ankilozanFaqSectionV85')?.setAttribute('aria-hidden', 'true');
        document.getElementById('romatoidFaqSectionV198')?.setAttribute('aria-hidden', 'true');
        document.getElementById('conditionDiseasePageV246')?.setAttribute('aria-hidden', 'true');
    }

    function openTarget(key) {
        closeDiseasePagesBeforeSwitch();

        if (key === 'as') {
            if (typeof window.openAnkilozanPageV87 === 'function') {
                window.openAnkilozanPageV87();
            } else {
                document.querySelector('.ankilozan-card-link-v87')?.click();
            }
            return;
        }

        if (key === 'ra') {
            if (typeof window.openRomatoidPageV198 === 'function') {
                window.openRomatoidPageV198(true);
            } else {
                document.querySelector('.romatoid-card-link-v198')?.click();
            }
            return;
        }

        if (dynamicKeys.has(key) && typeof window.openConditionDiseaseV249 === 'function') {
            window.openConditionDiseaseV249(key, true);
        }
    }

    document.addEventListener('click', (event) => {
        const button = event.target.closest('[data-disease-switch-v250]');
        if (!button) return;

        event.preventDefault();
        const key = button.dataset.diseaseSwitchV250;
        if (!key || button.classList.contains('is-active')) return;

        updateActive(key);
        openTarget(key);
    });
})();

// =========================================================
// V261 - OSTEOPATİ BAĞIMSIZ ÖZEL SAYFA / SEKME SİSTEMİ
// İçerik artık Osteopati article'ının altında değildir.
// Tam ekran, bağımsız bir özel sayfa olarak açılır.
// =========================================================
(function () {
    const page = document.querySelector('.osteopathy-page-v95');
    const specialView = document.getElementById('osteoSpecialViewV259');
    if (!page || !specialView) return;

    const tabs = Array.from(specialView.querySelectorAll('[data-osteo-tab]'));
    const panels = Array.from(specialView.querySelectorAll('[data-osteo-panel]'));
    const heroLaunchers = Array.from(page.querySelectorAll('[data-osteo-tab-target]'));
    const backButton = document.getElementById('osteoSpecialBackV259');
    const tabNav = specialView.querySelector('.osteo-tabs-v258');

    const statusTitle = document.getElementById('osteoTabStatusTitleV258');
    const statusText = document.getElementById('osteoTabStatusTextV258');
    const specialTitle = document.getElementById('osteoSpecialTitleV259');
    const specialText = document.getElementById('osteoSpecialTextV259');
    const specialIndex = document.getElementById('osteoSpecialIndexV259');

    if (!tabs.length || !panels.length) return;

    const tabMeta = {
        manual: { title: 'Manuel Uygulamalar', text: 'Kayropraktik ve eklem hareketliliğine yönelik içerikler.', index: '01' },
        exercise: { title: 'Egzersiz & Hareket', text: 'Hareket kapasitesi ve kişiye uygun egzersiz başlıkları.', index: '02' },
        sports: { title: 'Spor Yaralanmaları', text: 'Spor yüklenmesi, hareket zinciri ve fonksiyon başlıkları.', index: '03' },
        pain: { title: 'Ağrı Rehberi', text: 'Ağrı bölgeleri ayrı bir içerik alanında incelenir.', index: '04' },
        faq: { title: 'Soru & Cevap', text: 'Osteopati hakkında sık sorulan sorular ve kısa yanıtlar.', index: '05' },
        articles: { title: 'Bilimsel Yayınlar', text: 'Akademik makaleler ve bilimsel kaynak arşivi.', index: '06' }
    };

    function activateTab(key, options = {}) {
        const targetTab = tabs.find(tab => tab.dataset.osteoTab === key);
        const targetPanel = panels.find(panel => panel.dataset.osteoPanel === key);
        if (!targetTab || !targetPanel) return;

        tabs.forEach(tab => {
            const active = tab === targetTab;
            tab.classList.toggle('is-active-v258', active);
            tab.classList.toggle('active', active);
            tab.setAttribute('aria-selected', active ? 'true' : 'false');
            tab.setAttribute('tabindex', active ? '0' : '-1');
        });

        panels.forEach(panel => {
            const active = panel === targetPanel;
            panel.classList.toggle('is-active-v258', active);
            panel.hidden = !active;
        });

        const meta = tabMeta[key];
        if (meta) {
            if (statusTitle) statusTitle.textContent = meta.title;
            if (statusText) statusText.textContent = meta.text;
            if (specialTitle) specialTitle.textContent = meta.title;
            if (specialText) specialText.textContent = meta.text;
            if (specialIndex) specialIndex.textContent = meta.index;
        }

        if (options.focus) targetTab.focus({ preventScroll: true });
        if (options.scrollToNav && tabNav) {
            specialView.scrollTo({
                top: Math.max(0, tabNav.offsetTop - 118),
                behavior: 'smooth'
            });
        }
    }

    function openSpecialView(key) {
        activateTab(key || 'manual');
        specialView.hidden = false;
        specialView.setAttribute('aria-hidden', 'false');
        page.classList.add('is-special-view-open-v259');
        document.body.classList.add('osteo-standalone-open-v260');
        specialView.scrollTop = 0;

        requestAnimationFrame(() => {
            const focusTarget = specialView.querySelector('.osteo-special-back-v259');
            if (focusTarget) focusTarget.focus({ preventScroll: true });
        });
    }

    function closeSpecialView(options = {}) {
        document.body.classList.remove('osteo-standalone-open-v260');
        page.classList.remove('is-special-view-open-v259');
        specialView.hidden = true;
        specialView.setAttribute('aria-hidden', 'true');

        if (options.returnFocus !== false) {
            const firstLauncher = page.querySelector('[data-osteo-tab-target="manual"]');
            if (firstLauncher) firstLauncher.focus({ preventScroll: true });
        }
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => activateTab(tab.dataset.osteoTab));
        tab.addEventListener('keydown', event => {
            if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
            event.preventDefault();
            let nextIndex = index;
            if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
            if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
            if (event.key === 'Home') nextIndex = 0;
            if (event.key === 'End') nextIndex = tabs.length - 1;
            activateTab(tabs[nextIndex].dataset.osteoTab, { focus: true });
        });
    });

    const launchIconMapV272 = {
        manual: '✦',
        exercise: '↗',
        sports: '◎',
        pain: '＋',
        faq: '?',
        articles: '≡'
    };

    let routeTransitionV272 = null;
    let routeTransitionBusyV272 = false;

    function ensureRouteTransitionV272() {
        if (routeTransitionV272) return routeTransitionV272;

        routeTransitionV272 = document.createElement('div');
        routeTransitionV272.className = 'osteo-route-transition-v272';
        routeTransitionV272.setAttribute('aria-hidden', 'true');
        routeTransitionV272.innerHTML = `
            <div class="osteo-route-card-v272">
                <div class="osteo-route-icon-v272" id="osteoRouteIconV272" aria-hidden="true">✦</div>
                <span class="osteo-route-kicker-v272">OSTEOPATİ • ÖZEL İÇERİK</span>
                <h3 class="osteo-route-title-v272" id="osteoRouteTitleV272">Manuel Uygulamalar</h3>
                <div class="osteo-route-line-v272" aria-hidden="true"></div>
            </div>
        `;
        document.body.appendChild(routeTransitionV272);
        return routeTransitionV272;
    }

    function animatedOpenSpecialViewV272(button) {
        if (routeTransitionBusyV272) return;

        const key = button.dataset.osteoTabTarget || 'manual';
        const meta = tabMeta[key] || tabMeta.manual;
        const reducedMotion = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reducedMotion) {
            openSpecialView(key);
            return;
        }

        routeTransitionBusyV272 = true;
        button.classList.add('is-launching-v272');

        const overlay = ensureRouteTransitionV272();
        const routeTitle = overlay.querySelector('#osteoRouteTitleV272');
        const routeIcon = overlay.querySelector('#osteoRouteIconV272');

        if (routeTitle) routeTitle.textContent = meta.title;
        if (routeIcon) routeIcon.textContent = launchIconMapV272[key] || '✦';

        overlay.classList.add('is-visible-v272');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('osteo-route-transition-open-v272');

        window.setTimeout(() => {
            openSpecialView(key);
            specialView.classList.add('is-entering-v272');

            requestAnimationFrame(() => {
                overlay.classList.remove('is-visible-v272');
                overlay.setAttribute('aria-hidden', 'true');
            });

            window.setTimeout(() => {
                specialView.classList.remove('is-entering-v272');
                button.classList.remove('is-launching-v272');
                document.body.classList.remove('osteo-route-transition-open-v272');
                routeTransitionBusyV272 = false;
            }, 560);
        }, 620);
    }

    heroLaunchers.forEach(button => {
        button.addEventListener('click', () => animatedOpenSpecialViewV272(button));
    });

    if (backButton) backButton.addEventListener('click', () => closeSpecialView());

    // ESC ile de bağımsız özel sayfadan Osteopati ana vitrininə dön.
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && document.body.classList.contains('osteo-standalone-open-v260')) {
            closeSpecialView();
        }
    });

    // Ana üst menüden başka bir sayfaya gidilirse özel ekran açık kalmasın.
    document.addEventListener('click', event => {
        if (!document.body.classList.contains('osteo-standalone-open-v260')) return;
        const navAway = event.target.closest('[data-treatment-top], [data-treatment-detail], #treatmentDetailHomeV71, #treatmentDetailAreasV71, #treatmentDetailPainV71, #treatmentDetailMediaV71');
        if (navAway && !navAway.closest('#osteoSpecialViewV259')) {
            closeSpecialView({ returnFocus: false });
        }
    }, true);

    activateTab('manual');
    specialView.hidden = true;
    specialView.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('osteo-standalone-open-v260');
    page.classList.remove('is-special-view-open-v259');
})();


// =========================================================
// V265 - OSTEOPATİ AĞRI REHBERİ KARTLARI -> DOĞRUDAN İLGİLİ AĞRI DETAYI
// Ağrı ana sayfasına uğramadan seçilen bölge açılır.
// =========================================================
(function () {
    const buttons = Array.from(document.querySelectorAll('[data-osteo-pain-target-v265]'));
    if (!buttons.length) return;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const key = button.dataset.osteoPainTargetV265;
            if (!key || typeof window.openPainFullDetailV215 !== 'function') return;

            // Osteopati özel ekranını kapat; Ağrı detay sayfası tek başına açılsın.
            const specialView = document.getElementById('osteoSpecialViewV259');
            const osteoPage = document.querySelector('.osteopathy-page-v95');
            if (specialView) {
                specialView.hidden = true;
                specialView.setAttribute('aria-hidden', 'true');
            }
            if (osteoPage) osteoPage.classList.remove('is-special-view-open-v259');
            document.body.classList.remove('osteo-standalone-open-v260');

            window.openPainFullDetailV215(key, null, true);
        });
    });
})();

// =========================================================
// V271 - OSTEOPATİ VİDEO YOUTUBE ONAY AKIŞI
// İlk tıkta sor, ikinci tıkta YouTube'a yönlendir.
// =========================================================
(function () {
    const modal = document.getElementById("osteoVideoConfirmV271");
    const backdrop = document.getElementById("osteoVideoConfirmBackdropV271");
    const closeButton = document.getElementById("osteoVideoConfirmCloseV271");
    const cancelButton = document.getElementById("osteoVideoConfirmCancelV271");
    const goButton = document.getElementById("osteoVideoConfirmGoV271");
    const title = document.getElementById("osteoVideoConfirmTitleV271");
    const text = document.getElementById("osteoVideoConfirmTextV271");

    let pendingYoutubeUrl = "";
    let lastFocusedElement = null;

    function closeVideoConfirmV271() {
        if (!modal) return;

        modal.classList.remove("is-open-v271");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("osteo-video-confirm-open-v271");

        pendingYoutubeUrl = "";

        if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
            lastFocusedElement.focus();
        }
    }

    function openVideoConfirmV271(videoId, triggerElement) {
        if (!modal || !videoId) return;

        const card = triggerElement.closest(".osteo-youtube-card-v267");
        const cardTitle = card?.querySelector(".osteo-video-body-v105 h3")?.textContent?.trim();

        pendingYoutubeUrl =
            "https://www.youtube.com/watch?v=" +
            encodeURIComponent(videoId);

        lastFocusedElement = triggerElement;

        if (title) {
            title.textContent = "Videoyu izlemek istiyor musunuz?";
        }

        if (text) {
            text.textContent = cardTitle
                ? `"${cardTitle}" YouTube üzerinde açılacaktır. Devam etmek istiyor musunuz?`
                : "Bu video YouTube üzerinde açılacaktır. Devam etmek istiyor musunuz?";
        }

        modal.classList.add("is-open-v271");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("osteo-video-confirm-open-v271");

        requestAnimationFrame(() => {
            goButton?.focus();
        });
    }

    document.addEventListener("click", function (event) {
        const trigger = event.target.closest(
            ".osteo-inline-video-v268, .osteo-video-inline-button-v268"
        );

        if (!trigger) return;

        const videoId = trigger.dataset.youtubeId;
        if (!videoId) return;

        event.preventDefault();
        openVideoConfirmV271(videoId, trigger);
    });

    document.addEventListener("keydown", function (event) {
        if (
            (event.key === "Enter" || event.key === " ") &&
            event.target.closest(".osteo-inline-video-v268")
        ) {
            const trigger = event.target.closest(".osteo-inline-video-v268");
            const videoId = trigger?.dataset.youtubeId;

            if (!videoId) return;

            event.preventDefault();
            openVideoConfirmV271(videoId, trigger);
            return;
        }

        if (
            event.key === "Escape" &&
            modal?.classList.contains("is-open-v271")
        ) {
            closeVideoConfirmV271();
        }
    });

    [backdrop, closeButton, cancelButton].forEach((element) => {
        element?.addEventListener("click", closeVideoConfirmV271);
    });

    goButton?.addEventListener("click", function () {
        if (!pendingYoutubeUrl) return;

        const youtubeUrl = pendingYoutubeUrl;
        closeVideoConfirmV271();

        window.open(
            youtubeUrl,
            "_blank",
            "noopener,noreferrer"
        );
    });
})();


// =========================================================
// V273 - TEDAVİ ALANLARI HASTALIK SAYFALARI DÜZENİ
// - Hastalık kartına girince hero alanına yumuşak geçiş
// - Hızlı geçiş bloğunu hero alanının altına taşı
// - SSS alanlarını başlıklar kapalı gelecek şekilde başlat
// =========================================================
(function () {
    function moveSectionAfter(pageSelector, moverSelector, anchorSelector) {
        const page = document.querySelector(pageSelector);
        if (!page) return;
        const mover = page.querySelector(moverSelector);
        const anchor = page.querySelector(anchorSelector);
        if (!mover || !anchor || mover.dataset.v273Moved === '1') return;
        anchor.insertAdjacentElement('afterend', mover);
        mover.dataset.v273Moved = '1';
    }

    function collapseFaqItems(root, itemSelector, buttonSelector, answerSelector) {
        if (!root) return;
        root.querySelectorAll(itemSelector).forEach((item) => {
            item.classList.remove('is-open');
            const button = item.querySelector(buttonSelector);
            if (button) button.setAttribute('aria-expanded', 'false');
            const answer = item.querySelector(answerSelector);
            if (answer && answer.hasAttribute('hidden') === false && answerSelector === '.ankilozan-faq-answer-v85') {
                answer.hidden = true;
            }
        });
    }

    function expandFaqAnswer(itemSelector, answerSelector) {
        document.querySelectorAll(itemSelector).forEach((item) => {
            const answer = item.querySelector(answerSelector);
            if (!answer) return;
            if (item.classList.contains('is-open')) answer.hidden = false;
            else answer.hidden = true;
        });
    }

    function initCollapsedFaqState() {
        collapseFaqItems(document.getElementById('ankilozanFaqSectionV85'), '.ankilozan-faq-item-v85', '.ankilozan-faq-question-v85', '.ankilozan-faq-answer-v85');
        collapseFaqItems(document.getElementById('conditionFaqListV249'), '.ankilozan-faq-item-v85', '.ankilozan-faq-question-v85', '.ankilozan-faq-answer-v85');
        collapseFaqItems(document.getElementById('romatoidFaqSectionV198'), '.ra-faq-item-v198', '.ra-faq-question-v198', '.ra-faq-answer-v198');
    }

    function syncGenericFaqHiddenState() {
        expandFaqAnswer('#ankilozanFaqSectionV85 .ankilozan-faq-item-v85, #conditionFaqListV249 .ankilozan-faq-item-v85', '.ankilozan-faq-answer-v85');
        document.querySelectorAll('#romatoidFaqSectionV198 .ra-faq-item-v198').forEach((item) => {
            const answer = item.querySelector('.ra-faq-answer-v198');
            if (!answer) return;
            answer.style.display = item.classList.contains('is-open') ? 'block' : 'none';
        });
    }

    function scrollToTarget(selector) {
        const target = document.querySelector(selector);
        if (!target) return;
        window.requestAnimationFrame(() => {
            window.setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 80);
        });
    }

    function initLayoutAdjustments() {
        moveSectionAfter('#ankilozanFaqSectionV85', '.disease-switcher-v250', '.ankilozan-overview-v195');
        moveSectionAfter('#romatoidFaqSectionV198', '.disease-switcher-v250', '.ra-hero-v198');
        moveSectionAfter('#conditionDiseasePageV246', '.disease-switcher-v250', '.condition-overview-poster-v249');
        initCollapsedFaqState();
        syncGenericFaqHiddenState();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLayoutAdjustments, { once: true });
    } else {
        initLayoutAdjustments();
    }

    if (typeof window.openAnkilozanPageV87 === 'function' && !window.openAnkilozanPageV87.__v273Wrapped) {
        const originalOpenAnkilozan = window.openAnkilozanPageV87;
        window.openAnkilozanPageV87 = function (options = {}) {
            const result = originalOpenAnkilozan({ ...options, skipScroll: true });
            syncGenericFaqHiddenState();
            scrollToTarget('#ankilozanFaqSectionV85 .ankilozan-overview-v195');
            return result;
        };
        window.openAnkilozanPageV87.__v273Wrapped = true;
    }

    if (typeof window.openRomatoidPageV198 === 'function' && !window.openRomatoidPageV198.__v273Wrapped) {
        const originalOpenRA = window.openRomatoidPageV198;
        window.openRomatoidPageV198 = function (push = true) {
            const result = originalOpenRA(push);
            syncGenericFaqHiddenState();
            scrollToTarget('#romatoidFaqSectionV198 .ra-hero-v198');
            return result;
        };
        window.openRomatoidPageV198.__v273Wrapped = true;
    }

    if (typeof window.openConditionDiseaseV249 === 'function' && !window.openConditionDiseaseV249.__v273Wrapped) {
        const originalOpenCondition = window.openConditionDiseaseV249;
        window.openConditionDiseaseV249 = function (key, push = true) {
            const result = originalOpenCondition(key, push);
            initCollapsedFaqState();
            syncGenericFaqHiddenState();
            scrollToTarget('#conditionDiseasePageV246 .condition-overview-poster-v249');
            return result;
        };
        window.openConditionDiseaseV249.__v273Wrapped = true;
        window.openConditionDiseaseV246 = window.openConditionDiseaseV249;
    }

    document.addEventListener('click', (event) => {
        const ankQuestion = event.target.closest('#ankilozanFaqSectionV85 .ankilozan-faq-question-v85, #conditionFaqListV249 .ankilozan-faq-question-v85');
        if (ankQuestion) {
            window.setTimeout(syncGenericFaqHiddenState, 0);
            return;
        }
        const raQuestion = event.target.closest('#romatoidFaqSectionV198 .ra-faq-question-v198');
        if (raQuestion) {
            window.setTimeout(syncGenericFaqHiddenState, 0);
        }
    });
})();


// =========================================================
// V274 - ANKİLOZAN SPONDİLİT BAĞIMSIZ ÖZEL SEKME SİSTEMİ
// Osteopati mantığı: ana vitrinden seç -> ayrı sayfa -> yalnız seçilen içerik.
// =========================================================
(function () {
    const mainPage = document.getElementById('ankilozanFaqSectionV85');
    const launcher = document.getElementById('asLauncherV274');
    const specialView = document.getElementById('asSpecialViewV274');
    const specialContent = document.getElementById('asSpecialContentV274');
    const specialTitle = document.getElementById('asSpecialTitleV274');
    const specialDesc = document.getElementById('asSpecialDescV274');
    const specialIndex = document.getElementById('asSpecialIndexV274');
    const backButton = document.getElementById('asSpecialBackV274');
    const tabButtons = Array.from(document.querySelectorAll('[data-as-special-tab-v274]'));
    const launchButtons = Array.from(document.querySelectorAll('[data-as-special-target-v274]'));

    if (!mainPage || !launcher || !specialView || !specialContent) return;

    const switcher = mainPage.querySelector('.disease-switcher-v250');
    const overview = mainPage.querySelector('.ankilozan-overview-v195');
    if (overview && launcher.previousElementSibling !== overview) {
        overview.insertAdjacentElement('afterend', launcher);
    }
    if (switcher) launcher.insertAdjacentElement('afterend', switcher);

    const meta = {
        overview: {
            index: '01',
            title: 'Hastalığı Tanıyın',
            desc: 'Nedenleri, belirtileri ve kimlerde görüldüğünü birlikte inceleyin.',
            kicker: 'GENEL BAKIŞ',
            heading: 'Ankilozan Spondiliti Tanıyın',
            intro: 'Hastalığın nedenleri, tipik belirtileri ve kimlerde daha sık görülebildiğine ilişkin mevcut içerikler.',
            topics: ['neden', 'belirtiler', 'kimlerde']
        },
        diagnosis: {
            index: '02',
            title: 'Tanı Süreci',
            desc: 'Öykü, muayene, görüntüleme ve laboratuvar değerlendirmelerini inceleyin.',
            kicker: 'TANI & DEĞERLENDİRME',
            heading: 'Tanı Süreci Nasıl İlerler?',
            intro: 'Tanıda tek bir test yerine öykü, fizik muayene, görüntüleme ve laboratuvar verileri birlikte değerlendirilir.',
            topics: ['tani']
        },
        treatment: {
            index: '03',
            title: 'Tedavi Yaklaşımı',
            desc: 'Yakınmaların hafifletilmesi ve kişiye özel tedavi yaklaşımını inceleyin.',
            kicker: 'TEDAVİ & TAKİP',
            heading: 'Tedavi Yaklaşımı',
            intro: 'Nasıl hafifleyebileceği ve tedavi planında değerlendirilebilecek başlıklar bu bölümde bir araya gelir.',
            topics: ['nasil-gecer', 'tedavi']
        },
        movement: {
            index: '04',
            title: 'Egzersiz & Günlük Yaşam',
            desc: 'Hareket, postür ve günlük yaşam düzenlemelerini tek yerde inceleyin.',
            kicker: 'HAREKET & YAŞAM',
            heading: 'Egzersiz ve Günlük Yaşam',
            intro: 'Omurga hareketliliğini, postürü ve günlük yaşam kalitesini desteklemeye yönelik mevcut içerikler.',
            topics: ['egzersiz', 'gunluk']
        },
        faq: {
            index: '05',
            title: 'Merak Edilen Sorular',
            desc: 'Sorular başlık halinde görünür; istediğiniz soruya basınca yanıt açılır.',
            kicker: 'SORU & CEVAP',
            heading: 'Ankilozan Spondilit Hakkında Merak Edilenler',
            intro: 'Sadece merak ettiğiniz soruya basın; yanıtı o başlığın altında açılsın.'
        },
        herbs: {
            index: '06',
            title: 'Bitkisel Destekler',
            desc: 'Fitoterapi başlıklarını ve güvenli kullanım notlarını inceleyin.',
            kicker: 'FİTOTERAPİ & DESTEK',
            heading: 'Değerlendirilebilecek Bitkisel Destekler',
            intro: 'Mevcut bitkisel destek içerikleri, ilaç etkileşimleri ve hekim kontrolü uyarılarıyla birlikte bu özel alanda gösterilir.'
        }
    };

    let activeKey = 'overview';

    function cleanClone(node) {
        if (!node) return null;
        const clone = node.cloneNode(true);
        clone.removeAttribute('id');
        clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
        clone.querySelectorAll('[aria-labelledby], [aria-controls]').forEach(el => {
            el.removeAttribute('aria-labelledby');
            el.removeAttribute('aria-controls');
        });
        return clone;
    }

    function makePanelHead(data) {
        const head = document.createElement('div');
        head.className = 'as-special-panel-head-v274';
        head.innerHTML = `<span>${data.kicker}</span><h3>${data.heading}</h3><p>${data.intro}</p>`;
        return head;
    }

    function cloneTopic(topicKey) {
        const source = mainPage.querySelector(`[data-ank-panel-v196="${topicKey}"]`);
        const clone = cleanClone(source);
        if (!clone) return null;
        clone.hidden = false;
        clone.classList.add('as-cloned-detail-v274');
        clone.classList.add('is-active');
        return clone;
    }

    function renderTopics(data) {
        const wrapper = document.createElement('section');
        wrapper.className = 'as-special-panel-v274';
        wrapper.appendChild(makePanelHead(data));

        const stack = document.createElement('div');
        stack.className = 'as-special-topic-stack-v274';
        (data.topics || []).forEach(key => {
            const clone = cloneTopic(key);
            if (clone) stack.appendChild(clone);
        });
        wrapper.appendChild(stack);
        return wrapper;
    }

    function renderFaq(data) {
        const wrapper = document.createElement('section');
        wrapper.className = 'as-special-panel-v274';
        wrapper.appendChild(makePanelHead(data));

        const source = mainPage.querySelector('.ankilozan-faq-inner-v85');
        const clone = cleanClone(source);
        if (clone) {
            clone.querySelectorAll('.ankilozan-faq-item-v85').forEach(item => {
                item.classList.remove('is-open');
                const button = item.querySelector('.ankilozan-faq-question-v85');
                const answer = item.querySelector('.ankilozan-faq-answer-v85');
                button?.setAttribute('aria-expanded', 'false');
                if (answer) answer.hidden = true;
            });
            wrapper.appendChild(clone);
        }
        return wrapper;
    }

    function renderHerbs(data) {
        const wrapper = document.createElement('section');
        wrapper.className = 'as-special-panel-v274';
        wrapper.appendChild(makePanelHead(data));

        const source = document.getElementById('ankilozanHerbalSupportV233');
        const clone = cleanClone(source);
        if (clone) wrapper.appendChild(clone);
        return wrapper;
    }

    function renderSpecial(key) {
        const data = meta[key] || meta.overview;
        activeKey = key in meta ? key : 'overview';

        specialTitle.textContent = data.title;
        specialDesc.textContent = data.desc;
        specialIndex.textContent = data.index;

        tabButtons.forEach(button => {
            const active = button.dataset.asSpecialTabV274 === activeKey;
            button.classList.toggle('is-active-v274', active);
            button.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        specialContent.innerHTML = '';
        let panel;
        if (activeKey === 'faq') panel = renderFaq(data);
        else if (activeKey === 'herbs') panel = renderHerbs(data);
        else panel = renderTopics(data);
        specialContent.appendChild(panel);
        specialView.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function openSpecial(key) {
        renderSpecial(key);
        document.body.classList.add('as-special-open-v274');
        specialView.setAttribute('aria-hidden', 'false');
        history.pushState({ page: 'ankilozan-special-v274', tab: key }, '', `#ankilozan-${key}`);
        window.setTimeout(() => specialView.focus?.(), 20);
    }

    function closeSpecial(push = true) {
        document.body.classList.remove('as-special-open-v274');
        specialView.setAttribute('aria-hidden', 'true');
        if (push) history.pushState({ page: 'ankilozan-spondilit' }, '', '#ankilozan-spondilit');
        window.setTimeout(() => {
            hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 30);
    }

    launchButtons.forEach(button => {
        button.addEventListener('click', () => openSpecial(button.dataset.asSpecialTargetV274 || 'overview'));
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', () => renderSpecial(button.dataset.asSpecialTabV274 || 'overview'));
    });

    backButton?.addEventListener('click', () => closeSpecial(true));

    specialContent.addEventListener('click', event => {
        const question = event.target.closest('.ankilozan-faq-question-v85');
        if (!question) return;
        const item = question.closest('.ankilozan-faq-item-v85');
        const list = question.closest('.ankilozan-faq-list-v85');
        if (!item || !list) return;

        const willOpen = !item.classList.contains('is-open');
        list.querySelectorAll('.ankilozan-faq-item-v85').forEach(other => {
            other.classList.remove('is-open');
            other.querySelector('.ankilozan-faq-question-v85')?.setAttribute('aria-expanded', 'false');
            const answer = other.querySelector('.ankilozan-faq-answer-v85');
            if (answer) answer.hidden = true;
        });

        if (willOpen) {
            item.classList.add('is-open');
            question.setAttribute('aria-expanded', 'true');
            const answer = item.querySelector('.ankilozan-faq-answer-v85');
            if (answer) answer.hidden = false;
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && document.body.classList.contains('as-special-open-v274')) {
            closeSpecial(true);
        }
    });

    window.addEventListener('popstate', () => {
        const hash = location.hash.replace('#', '');
        const match = hash.match(/^ankilozan-(overview|diagnosis|treatment|movement|faq|herbs)$/);
        if (match) {
            renderSpecial(match[1]);
            document.body.classList.add('as-special-open-v274');
            specialView.setAttribute('aria-hidden', 'false');
        } else if (document.body.classList.contains('as-special-open-v274')) {
            document.body.classList.remove('as-special-open-v274');
            specialView.setAttribute('aria-hidden', 'true');
        }
    });
})();


// =========================================================
// V275 - ANKİLOZAN ANA SAYFA SIRALAMASI
// Launcher -> ana görsel -> hızlı hastalık geçişi
// Eski Temel Bilgiler posteri ana vitrinden kaldırıldı.
// =========================================================
(function () {
    const page = document.getElementById('ankilozanFaqSectionV85');
    if (!page) return;

    const nav = page.querySelector('.ankilozan-page-nav-v87');
    const launcher = document.getElementById('asLauncherV274');
    const switcher = page.querySelector('.disease-switcher-as-v250');
    const oldOverview = page.querySelector('.ankilozan-overview-v195');

    if (oldOverview) {
        oldOverview.setAttribute('aria-hidden', 'true');
    }

    let hero = document.getElementById('asMainHeroV275');
    if (!hero) {
        hero = document.createElement('section');
        hero.className = 'as-main-hero-v275';
        hero.id = 'asMainHeroV275';
        hero.setAttribute('aria-label', 'Ankilozan Spondilit ana bilgilendirme görseli');
        hero.innerHTML = `
            <img
                src="./disease-ankilozan-spondilit-v77.png?v=150"
                alt="Ankilozan Spondilit; omurga ve sakroiliak eklem bölgesini anlatan ana bilgilendirme görseli"
                loading="eager"
                decoding="async"
            >
        `;
    }

    function placeMainSectionsV275() {
        if (!nav || !launcher || !switcher) return;

        // V278: Osteopatiye dokunmadan yalnızca Tedavi Alanları /
        // Ankilozan Spondilit ana vitrini düzenlendi. Özel bölüm
        // butonları artık ana görselin üzerinde overlay olarak durur.
        nav.insertAdjacentElement('afterend', hero);
        if (launcher.parentElement !== hero) {
            hero.appendChild(launcher);
        }
        hero.insertAdjacentElement('afterend', switcher);
    }

    placeMainSectionsV275();

    // Ankilozan sayfası açıldığında artık eski gizlenen postere değil,
    // özel butonlar + ana görsel vitrininin başına gelsin.
    document.addEventListener('click', (event) => {
        const opener = event.target.closest('.ankilozan-card-link-v87, .js-open-ankilozan-v85, #ankilozanHeroButtonV85');
        if (!opener) return;
        window.setTimeout(() => {
            placeMainSectionsV275();
            hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
    }, true);

    window.addEventListener('popstate', () => {
        if (location.hash === '#ankilozan-spondilit') {
            window.setTimeout(() => {
                placeMainSectionsV275();
                hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 80);
        }
    });
})();


// =========================================================
// V279 - ANKİLOZAN'DAKİ ÖZEL SEKME MANTIĞINI
// ROMATOİD ARTRİT VE DİĞER TEDAVİ ALANLARINA DA UYGULA
// =========================================================
(function () {
    const raPage = document.getElementById('romatoidFaqSectionV198');
    const conditionPage = document.getElementById('conditionDiseasePageV246');
    const specialView = document.getElementById('treatmentSpecialViewV279');
    if (!specialView) return;

    const specialContent = document.getElementById('treatmentSpecialContentV279');
    const specialTitle = document.getElementById('treatmentSpecialTitleV279');
    const specialDesc = document.getElementById('treatmentSpecialDescV279');
    const specialIndex = document.getElementById('treatmentSpecialIndexV279');
    const specialKicker = document.getElementById('treatmentSpecialKickerV279');
    const backButton = document.getElementById('treatmentSpecialBackV279');
    const tabButtons = Array.from(specialView.querySelectorAll('[data-treatment-special-tab-v279]'));
    const launchButtons = Array.from(document.querySelectorAll('[data-treatment-launch-source-v279] [data-treatment-special-target-v279]'));

    const meta = {
        overview: {
            index: '01',
            title: 'Hastalığı Tanıyın',
            desc: 'Nedenleri, belirtileri ve kimlerde görüldüğünü birlikte inceleyin.',
            kicker: 'GENEL BAKIŞ',
            heading: 'Hastalığı Tanıyın',
            intro: 'Bu bölümde hastalığın temel yapısı, belirtileri ve kimlerde daha sık görülebileceğine ilişkin başlıklar bir araya getirilir.',
            topics: ['neden', 'belirtiler', 'kimlerde']
        },
        diagnosis: {
            index: '02',
            title: 'Tanı Süreci',
            desc: 'Öykü, muayene, görüntüleme ve laboratuvar değerlendirmelerini inceleyin.',
            kicker: 'TANI & DEĞERLENDİRME',
            heading: 'Tanı Süreci',
            intro: 'Tanı çoğu zaman tek bir testten değil; ayrıntılı öykü, fizik muayene ve gerekli görülen testlerin birlikte değerlendirilmesinden oluşur.',
            topics: ['tani']
        },
        treatment: {
            index: '03',
            title: 'Tedavi Yaklaşımı',
            desc: 'Yakınmaların hafifletilmesi ve kişiye özel tedavi planını inceleyin.',
            kicker: 'TEDAVİ & TAKİP',
            heading: 'Tedavi Yaklaşımı',
            intro: 'Bu alanda hem yakınmaları hafifletmeye yardımcı başlıklar hem de hekim değerlendirmesiyle planlanan tedavi yaklaşımı birlikte gösterilir.',
            topics: ['nasil-gecer', 'tedavi']
        },
        movement: {
            index: '04',
            title: 'Egzersiz & Günlük Yaşam',
            desc: 'Hareket, egzersiz ve günlük yaşam düzenlemelerini tek yerde inceleyin.',
            kicker: 'HAREKET & YAŞAM',
            heading: 'Egzersiz ve Günlük Yaşam',
            intro: 'Egzersiz planı ve günlük yaşamda dikkat edilebilecek başlıklar bu özel içerik alanında bir araya gelir.',
            topics: ['egzersiz', 'gunluk']
        },
        faq: {
            index: '05',
            title: 'Merak Edilen Sorular',
            desc: 'Sorular başlık halinde görünür; istediğiniz soruya basınca yanıt açılır.',
            kicker: 'SORU & CEVAP',
            heading: 'Sık Sorulan Sorular',
            intro: 'Sadece görmek istediğiniz soruya basın; yanıtı o başlığın altında açılsın.'
        },
        herbs: {
            index: '06',
            title: 'Bitkisel Destekler',
            desc: 'Fitoterapi başlıklarını ve güvenli kullanım notlarını inceleyin.',
            kicker: 'FİTOTERAPİ & DESTEK',
            heading: 'Bitkisel Destekler',
            intro: 'Bitkisel içerikler; tanı ve temel tedavinin yerine geçmeyen, hekim kontrolünde değerlendirilebilecek destek başlıkları olarak ele alınmalıdır.'
        }
    };

    const raHerbs = [
        ['Zerdeçal (Kurkumin)', 'phyto-zerdecal-v131.jpg', 'İnflamasyonla ilişkili süreçler açısından destekleyici içerikler arasında en sık değerlendirilen başlıklardan biridir.'],
        ['Boswellia (Akgünlük)', 'phyto-boswellia-v131.jpg', 'Eklem rahatlığı bağlamında araştırılan bitkisel desteklerden biridir; ilaçların yerine geçmez.'],
        ['Zencefil', 'phyto-zencefil-v131.jpg', 'Geleneksel kullanım alanı bulunan bu bitki, kişisel uygunluk ve mide hassasiyeti açısından değerlendirilmelidir.'],
        ['Çörek Otu', 'phyto-corek-otu-v131.jpg', 'Bazı destek protokollerinde gündeme gelebilir; düzenli ilaç kullanan kişilerde hekim görüşü önemlidir.']
    ];

    let activeSource = 'condition';
    let activeKey = 'overview';

    function cleanClone(node) {
        if (!node) return null;
        const clone = node.cloneNode(true);
        clone.removeAttribute('id');
        clone.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
        clone.querySelectorAll('[aria-labelledby], [aria-controls]').forEach((el) => {
            el.removeAttribute('aria-labelledby');
            el.removeAttribute('aria-controls');
        });
        return clone;
    }

    function getCurrentTitle() {
        if (activeSource === 'ra') return 'Romatoid Artrit';
        return window.getConditionDiseaseStateV279?.().title || 'Tedavi Alanı';
    }

    function getCurrentSlug() {
        if (activeSource === 'ra') return 'romatoid-artrit';
        return window.getConditionDiseaseStateV279?.().key || 'tedavi-alani';
    }

    function makePanelHead(data) {
        const title = getCurrentTitle();
        const head = document.createElement('div');
        head.className = 'as-special-panel-head-v274';
        head.innerHTML = `<span>${title.toUpperCase()} • ${data.kicker}</span><h3>${title}: ${data.heading}</h3><p>${data.intro}</p>`;
        return head;
    }

    function cloneConditionTopic(topicKey) {
        const getState = typeof window.getConditionDiseaseStateV279 === 'function' ? window.getConditionDiseaseStateV279 : null;
        const renderTopic = typeof window.renderConditionDiseaseTopicV279 === 'function' ? window.renderConditionDiseaseTopicV279 : null;
        const stateBefore = getState ? getState() : null;
        if (!stateBefore?.key || !renderTopic) return null;

        renderTopic(topicKey, false);
        const clone = cleanClone(document.getElementById('conditionDetailPanelV249'));
        if (stateBefore.topic) renderTopic(stateBefore.topic, false);

        if (clone) {
            clone.hidden = false;
            clone.classList.add('as-cloned-detail-v274', 'is-active');
        }
        return clone;
    }

    function cloneRaTopic(topicKey) {
        const source = raPage?.querySelector(`[data-ra-panel-v198="${topicKey}"]`);
        const clone = cleanClone(source);
        if (clone) {
            clone.hidden = false;
            clone.classList.add('as-cloned-detail-v274', 'is-active');
        }
        return clone;
    }

    function renderTopics(data) {
        const wrapper = document.createElement('section');
        wrapper.className = 'as-special-panel-v274';
        wrapper.appendChild(makePanelHead(data));

        const stack = document.createElement('div');
        stack.className = 'as-special-topic-stack-v274';

        (data.topics || []).forEach((topicKey) => {
            const clone = activeSource === 'ra' ? cloneRaTopic(topicKey) : cloneConditionTopic(topicKey);
            if (clone) stack.appendChild(clone);
        });

        if (!stack.children.length) {
            const empty = document.createElement('article');
            empty.className = 'ankilozan-detail-panel-v196 as-cloned-detail-v274 is-active';
            empty.innerHTML = '<div class="ankilozan-detail-panel-copy-v196"><span class="ankilozan-detail-kicker-v196">BİLGİ</span><h3>İçerik hazırlanıyor</h3><p>Bu bölüm için özel içerik kısa süre içinde eklenecektir.</p></div>';
            stack.appendChild(empty);
        }

        wrapper.appendChild(stack);
        return wrapper;
    }

    function buildFaqSection(data, items) {
        const wrapper = document.createElement('section');
        wrapper.className = 'as-special-panel-v274';
        wrapper.appendChild(makePanelHead(data));

        const faqBox = document.createElement('div');
        faqBox.className = 'ankilozan-faq-inner-v85';
        faqBox.innerHTML = `
            <div class="ankilozan-faq-heading-v85">
                <span class="ankilozan-faq-kicker-v85">BİLGİ ALANI</span>
                <h2>${getCurrentTitle()} Hakkında Sık Sorulanlar</h2>
                <p>Sadece görmek istediğiniz soruya basın; cevap tek başına açılsın.</p>
            </div>
            <div class="ankilozan-faq-list-v85">
                ${items.map((item, index) => `
                    <article class="ankilozan-faq-item-v85${index === 0 ? ' is-open' : ''}">
                        <button type="button" class="ankilozan-faq-question-v85" aria-expanded="${index === 0 ? 'true' : 'false'}">
                            <span>${item.question}</span>
                            <span class="ankilozan-faq-plus-v85">+</span>
                        </button>
                        <div class="ankilozan-faq-answer-v85"${index === 0 ? '' : ' hidden'}>
                            <p>${item.answer}</p>
                        </div>
                    </article>
                `).join('')}
            </div>
        `;

        wrapper.appendChild(faqBox);
        return wrapper;
    }

    function renderFaq(data) {
        if (activeSource === 'ra') {
            const items = Array.from(raPage?.querySelectorAll('.ra-faq-item-v198') || []).map((item) => ({
                question: item.querySelector('.ra-faq-question-v198 span')?.textContent?.trim() || 'Soru',
                answer: item.querySelector('.ra-faq-answer-v198 p')?.textContent?.trim() || ''
            }));
            return buildFaqSection(data, items);
        }

        const items = Array.from(conditionPage?.querySelectorAll('#conditionFaqListV249 .ankilozan-faq-item-v85') || []).map((item) => ({
            question: item.querySelector('.ankilozan-faq-question-v85 span')?.textContent?.trim() || 'Soru',
            answer: item.querySelector('.ankilozan-faq-answer-v85 p')?.textContent?.trim() || ''
        }));
        return buildFaqSection(data, items);
    }

    function renderConditionHerbs(data) {
        const wrapper = document.createElement('section');
        wrapper.className = 'as-special-panel-v274';
        wrapper.appendChild(makePanelHead(data));

        const source = document.getElementById('conditionHerbalSupportV249');
        const clone = cleanClone(source);
        if (clone) wrapper.appendChild(clone);
        return wrapper;
    }

    function renderRaHerbs(data) {
        const wrapper = document.createElement('section');
        wrapper.className = 'as-special-panel-v274';
        wrapper.appendChild(makePanelHead(data));

        const section = document.createElement('section');
        section.className = 'phyto-herbal-focus-v232';
        section.innerHTML = `
            <div class="phyto-focus-head-v232">
                <div>
                    <span>ROMATOİD ARTRİT • FİTOTERAPİ</span>
                    <h2>Romatoid Artritte Değerlendirilebilecek Bitkisel Destekler</h2>
                </div>
                <p>
                    Aşağıdaki içerikler tedavinin yerine geçen ürünler olarak değil; ilaç etkileşimleri,
                    mide-bağırsak hassasiyeti ve eşlik eden hastalıklar göz önünde bulundurularak hekim kontrolünde
                    değerlendirilebilecek destek başlıkları olarak düşünülmelidir.
                </p>
            </div>
            <div class="phyto-herbal-grid-v232">
                ${raHerbs.map(([name, img, text], index) => `
                    <article class="phyto-herbal-card-v232">
                        <img src="${img}" alt="${name} görseli" loading="lazy" decoding="async">
                        <div>
                            <span>${String(index + 1).padStart(2, '0')}</span>
                            <h3>${name}</h3>
                            <p>${text}</p>
                        </div>
                    </article>
                `).join('')}
            </div>
            <div class="phyto-focus-note-v232">
                <strong>Önemli Not:</strong>
                <p>Romatoid artritte bitkisel içerikler, düzenli romatoloji takibinin ve reçeteli tedavilerin yerine geçmez. Özellikle karaciğer, böbrek ve kan sulandırıcı ilaç kullananlarda mutlaka hekim görüşü gereklidir.</p>
            </div>
        `;

        wrapper.appendChild(section);
        return wrapper;
    }

    function renderHerbs(data) {
        return activeSource === 'ra' ? renderRaHerbs(data) : renderConditionHerbs(data);
    }

    function updateTabButtons() {
        tabButtons.forEach((button) => {
            const active = button.dataset.treatmentSpecialTabV279 === activeKey;
            button.classList.toggle('is-active-v274', active);
            button.setAttribute('aria-selected', active ? 'true' : 'false');
        });
    }

    function renderSpecial(key) {
        activeKey = key in meta ? key : 'overview';
        const data = meta[activeKey];
        const currentTitle = getCurrentTitle();

        specialKicker.textContent = `${currentTitle.toUpperCase()} • ÖZEL İÇERİK`;
        specialTitle.textContent = `${currentTitle} • ${data.title}`;
        specialDesc.textContent = data.desc;
        specialIndex.textContent = data.index;
        const backStrong = backButton?.querySelector('strong');
        if (backStrong) backStrong.textContent = `${currentTitle} Ana Sayfa`;
        updateTabButtons();

        specialContent.innerHTML = '';
        let panel;
        if (activeKey === 'faq') panel = renderFaq(data);
        else if (activeKey === 'herbs') panel = renderHerbs(data);
        else panel = renderTopics(data);

        specialContent.appendChild(panel);
        specialView.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function openSpecial(source, key, push = true) {
        activeSource = source === 'ra' ? 'ra' : 'condition';
        renderSpecial(key || 'overview');
        document.body.classList.add('treatment-special-open-v279');
        specialView.setAttribute('aria-hidden', 'false');
        if (push) {
            const slug = getCurrentSlug();
            history.pushState({ page: 'treatment-special-v279', source: activeSource, disease: slug, tab: activeKey }, '', `#${slug}-${activeKey}-ozel`);
        }
        window.setTimeout(() => backButton?.focus({ preventScroll: true }), 30);
    }

    function closeSpecial(push = true) {
        document.body.classList.remove('treatment-special-open-v279');
        specialView.setAttribute('aria-hidden', 'true');
        if (push) {
            const slug = getCurrentSlug();
            history.pushState({ page: activeSource === 'ra' ? 'romatoid-artrit' : 'condition-disease-v249', disease: slug }, '', activeSource === 'ra' ? '#romatoid-artrit' : `#${slug}`);
        }
        const target = activeSource === 'ra'
            ? raPage?.querySelector('.ra-hero-v198')
            : conditionPage?.querySelector('.condition-overview-poster-v249');
        window.setTimeout(() => target?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
    }

    launchButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const source = button.closest('[data-treatment-launch-source-v279]')?.dataset.treatmentLaunchSourceV279 || 'condition';
            openSpecial(source, button.dataset.treatmentSpecialTargetV279 || 'overview', true);
        });
    });

    tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            renderSpecial(button.dataset.treatmentSpecialTabV279 || 'overview');
            const slug = getCurrentSlug();
            history.replaceState({ page: 'treatment-special-v279', source: activeSource, disease: slug, tab: activeKey }, '', `#${slug}-${activeKey}-ozel`);
        });
    });

    backButton?.addEventListener('click', () => closeSpecial(true));

    specialContent.addEventListener('click', (event) => {
        const question = event.target.closest('.ankilozan-faq-question-v85');
        if (!question) return;
        const item = question.closest('.ankilozan-faq-item-v85');
        const list = question.closest('.ankilozan-faq-list-v85');
        if (!item || !list) return;

        const willOpen = !item.classList.contains('is-open');
        list.querySelectorAll('.ankilozan-faq-item-v85').forEach((other) => {
            other.classList.remove('is-open');
            other.querySelector('.ankilozan-faq-question-v85')?.setAttribute('aria-expanded', 'false');
            const answer = other.querySelector('.ankilozan-faq-answer-v85');
            if (answer) answer.hidden = true;
        });

        if (willOpen) {
            item.classList.add('is-open');
            question.setAttribute('aria-expanded', 'true');
            const answer = item.querySelector('.ankilozan-faq-answer-v85');
            if (answer) answer.hidden = false;
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && document.body.classList.contains('treatment-special-open-v279')) {
            closeSpecial(true);
        }
    });

    window.addEventListener('popstate', () => {
        const hash = location.hash.replace('#', '');
        const match = hash.match(/^(romatoid-artrit|bas-agrisi-migren|bel-sirt-agrisi|fibromiyalji|huzursuz-bacak|iltihabi-bagirsak|kronik-yorgunluk)-(overview|diagnosis|treatment|movement|faq|herbs)-ozel$/);

        if (match) {
            const diseaseSlug = match[1];
            const tab = match[2];
            if (diseaseSlug === 'romatoid-artrit') {
                if (typeof window.openRomatoidPageV198 === 'function') window.openRomatoidPageV198(false);
                openSpecial('ra', tab, false);
            } else {
                if (typeof window.openConditionDiseaseV249 === 'function') window.openConditionDiseaseV249(diseaseSlug, false);
                openSpecial('condition', tab, false);
            }
            return;
        }

        if (document.body.classList.contains('treatment-special-open-v279')) {
            document.body.classList.remove('treatment-special-open-v279');
            specialView.setAttribute('aria-hidden', 'true');
        }
    });

    window.closeTreatmentSpecialV279 = closeSpecial;
})();


// =========================================================
// V280 - ANKİLOZAN SAYFA KURGUSUNU TÜM TEDAVİ ALANLARINA YAKLAŞTIR
// Hero görselin üstünde aktif butonlar + altında hastalık geçişleri
// =========================================================
(function () {
    function arrangeConditionHeroV280() {
        const page = document.getElementById('conditionDiseasePageV246');
        const poster = page?.querySelector('.condition-overview-poster-v249');
        const launcher = document.getElementById('conditionLauncherV279');
        const switcher = page?.querySelector('.disease-switcher-condition-v250');
        const media = poster?.querySelector('.condition-overview-media-v249');
        if (!page || !poster || !launcher || !switcher || !media) return;

        page.classList.add('condition-layout-v280');
        poster.classList.add('condition-hero-v280');

        if (!poster.contains(launcher)) {
            poster.appendChild(launcher);
        }
        if (poster.nextElementSibling !== switcher) {
            poster.insertAdjacentElement('afterend', switcher);
        }

        const currentTitle = document.getElementById('conditionTitleV249')?.textContent?.trim() || 'Tedavi Alanı';
        const currentSummary = document.getElementById('conditionSummaryV249')?.textContent?.trim() || 'Bir başlık seçin; yalnızca seçtiğiniz özel içerik alanı açılsın.';
        const headKicker = launcher.querySelector('.as-launcher-head-v274 span');
        const headTitle = launcher.querySelector('.as-launcher-head-v274 h2');
        const headDesc = launcher.querySelector('.as-launcher-head-v274 p');
        if (headKicker) headKicker.textContent = currentTitle.toUpperCase();
        if (headTitle) headTitle.textContent = 'Merak Ettiğiniz Bölüme Geçin';
        if (headDesc) headDesc.textContent = 'Bir başlık seçin; yalnızca seçtiğiniz özel içerik alanı açılsın.';

        const img = media.querySelector('img');
        if (img) {
            img.setAttribute('alt', `${currentTitle} bilgilendirme görseli`);
        }
        const cap = media.querySelector('figcaption');
        if (cap) {
            cap.textContent = currentSummary;
        }
    }

    function arrangeRaHeroV280() {
        const page = document.getElementById('romatoidFaqSectionV198');
        const hero = page?.querySelector('.ra-hero-v198');
        const launcher = document.getElementById('raLauncherV279');
        const switcher = page?.querySelector('.disease-switcher-ra-v250');
        const media = hero?.querySelector('.ra-hero-media-v198');
        if (!page || !hero || !launcher || !switcher || !media) return;

        page.classList.add('ra-layout-v280');
        hero.classList.add('ra-hero-v280');

        if (!hero.contains(launcher)) {
            hero.appendChild(launcher);
        }
        if (hero.nextElementSibling !== switcher) {
            hero.insertAdjacentElement('afterend', switcher);
        }

        const headKicker = launcher.querySelector('.as-launcher-head-v274 span');
        const headTitle = launcher.querySelector('.as-launcher-head-v274 h2');
        const headDesc = launcher.querySelector('.as-launcher-head-v274 p');
        if (headKicker) headKicker.textContent = 'ROMATOİD ARTRİT';
        if (headTitle) headTitle.textContent = 'Merak Ettiğiniz Bölüme Geçin';
        if (headDesc) headDesc.textContent = 'Bir başlık seçin; yalnızca seçtiğiniz özel içerik alanı açılsın.';
    }

    function initTreatmentHeroLayoutV280() {
        arrangeConditionHeroV280();
        arrangeRaHeroV280();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTreatmentHeroLayoutV280, { once: true });
    } else {
        initTreatmentHeroLayoutV280();
    }

    if (typeof window.openConditionDiseaseV249 === 'function' && !window.openConditionDiseaseV249.__v280HeroWrapped) {
        const originalOpenCondition = window.openConditionDiseaseV249;
        window.openConditionDiseaseV249 = function (key, push = true) {
            const result = originalOpenCondition(key, push);
            window.requestAnimationFrame(() => {
                arrangeConditionHeroV280();
            });
            return result;
        };
        window.openConditionDiseaseV249.__v280HeroWrapped = true;
    }

    if (typeof window.openRomatoidPageV198 === 'function' && !window.openRomatoidPageV198.__v280HeroWrapped) {
        const originalOpenRA = window.openRomatoidPageV198;
        window.openRomatoidPageV198 = function (push = true) {
            const result = originalOpenRA(push);
            window.requestAnimationFrame(() => {
                arrangeRaHeroV280();
            });
            return result;
        };
        window.openRomatoidPageV198.__v280HeroWrapped = true;
    }
})();


// =========================================================
// V281 - TEDAVİ ALANI HASTALIK SAYFALARINDA ALT BİLGİ BLOKLARINI GİZLE
// Sadece üst hero + aktif butonlar + hastalıklar arası hızlı geçiş kalsın.
// Özel içerik butonları yine treatmentSpecialView içinde açılır.
// =========================================================
(function () {
    function compactTreatmentDiseasePagesV281() {
        const conditionPage = document.getElementById('conditionDiseasePageV246');
        const raPage = document.getElementById('romatoidFaqSectionV198');
        conditionPage?.classList.add('condition-compact-v281');
        raPage?.classList.add('ra-compact-v281');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', compactTreatmentDiseasePagesV281, { once: true });
    } else {
        compactTreatmentDiseasePagesV281();
    }
})();


// =========================================================
// V285 - AĞRI'YA GEÇERKEN TEDAVİ HASTALIK SAYFALARINI KAPAT
// CSS izolasyonuna ek güvenlik.
// =========================================================
(function () {
    function closeTreatmentDiseaseLayersV285() {
        document.body.classList.remove(
            'treatment-page-open',
            'treatment-nav-scrolled',
            'treatment-detail-open-v71',
            'treatment-detail-nav-scrolled-v71',
            'ankilozan-page-open-v87',
            'romatoid-page-open-v198',
            'condition-disease-page-open-v246',
            'as-special-open-v274',
            'treatment-special-open-v279',
            'osteo-standalone-open-v260'
        );

        [
            'tedaviAlanlariPage',
            'treatmentDetailPageV71',
            'ankilozanFaqSectionV85',
            'romatoidFaqSectionV198',
            'conditionDiseasePageV246',
            'ankilozanSpecialViewV274',
            'treatmentSpecialViewV279',
            'osteoSpecialViewV259'
        ].forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.setAttribute('aria-hidden', 'true');
        });
    }

    document.addEventListener('click', function (event) {
        const painTrigger = event.target.closest(
            '#heroPainButton, #treatmentPagePainButton, #painPageButton, #osteoGlobalPainButtonV107, ' +
            '#conditionPainV249, #raPainV198, [href="#agri"]'
        );

        if (!painTrigger) return;

        closeTreatmentDiseaseLayersV285();

        window.setTimeout(() => {
            document.body.classList.add('pain-page-open');
            const painPage = document.getElementById('agriPage');
            if (painPage) painPage.setAttribute('aria-hidden', 'false');
        }, 0);
    }, true);

    window.addEventListener('popstate', function () {
        if (location.hash !== '#agri') return;
        closeTreatmentDiseaseLayersV285();
        document.body.classList.add('pain-page-open');
        const painPage = document.getElementById('agriPage');
        if (painPage) painPage.setAttribute('aria-hidden', 'false');
    });
})();


// =========================================================
// V286 - Ağrı butonları düzeltmesi
// Ankilozan / Romatoid / Dinamik hastalık sayfalarından
// Ağrı'ya geçince Tedavi Alanları katmanları kapansın.
// =========================================================
(function () {
    function closeTreatmentDiseaseLayersV286() {
        document.body.classList.remove(
            'treatment-page-open',
            'treatment-nav-scrolled',
            'treatment-detail-open-v71',
            'treatment-detail-nav-scrolled-v71',
            'ankilozan-page-open-v87',
            'romatoid-page-open-v198',
            'condition-disease-page-open-v246',
            'ankilozan-special-open-v274',
            'treatment-special-open-v279',
            'osteo-standalone-open-v260'
        );

        [
            'tedaviAlanlariPage',
            'treatmentDetailPageV71',
            'ankilozanFaqSectionV85',
            'romatoidFaqSectionV198',
            'conditionDiseasePageV246',
            'ankilozanSpecialViewV274',
            'treatmentSpecialViewV279',
            'osteoSpecialViewV259'
        ].forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.setAttribute('aria-hidden', 'true');
        });
    }

    document.addEventListener('click', function (event) {
        const painTrigger = event.target.closest(
            '#heroPainButton, #treatmentPagePainButton, #painPageButton, #osteoGlobalPainButtonV107, ' +
            '#conditionPainV249, #ankilozanPainButtonV87, #romatoidPainButtonV198, [href="#agri"]'
        );

        if (!painTrigger) return;

        closeTreatmentDiseaseLayersV286();

        window.setTimeout(() => {
            document.body.classList.add('pain-page-open');
            const painPage = document.getElementById('agriPage');
            if (painPage) painPage.setAttribute('aria-hidden', 'false');
        }, 0);
    }, true);
})();


// =========================================================
// V288 - TEDAVİ ALANLARI ANA SAYFASINI TEMİZ AÇ
// Üstte kalan hastalık özel katmanlarını kapat.
// =========================================================


// =========================================================
// V289 - TEDAVİ ALANLARI ANA EKRANINA DÖNERKEN
// TÜM HASTALIK DETAY DURUMLARINI TEMİZLE
// =========================================================
(function () {
    function resetDiseasePagesForTreatmentMainV289() {
        document.body.classList.remove(
            'ankilozan-page-open-v87',
            'romatoid-page-open-v198',
            'condition-disease-page-open-v246',
            'as-special-open-v274',
            'treatment-special-open-v279'
        );

        [
            'ankilozanFaqSectionV85',
            'romatoidFaqSectionV198',
            'conditionDiseasePageV246',
            'ankilozanSpecialViewV274',
            'treatmentSpecialViewV279'
        ].forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.setAttribute('aria-hidden', 'true');
        });
    }

    /* Tedavi Alanları ana sayfasını açan tüm bilinen düğmeler */
    document.addEventListener('click', function (event) {
        const trigger = event.target.closest(
            '#heroDiseasesButton, ' +
            '#painPageTreatmentAreasButton, ' +
            '#aboutPageTreatmentAreasButton, ' +
            '#mediaPageTreatmentAreasButton, ' +
            '#ankilozanTreatmentAreasButtonV87, ' +
            '#romatoidTreatmentAreasButtonV198, ' +
            '#conditionAreasV249'
        );

        if (!trigger) return;
        resetDiseasePagesForTreatmentMainV289();
    }, true);

    /* Hash ile ana Tedavi Alanları sayfasına dönüldüğünde de temizle */
    window.addEventListener('popstate', function () {
        if (location.hash === '#tedavi-alanlari') {
            resetDiseasePagesForTreatmentMainV289();
        }
    });

    window.resetDiseasePagesForTreatmentMainV289 = resetDiseasePagesForTreatmentMainV289;
})();
