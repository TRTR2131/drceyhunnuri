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
// V439 - ÖZEL HASTALIK SEKMELERİNDE MİNİMAL HIZLI GEÇİŞ
// Sekme şeridinin hemen altında açılır; büyük görsel kartlar kullanılmaz.
// =========================================================
(function () {
    const diseasesV439 = [
        ['as', 'AS', 'Ankilozan Spondilit'],
        ['ra', 'RA', 'Romatoid Artrit'],
        ['bas-agrisi-migren', '01', 'Baş Ağrısı & Migren'],
        ['bel-sirt-agrisi', '02', 'Bel & Sırt Ağrısı'],
        ['fibromiyalji', '03', 'Fibromiyalji'],
        ['huzursuz-bacak', '04', 'Huzursuz Bacak'],
        ['iltihabi-bagirsak', '05', 'İltihabi Bağırsak'],
        ['kronik-yorgunluk', '06', 'Kronik Yorgunluk']
    ];

    const viewsV439 = [
        {
            view: document.getElementById('asSpecialViewV274'),
            tabs: document.getElementById('asSpecialTabsV274'),
            activeKey: () => 'as'
        },
        {
            view: document.getElementById('treatmentSpecialViewV279'),
            tabs: document.getElementById('treatmentSpecialTabsV279'),
            activeKey: () => {
                const state = typeof window.getConditionDiseaseStateV279 === 'function'
                    ? window.getConditionDiseaseStateV279()
                    : null;
                if (state?.key) return state.key;
                if (location.hash.startsWith('#romatoid-artrit')) return 'ra';
                const match = location.hash.match(/^#(bas-agrisi-migren|bel-sirt-agrisi|fibromiyalji|huzursuz-bacak|iltihabi-bagirsak|kronik-yorgunluk)/);
                return match?.[1] || 'ra';
            }
        }
    ];

    function closeMenuV439(menu) {
        const toggle = menu?.querySelector('.special-disease-quick-toggle-v439');
        const panel = menu?.querySelector('.special-disease-quick-panel-v439');
        if (!menu || !toggle || !panel) return;
        menu.classList.remove('is-open-v439');
        toggle.setAttribute('aria-expanded', 'false');
        panel.hidden = true;
    }

    function syncActiveV439(config, menu) {
        const activeKey = config.activeKey();
        menu.querySelectorAll('[data-disease-switch-v250]').forEach(button => {
            const active = button.dataset.diseaseSwitchV250 === activeKey;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-selected', String(active));
            if (active) button.setAttribute('aria-current', 'page');
            else button.removeAttribute('aria-current');
        });
    }

    function buildMenuV439(config, index) {
        if (!config.view || !config.tabs) return;

        let menu = config.view.querySelector('.special-disease-quick-v439');
        if (!menu) {
            menu = document.createElement('div');
            menu.className = 'special-disease-quick-v439';
            const panelId = `specialDiseaseQuickPanelV439-${index}`;
            menu.innerHTML = `
                <button type="button" class="special-disease-quick-toggle-v439" aria-expanded="false" aria-controls="${panelId}">
                    <span class="special-disease-quick-icon-v439" aria-hidden="true">⌘</span>
                    <span class="special-disease-quick-copy-v439">
                        <small>TEDAVİ ALANLARI</small>
                        <strong>Diğer hastalıklara geç</strong>
                    </span>
                    <span class="special-disease-quick-state-v439" aria-hidden="true">＋</span>
                </button>
                <div class="special-disease-quick-panel-v439" id="${panelId}" role="tablist" aria-label="Diğer hastalıklara hızlı ulaş" hidden>
                    ${diseasesV439.map(([key, code, title]) => `
                        <button type="button" class="special-disease-quick-item-v439" data-disease-switch-v250="${key}" role="tab" aria-selected="false">
                            <span class="special-disease-quick-code-v439">${code}</span>
                            <strong>${title}</strong>
                        </button>`).join('')}
                </div>`;
            config.tabs.insertAdjacentElement('afterend', menu);
        }

        const toggle = menu.querySelector('.special-disease-quick-toggle-v439');
        const panel = menu.querySelector('.special-disease-quick-panel-v439');

        toggle.onclick = event => {
            event.preventDefault();
            event.stopPropagation();
            const willOpen = !menu.classList.contains('is-open-v439');
            document.querySelectorAll('.special-disease-quick-v439.is-open-v439').forEach(closeMenuV439);
            syncActiveV439(config, menu);
            menu.classList.toggle('is-open-v439', willOpen);
            toggle.setAttribute('aria-expanded', String(willOpen));
            panel.hidden = !willOpen;
        };

        panel.addEventListener('click', event => {
            const button = event.target.closest('[data-disease-switch-v250]');
            if (!button) return;

            document.body.classList.remove('as-special-open-v274', 'treatment-special-open-v279');
            document.getElementById('asSpecialViewV274')?.setAttribute('aria-hidden', 'true');
            document.getElementById('treatmentSpecialViewV279')?.setAttribute('aria-hidden', 'true');
            closeMenuV439(menu);
        });

        syncActiveV439(config, menu);
    }

    viewsV439.forEach(buildMenuV439);

    document.addEventListener('click', event => {
        if (event.target.closest('.special-disease-quick-v439')) return;
        document.querySelectorAll('.special-disease-quick-v439.is-open-v439').forEach(closeMenuV439);
    });

    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        const openMenu = document.querySelector('.special-disease-quick-v439.is-open-v439');
        if (!openMenu) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        closeMenuV439(openMenu);
        openMenu.querySelector('.special-disease-quick-toggle-v439')?.focus();
    }, true);

    window.addEventListener('popstate', () => {
        viewsV439.forEach((config, index) => buildMenuV439(config, index));
    });
})();

// V439 - Hızlı hastalık geçişi özel içerik başlıklarının altında küçük,
// minimal ve içerik akışını bozmayan bir açılır menüye dönüştürüldü.

// V410 - Fitoterapi bitkiler üst alanı kompakt ve modern görünüme getirildi.
// V411 - Ana sayfa CTA grubu ve site arama düğmesi ilk ekranda görünecek şekilde yukarı alındı.


// =========================================================
// V402 - TÜM SAYFALARDA ORTAK BAĞLANTI NOKTALARI MENÜSÜ
// =========================================================
(function () {
    const nav = document.getElementById('globalConnectedNavV402');
    if (!nav) return;

    const menus = Array.from(nav.querySelectorAll('[data-v402-menu]'));
    const routeButtons = Array.from(nav.querySelectorAll('[data-v402-route]'));
    const brand = document.getElementById('globalConnectedBrandV402');
    const legacySelector = [
        '#siteHeader', '.hero-modern-nav-v82', '.general-featured-nav-v124',
        '.ankilozan-page-nav-v87', '.treatment-page-nav', '.pain-page-nav',
        '.treatment-detail-nav-modern-v160', '.device-detail-nav-v157',
        '.about-page-nav-v47', '.general-health-detail-nav-v75',
        '.media-page-nav-v48', '.pain-full-detail-nav-v215'
    ].join(',');

    function forceHideLegacyNavsV402() {
        document.querySelectorAll(legacySelector).forEach(function (legacyNav) {
            if (legacyNav === nav) return;
            legacyNav.style.setProperty('display', 'none', 'important');
            legacyNav.style.setProperty('visibility', 'hidden', 'important');
            legacyNav.setAttribute('aria-hidden', 'true');
        });
    }

    function setNavActiveV402(route) {
        if (brand) brand.removeAttribute('aria-current');
        nav.querySelectorAll('.global-connected-item-v402').forEach(function (button) {
            button.removeAttribute('aria-current');
        });

        if (route === 'home') {
            if (brand) brand.setAttribute('aria-current', 'page');
            return;
        }

        let active = nav.querySelector('[data-v402-route="' + route + '"]');
        if (!active) {
            const menu = nav.querySelector('[data-v402-menu="' + route + '"]');
            if (menu) active = menu.querySelector(':scope > .global-connected-item-v402');
        }
        if (active) active.setAttribute('aria-current', 'page');
    }

    function closeMenusV402(except) {
        menus.forEach(function (menu) {
            if (menu === except) return;
            menu.classList.remove('open');
            const button = menu.querySelector(':scope > .global-connected-item-v402');
            const panel = menu.querySelector(':scope > .global-connected-panel-v402');
            if (button) button.setAttribute('aria-expanded', 'false');
            if (panel) panel.setAttribute('aria-hidden', 'true');
        });
    }

    function toggleMenuV402(menu) {
        const button = menu.querySelector(':scope > .global-connected-item-v402');
        const panel = menu.querySelector(':scope > .global-connected-panel-v402');
        const willOpen = !menu.classList.contains('open');
        closeMenusV402(menu);
        menu.classList.toggle('open', willOpen);
        if (button) button.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        if (panel) panel.setAttribute('aria-hidden', willOpen ? 'false' : 'true');
    }

    menus.forEach(function (menu) {
        const button = menu.querySelector(':scope > .global-connected-item-v402');
        if (!button) return;
        button.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            setNavActiveV402(menu.dataset.v402Menu || '');
            toggleMenuV402(menu);
        });
    });

    function clickExistingV402(selector, requestedRoute) {
        const target = document.querySelector(selector);
        if (!target) return false;
        if (requestedRoute) {
            setNavActiveV402(requestedRoute);
            if (requestedRoute !== 'home') setPageModeV408(false);
        }
        target.click();
        closeMenusV402();
        return true;
    }

    function currentRouteV402() {
        const body = document.body;
        if (body.classList.contains('media-page-open')) return 'media';
        if (body.classList.contains('pain-page-open') || body.classList.contains('pain-full-detail-open-v215')) return 'pain';
        if (body.classList.contains('general-health-detail-open-v75')) return 'health';
        if (
            body.classList.contains('treatment-page-open') ||
            body.classList.contains('ankilozan-page-open-v87') ||
            body.classList.contains('romatoid-page-open-v198') ||
            body.classList.contains('condition-disease-page-open-v246') ||
            body.classList.contains('as-special-open-v274') ||
            body.classList.contains('treatment-special-open-v279')
        ) return 'areas';
        if (
            body.classList.contains('treatment-detail-open-v71') ||
            body.classList.contains('device-detail-page-open-v157') ||
            body.classList.contains('osteo-standalone-open-v260') ||
            body.classList.contains('phyto-herb-detail-open-v351')
        ) return 'treatments';
        if (
            body.classList.contains('about-page-open') ||
            body.classList.contains('legal-page-open-v56') ||
            body.classList.contains('info-guide-page-open-v143') ||
            body.classList.contains('info-guide-open-v143') ||
            body.classList.contains('site-feedback-open-v332')
        ) return 'info';
        return 'home';
    }

    function hasSubpageStateV408() {
        return Array.from(document.body.classList).some(function (name) {
            return /(?:page|detail|special|featured|standalone)-open/.test(name);
        });
    }

    function setPageModeV408(isHome) {
        document.body.classList.toggle('global-home-open-v408', isHome);
        document.body.classList.toggle('global-subpage-open-v405', !isHome);
        const motionLayer = document.querySelector('.hero-motion-layer-v407');
        if (motionLayer) motionLayer.hidden = !isHome;
    }

    function updateActiveV402() {
        forceHideLegacyNavsV402();
        const route = currentRouteV402();
        setPageModeV408(route === 'home' && !hasSubpageStateV408());
        setNavActiveV402(route);
    }

    function goHomeV402() {
        setPageModeV408(true);
        setNavActiveV402('home');
        const routes = [
            ['general-health-detail-open-v75', '#healthDetailHomeV75'],
            ['treatment-detail-open-v71', '#treatmentDetailHomeV71'],
            ['device-detail-page-open-v157', '#deviceDetailHomeV157'],
            ['pain-page-open', '#painPageHomeButton'],
            ['treatment-page-open', '#treatmentPageHomeButton'],
            ['media-page-open', '#mediaPageHomeButton'],
            ['about-page-open', '#aboutPageHomeButton'],
            ['ankilozan-page-open-v87', '#ankilozanHomeButtonV87'],
            ['romatoid-page-open-v198', '#romatoidHomeButtonV198'],
            ['legal-page-open-v56', '#legalHomeButtonV56'],
            ['info-guide-page-open-v143', '#infoGuideHomeV143']
        ];

        for (const route of routes) {
            if (document.body.classList.contains(route[0]) && clickExistingV402(route[1], 'home')) return;
        }

        const visibleHome = Array.from(document.querySelectorAll(
            '#generalFeaturedHomeButtonV124,#ankilozanHomeButtonV87,#romatoidHomeButtonV198,' +
            '#treatmentPageHomeButton,#painPageHomeButton,#legalHomeButtonV56,#infoGuideHomeV143,' +
            '#treatmentDetailHomeV71,#deviceDetailHomeV157,#aboutPageHomeButton,#healthDetailHomeV75,#mediaPageHomeButton'
        )).find(function (button) {
            const page = button.closest('section');
            return page && page.getAttribute('aria-hidden') !== 'true';
        });

        if (visibleHome) {
            visibleHome.click();
        } else {
            document.querySelectorAll('section[aria-hidden="false"]').forEach(function (page) {
                if (page.id !== 'anasayfa') page.setAttribute('aria-hidden', 'true');
            });
            document.body.className = document.body.className.split(/\s+/).filter(function (name) {
                return !/(page-open|detail-open|special-open|featured-open|standalone-open)/.test(name);
            }).join(' ');
            history.pushState({ page: 'home' }, '', location.pathname + location.search);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        closeMenusV402();
        window.setTimeout(updateActiveV402, 30);
    }

    if (brand) brand.addEventListener('click', goHomeV402);

    routeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const route = button.dataset.v402Route;
            setNavActiveV402(route);
            if (route === 'areas') clickExistingV402('#heroDiseasesButton', 'areas');
            if (route === 'pain') clickExistingV402('#heroPainButton', 'pain');
            if (route === 'media') clickExistingV402('#heroMediaButton', 'media');
        });
    });

    nav.querySelectorAll('[data-v402-treatment]').forEach(function (button) {
        button.addEventListener('click', function () {
            clickExistingV402('.hero-treatment-dropdown [data-treatment-detail="' + button.dataset.v402Treatment + '"]', 'treatments');
        });
    });

    nav.querySelectorAll('[data-v402-health]').forEach(function (button) {
        button.addEventListener('click', function () {
            clickExistingV402('.hero-health-dropdown [data-health-detail="' + button.dataset.v402Health + '"]', 'health');
        });
    });

    nav.querySelectorAll('[data-v402-guide]').forEach(function (button) {
        button.addEventListener('click', function () {
            clickExistingV402('.hero-info-menu-v54 [data-info-guide="' + button.dataset.v402Guide + '"]', 'info');
        });
    });

    const feedback = nav.querySelector('[data-v402-feedback]');
    if (feedback) feedback.addEventListener('click', function () {
        clickExistingV402('.hero-info-menu-v54 .site-feedback-open-v332', 'info');
    });

    nav.querySelectorAll('[data-v402-legal]').forEach(function (button) {
        button.addEventListener('click', function () {
            clickExistingV402('.hero-info-menu-v54 [data-legal-doc="' + button.dataset.v402Legal + '"]', 'info');
        });
    });

    document.addEventListener('click', function (event) {
        if (!nav.contains(event.target)) closeMenusV402();
    });
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeMenusV402();
    });
    window.addEventListener('popstate', function () { window.setTimeout(updateActiveV402, 30); });
    window.addEventListener('hashchange', function () { window.setTimeout(updateActiveV402, 30); });
    new MutationObserver(updateActiveV402).observe(document.body, { attributes: true, attributeFilter: ['class'] });

    updateActiveV402();
})();

// V409 - Alt sayfalardaki eski menü payları temizlendi; içerik ortak menünün hemen altında başlar.


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
        new Set(["osteopati", "fitoterapi", "cihaz-uygulamalari", "robotik-lazer", "diger-cihazlar", "geleneksel-tedavi", "igne", "estetik", "damar-yolu", "ozon-tedavisi"]);

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
            "romatoid-page-open-v198",
            "condition-disease-page-open-v246",
            "as-special-open-v274",
            "treatment-special-open-v279",
            "osteo-standalone-open-v260",
            "general-health-detail-open-v75",
            "info-guide-page-open-v143",
            "device-detail-page-open-v157",
            "general-featured-open-v124"
        );

        const pages = [
            document.getElementById("tedaviAlanlariPage"),
            document.getElementById("agriPage"),
            document.getElementById("hakkimdaPage"),
            document.getElementById("medyaPage"),
            document.getElementById("legalPageV56"),
            document.getElementById("ankilozanFaqSectionV85"),
            document.getElementById("romatoidFaqSectionV198"),
            document.getElementById("conditionDiseasePageV246"),
            document.getElementById("ankilozanSpecialViewV274"),
            document.getElementById("treatmentSpecialViewV279"),
            document.getElementById("osteoSpecialViewV259"),
            document.getElementById("generalHealthDetailPageV75"),
            document.getElementById("infoGuidePageV143"),
            document.getElementById("deviceDetailPageV157"),
            document.getElementById("generalFeaturedPageV124")
        ];

        pages.forEach(page => {
            if (page) {
                page.setAttribute("aria-hidden", "true");
            }
        });
    }

    function setTreatmentViewV71(name) {

        const aliasesV293 = {
            "robotik-lazer": "cihaz-uygulamalari",
            "diger-cihazlar": "cihaz-uygulamalari"
        };
        const normalized = aliasesV293[name] || name;
        const selected =
            validTreatments.has(normalized) ? normalized : "osteopati";

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

    function openTreatmentDetailV71(name, options = {}) {

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

        if (options.pushHistory !== false && location.hash !== "#" + selected) {
            history.pushState(
                {
                    page: "treatment-detail",
                    treatment: selected
                },
                "",
                "#" + selected
            );
        }

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
        openTreatmentDetailV71(initialHash, { pushHistory: false });
    }

    // V368: Tarayıcı geri/ileri düğmeleri tedavi sekmelerini gerçekten geri yüklesin.
    window.addEventListener("popstate", () => {
        const route = location.hash.replace("#", "");

        if (validTreatments.has(route)) {
            openTreatmentDetailV71(route, { pushHistory: false });
            return;
        }

        // Ana sayfaya geri dönüldüğünde açık tedavi katmanını kapat.
        if (!location.hash && document.body.classList.contains("treatment-detail-open-v71")) {
            closeTreatmentDetailV71();
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
    });

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
// V401 - ANA HERO OTOMATIK GEÇİŞ
// Her 5 saniyede bir sonraki slide'a geçer.
// Manuel ileri/geri tıklamasında sayaç yeniden 5 saniyeden başlar.
// =========================================================
(function () {
    const slider = document.getElementById("heroSliderV86");
    if (!slider) return;

    const slides = Array.from(slider.querySelectorAll('.hero-slide-v86'));
    if (!slides.length) return;

    const AUTO_DELAY_V401 = 10000;
    let activeIndex = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
    let autoTimerV401 = null;

    function activateByIndex(index) {
        const normalized = (index + slides.length) % slides.length;
        activeIndex = normalized;

        slides.forEach((slide, i) => {
            const active = i === normalized;
            slide.classList.toggle('is-active', active);
            if (active) slide.removeAttribute('aria-hidden');
            else slide.setAttribute('aria-hidden', 'true');
        });
    }

    function stopAutoV401() {
        if (!autoTimerV401) return;
        window.clearInterval(autoTimerV401);
        autoTimerV401 = null;
    }

    function startAutoV401() {
        stopAutoV401();
        if (slides.length < 2 || document.hidden) return;

        autoTimerV401 = window.setInterval(() => {
            activateByIndex(activeIndex + 1);
        }, AUTO_DELAY_V401);
    }

    function restartAutoV401() {
        startAutoV401();
    }

    slider.addEventListener('click', event => {
        const next = event.target.closest('[data-hero-next-v309]');
        if (next) {
            event.preventDefault();
            event.stopPropagation();
            activateByIndex(activeIndex + 1);
            restartAutoV401();
            return;
        }

        const prev = event.target.closest('[data-hero-prev-v309]');
        if (prev) {
            event.preventDefault();
            event.stopPropagation();
            activateByIndex(activeIndex - 1);
            restartAutoV401();
        }
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopAutoV401();
        else startAutoV401();
    });

    activateByIndex(activeIndex);
    startAutoV401();
})();


// =========================================================
// V309 - ANA HERO'DAKİ 6 DİĞER HASTALIĞIN DETAY SAYFASINA GEÇİŞİ
// =========================================================
(function () {
    const slider = document.getElementById('heroSliderV86');
    if (!slider) return;

    function openDisease(disease, topic = null) {
        if (!disease) return;

        if (typeof window.openConditionDiseaseV249 === 'function') {
            window.openConditionDiseaseV249(disease, true);
        } else if (typeof window.openConditionDiseaseV246 === 'function') {
            window.openConditionDiseaseV246(disease, true);
        } else {
            const card = document.querySelector(`.condition-card-link-v246[data-disease="${disease}"]`);
            card?.click();
        }

        if (topic) {
            window.setTimeout(() => {
                if (typeof window.renderConditionDiseaseTopicV279 === 'function') {
                    window.renderConditionDiseaseTopicV279(topic, true);
                }
            }, 80);
        }
    }

    slider.addEventListener('click', event => {
        const topicButton = event.target.closest('[data-condition-hero-topic-v309]');
        if (topicButton) {
            event.preventDefault();
            event.stopPropagation();
            openDisease(topicButton.dataset.conditionDiseaseV309, topicButton.dataset.conditionHeroTopicV309);
            return;
        }

        const openButton = event.target.closest('[data-condition-hero-open-v309]');
        if (openButton) {
            event.preventDefault();
            event.stopPropagation();
            openDisease(openButton.dataset.conditionHeroOpenV309);
        }
    });
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
        document.querySelectorAll('.osteo-faq-item-v105')
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
        "cihaz-uygulamalari": {
            kicker: "TEDAVİ",
            title: "Cihaz Uygulamaları",
            subtitle: "Modern teknoloji ile destekleyici cihaz uygulamaları"
        },
        "robotik-lazer": {
            kicker: "TEDAVİ",
            title: "Cihaz Uygulamaları",
            subtitle: "Modern teknoloji ile destekleyici cihaz uygulamaları"
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
        },
        "ozon-tedavisi": {
            kicker: "TEDAVİ",
            title: "Ozon Tedavisi",
            subtitle: "Ozon uygulamalarına ayrılan yeni tedavi bölümü"
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
            subtitle: "35 destekleyici tarif • arama ve kategori filtreleri"
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
    const meta={ems:{title:"EMS Yatak",hash:"#cihaz-ems-yatak"},magneto:{title:"Magneto",hash:"#cihaz-magneto"},induktif:{title:"İndüktif Magneto",hash:"#cihaz-induktif-magneto"},lenf:{title:"Lenf Drenaj",hash:"#cihaz-lenf-drenaj"},robotik:{title:"Robotik Lazer",hash:"#cihaz-robotik-lazer"}};
    function setDevice(name){const selected=meta[name]?name:"ems";tabs.forEach(b=>{const a=b.dataset.deviceDetailTab===selected;b.classList.toggle("active",a);b.setAttribute("aria-current",a?"page":"false")});panels.forEach(p=>{const a=p.dataset.deviceDetailPanel===selected;p.classList.toggle("active",a);p.hidden=!a});title.textContent=meta[selected].title;breadcrumbTitle.textContent=meta[selected].title;return selected}
    function hideKnown(){document.body.classList.remove("treatment-page-open","treatment-nav-scrolled","pain-page-open","pain-nav-scrolled","about-page-open","about-nav-scrolled","media-page-open","media-nav-scrolled","legal-page-open-v56","treatment-detail-open-v71","treatment-detail-nav-scrolled-v71","general-health-detail-open-v75","ankilozan-page-open-v87","info-guide-page-open-v143");["tedaviAlanlariPage","agriPage","hakkimdaPage","medyaPage","legalPageV56","treatmentDetailPageV71","generalHealthDetailPageV75","ankilozanFaqSectionV85","infoGuidePageV143"].forEach(id=>{const e=document.getElementById(id);if(e)e.setAttribute("aria-hidden","true")})}
    function openDevice(name,push=true){hideKnown();const selected=setDevice(name);document.body.classList.add("device-detail-page-open-v157");page.setAttribute("aria-hidden","false");if(push)history.pushState({page:"device-detail",device:selected},"",meta[selected].hash);window.scrollTo({top:0,behavior:"smooth"})}
    function openOther(push=true){document.body.classList.remove("device-detail-page-open-v157");page.setAttribute("aria-hidden","true");const t=document.getElementById("treatmentDetailPageV71");if(t){document.body.classList.add("treatment-detail-open-v71");t.setAttribute("aria-hidden","false");t.querySelectorAll("[data-treatment-detail-view]").forEach(v=>v.classList.toggle("active",v.dataset.treatmentDetailView==="cihaz-uygulamalari"));t.querySelectorAll("[data-treatment-top]").forEach(b=>b.classList.toggle("is-current-v74",b.dataset.treatmentTop==="cihaz-uygulamalari"))}if(push)history.pushState({page:"treatment-detail",treatment:"cihaz-uygulamalari"},"","#cihaz-uygulamalari");window.scrollTo({top:0,behavior:"smooth"})}
    function goHome(){document.body.classList.remove("device-detail-page-open-v157","treatment-detail-open-v71");page.setAttribute("aria-hidden","true");const t=document.getElementById("treatmentDetailPageV71");if(t)t.setAttribute("aria-hidden","true");history.pushState({page:"home"},"",location.pathname+location.search);window.scrollTo({top:0,behavior:"smooth"})}
    openers.forEach(o=>o.addEventListener("click",e=>{e.preventDefault();openDevice(o.dataset.deviceDetailOpen)}));
    tabs.forEach(b=>b.addEventListener("click",()=>openDevice(b.dataset.deviceDetailTab)));
    if(homeButton)homeButton.addEventListener("click",goHome);if(backButton)backButton.addEventListener("click",()=>openOther());if(breadcrumbBack)breadcrumbBack.addEventListener("click",()=>openOther());
    function resolve(){const found=Object.entries(meta).find(([,v])=>v.hash===location.hash);if(found){openDevice(found[0],false);return true}return false}
    window.addEventListener("popstate",()=>{if(resolve())return;if(location.hash==="#cihaz-uygulamalari" || location.hash==="#diger-cihazlar" || location.hash==="#robotik-lazer")openOther(false);else{document.body.classList.remove("device-detail-page-open-v157");page.setAttribute("aria-hidden","true")}});
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
            const hashes = {
                akupunktur: '#geleneksel-akupunktur',
                suluk: '#geleneksel-suluk',
                hacamat: '#geleneksel-hacamat'
            };
            history.replaceState(history.state, '', hashes[name] || '#geleneksel-tedavi');
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
        const routes = {
            '#geleneksel-akupunktur': 'akupunktur',
            '#geleneksel-suluk': 'suluk',
            '#geleneksel-hacamat': 'hacamat'
        };
        const target = routes[location.hash];
        if (!target) return false;
        showDetailV168(target, false);
        return true;
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
// V293 - Eski diger-cihazlar route güvenliği kaldırıldı; cihaz-uygulamalari ana route kullanılır.
// =========================================================

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

    // V415 - Genel Bakış kartlarındaki her alt başlık için özgün detay içeriği.
    const painTopicDetailsV415 = {
      'ayak-ayak-bilegi': {
        'Basış': {
          why: 'Ayağın zemine temas biçimi, kuvvetin topuktan ön ayağa ve parmaklara nasıl aktarıldığını etkiler. Basıştaki belirgin asimetri yalnızca ayak bölgesini değil; diz, kalça ve bel hattındaki yüklenmeyi de değiştirebilir.',
          checks: ['Ayak arkının duruşta ve yürüyüşteki görünümü', 'Topuk–orta ayak–ön ayak temas sırası ve ağrının yeri', 'Ayakkabı tabanındaki aşınma, adım uzunluğu ve sağ-sol farkı'],
          daily: 'Uzun yürüyüş, uzun süre ayakta kalma, sert zeminde çalışma ve uygun olmayan ayakkabı kullanımıyla yakınmanın nasıl değiştiği sorgulanır.'
        },
        'Denge': {
          why: 'Ayak bileği; denge, yön değiştirme ve zemine uyum sağlamada önemli rol oynar. Burkulma sonrası azalan eklem pozisyon duyusu, kişide güvensizlik ve tekrarlayan burkulma hissi oluşturabilir.',
          checks: ['Tek ayak üzerinde duruş ve sağ-sol denge farkı', 'Önceki burkulmalar, boşalma hissi ve hareket kontrolü', 'Düz ve düzensiz zeminde ayak bileği stabilitesi'],
          daily: 'Merdiven, kaldırım, eğimli veya bozuk zeminde yürüme sırasında dengesizlik olup olmadığı değerlendirilir.'
        },
        'Yük Dağılımı': {
          why: 'Vücut ağırlığının topuk, ayak iç kenarı, dış kenarı ve ön ayağa dengeli aktarılması rahat yürüyüş için önemlidir. Tek bir bölgeye aşırı yük binmesi hassasiyet ve çabuk yorulmayla ilişkili olabilir.',
          checks: ['Ağrının topukta, tabanda, ön ayakta veya bilek çevresindeki dağılımı', 'Ayakta durma ve yürüme süresiyle yakınmanın değişimi', 'Basış sırasında içe veya dışa belirgin yük aktarımı'],
          daily: 'Gün sonunda artan ağrı, işe veya spora göre yüklenme süresi ve ayakkabı seçimi birlikte ele alınır.'
        }
      },
      'diz': {
        'Eklem Yüzeyi': {
          why: 'Dizdeki ağrının önü, içi, dışı veya arkası farklı yapıların etkilenimini düşündürebilir. Eklem hattı, menisküs çevresi ve diz kapağı hareketinin birlikte değerlendirilmesi yakınmanın mekanik özelliklerini anlamaya yardım eder.',
          checks: ['Eklem hattı ve diz kapağı çevresinde hassasiyet veya şişlik', 'Hareket sırasında takılma, kilitlenme ya da sürtünme hissi', 'Ağrının çömelme, merdiven ve uzun oturmayla ilişkisi'],
          daily: 'Sandalyeden kalkma, merdiven inip çıkma ve çömelme gibi hareketlerde ağrının hangi aşamada ortaya çıktığı gözlenir.'
        },
        'Yük Aktarımı': {
          why: 'Diz, kalça ile ayak arasında kuvvet aktarım merkezidir. Kalça kontrolü, dizin yönü ve ayak basışı arasındaki uyumsuzluk bazı hareketlerde diz üzerindeki yükü artırabilir.',
          checks: ['Kalça–diz–ayak hizası ve sağ-sol yük farkı', 'Tek ayak duruşu, adım alma ve çömelme paterni', 'Yürüme veya koşu sırasında dizin içe-dışa hareketi'],
          daily: 'Merdiven, yokuş, uzun yürüyüş ve spor sırasında dizin ne zaman zorlandığı günlük hareket örnekleriyle değerlendirilir.'
        },
        'Hareket': {
          why: 'Dizin tam açılması ve kontrollü bükülmesi; yürüme, oturma ve merdiven kullanımı için gereklidir. Hareket kısıtlılığı ya da boşalma hissi kişinin günlük güvenini azaltabilir.',
          checks: ['Dizi bükme ve düzleştirme açıklığı', 'Hareketin belirli açısında ağrı, takılma veya güvensizlik', 'Kas kontrolüyle birlikte oturup kalkma ve çömelme'],
          daily: 'Araçtan inme, alçak koltuğa oturma, namaz veya spor gibi derin bükülme gerektiren hareketler ayrıca sorgulanır.'
        }
      },
      'kalca': {
        'Hareket Açıklığı': {
          why: 'Kalçanın bükülme, açılma ve dönme hareketleri yürüyüşün yanı sıra bel ve diz hareketlerini de etkiler. Kısıtlılık; kasıkta, yan kalçada veya kalça arkasında farklı biçimlerde hissedilebilir.',
          checks: ['Kalça bükülmesi ile iç ve dış rotasyon hareketleri', 'Kasık, yan kalça ve kalça arkasında ağrının yeri', 'Sağ ve sol taraf arasındaki hareket ve kontrol farkı'],
          daily: 'Çorap-ayakkabı giyme, araçtan inme, bacak bacak üstüne atma ve merdiven kullanma sırasında zorlanma değerlendirilir.'
        },
        'Pelvis': {
          why: 'Pelvis; omurga ile alt ekstremite arasında yük aktarımını sağlar. Ayakta duruşta veya tek ayak basışında belirgin kontrol farkı kalça çevresindeki dokuların yüklenmesini değiştirebilir.',
          checks: ['Pelvik hizalanma ve sağ-sol ağırlık aktarımı', 'Tek ayak duruşunda kalça ve gövde kontrolü', 'Sakroiliak bölge, bel ve kalça arasındaki hareket ilişkisi'],
          daily: 'Uzun süre tek tarafa yaslanma, çanta taşıma, ayakta çalışma ve yürüyüş alışkanlıklarının yakınmayla ilişkisi ele alınır.'
        },
        'Kas Yapıları': {
          why: 'Gluteal kaslar, kalça çevresi tendonlar ve diğer yumuşak dokular yürüme ile pelvis kontrolünde birlikte çalışır. Kuvvet, esneklik veya dayanıklılık farkları belirli hareketlerde hassasiyeti artırabilir.',
          checks: ['Gluteal kasların kuvveti ve hareket sırasındaki aktivasyonu', 'Kalça ön, yan ve arka kas gruplarında gerginlik', 'Yan kalça çevresi tendon ve yumuşak doku hassasiyeti'],
          daily: 'Yan yatma, uzun yürüyüş, merdiven çıkma ve sandalyeden kalkma sırasında oluşan yakınmalar karşılaştırılır.'
        }
      },
      'bel': {
        'Postür': {
          why: 'Tek bir “doğru postür” yoktur; ancak uzun süre aynı pozisyonda kalmak ve sık tekrarlanan zorlayıcı duruşlar bel yakınmalarını etkileyebilir. Değerlendirmede duruştan çok, pozisyonun süresi ve değiştirilebilmesi önem taşır.',
          checks: ['Oturma ve ayakta durma süresi ile sık pozisyon değiştirme alışkanlığı', 'Çalışma masası, ekran, sandalye ve yük taşıma düzeni', 'Bel ağrısını artıran veya azaltan duruşlar'],
          daily: 'Masa başı çalışma, uzun araç kullanma ve ev işlerinde hangi pozisyonların yakınmayı artırdığı belirlenir.'
        },
        'Omurga - Kalça': {
          why: 'Eğilme ve doğrulma sırasında bel, pelvis ve kalça birlikte hareket eder. Kalça hareketinin azalması veya gövde kontrolündeki zorluk bazı görevlerde bel bölgesine binen yükü değiştirebilir.',
          checks: ['Öne eğilme, doğrulma, dönme ve yana eğilme hareketleri', 'Kalça hareket açıklığı ile bel-pelvis koordinasyonu', 'Ağrının kalça veya bacağa yayılımı ve eşlik eden uyuşma-güç kaybı'],
          daily: 'Yerden bir şey alma, yataktan kalkma, ayakkabı giyme ve yük kaldırma biçimi birlikte incelenir.'
        },
        'Günlük Yaşam': {
          why: 'Bel ağrısının şiddeti kadar işe, uykuya, yürüme kapasitesine ve kişisel bakıma etkisi de önemlidir. Yakınmayı tetikleyen durumların belirlenmesi kişiye uygun bir plan kurulmasını sağlar.',
          checks: ['Ağrının gün içindeki seyri ve uykuya etkisi', 'Oturma, ayakta kalma, yürüme ve kaldırma toleransı', 'İş, spor ve ev içi görevlerde kaçınılan hareketler'],
          daily: 'Amaç günlük hareketi tamamen bırakmak değil; yakınmayı artıran yükü tanıyıp güvenli ve kademeli hareket planı oluşturmaktır.'
        }
      },
      'sirt': {
        'Torasik Bölge': {
          why: 'Torasik omurga, gövde dönüşü ve kaburga hareketleriyle solunuma katkı sağlar. Bu bölgedeki sertlik boyun, omuz ve bel hareketlerinin daha fazla çalışmasına neden olabilir.',
          checks: ['Sırt omurlarında dönme ve geriye açılma hareketi', 'Kaburga hareketleri ile nefes alma paterni', 'Kürek kemikleri arasındaki hassasiyet ve bölgesel sertlik'],
          daily: 'Uzun süre öne eğik çalışma, masa başı oturma ve gövde dönüşü gerektiren işlerde yakınmanın değişimi incelenir.'
        },
        'Skapula': {
          why: 'Kürek kemiği, omuz hareketi için hareketli bir taban oluşturur. Skapulanın göğüs kafesi üzerindeki kontrolü; kol kaldırma, itme ve çekme sırasında sırt kaslarının yüklenmesini etkiler.',
          checks: ['Kol kaldırırken skapulanın hareket ritmi', 'Kürek kemiği çevresindeki kasların kuvvet ve dayanıklılığı', 'İtme, çekme ve taşıma hareketlerinde sağ-sol farkı'],
          daily: 'Bilgisayar kullanma, çanta taşıma, raflara uzanma ve egzersiz hareketlerinde kürek kemiği çevresi yakınmaları sorgulanır.'
        },
        'Boyun İlişkisi': {
          why: 'Boyun ve üst sırt aynı hareket zincirinin parçalarıdır. Başın uzun süre önde kalması veya boyun hareketleriyle değişen yakınmalar, sırt bölgesinin birlikte değerlendirilmesini gerektirebilir.',
          checks: ['Boyun hareketleriyle sırt yakınmasının değişip değişmediği', 'Baş-boyun, omuz ve torasik omurga hizası', 'Kola yayılan ağrı, uyuşma, karıncalanma veya güç kaybı varlığı'],
          daily: 'Telefon ve ekran kullanımı, stresle artan kas gerginliği ve uyku pozisyonu birlikte ele alınır.'
        }
      },
      'el-bilegi': {
        'Kavrama': {
          why: 'Kavrama; el bileği, başparmak, parmaklar ve ön kol kaslarının eş zamanlı çalışmasını gerektirir. Ağrı veya güç kaybı, günlük ince ve kaba motor görevleri doğrudan etkileyebilir.',
          checks: ['Kavrama ve parmak ucu sıkıştırma sırasında ağrının yeri', 'Sağ-sol kavrama gücü ve çabuk yorulma', 'Eşyayı düşürme, başparmak kullanımı ve hareket kontrolü'],
          daily: 'Kavanoz açma, poşet taşıma, kalem tutma ve telefon kullanma gibi görevlerdeki zorlanma değerlendirilir.'
        },
        'Tendonlar': {
          why: 'El bileği çevresindeki tendonlar tekrarlayan kullanım ve zorlayıcı pozisyonlardan etkilenebilir. Ağrının belirli bir hareketle artması, değerlendirmede hangi dokuların önceliklendirileceğine yardımcı olur.',
          checks: ['Başparmak ve el bileği çevresinde lokal hassasiyet veya şişlik', 'Tekrarlanan hareketlerde ağrı, sürtünme ya da takılma hissi', 'Ön kol kasları ile tendon hattındaki gerginlik'],
          daily: 'Klavye-fare kullanımı, telefon tutma, el işi ve spor gibi tekrarlayıcı aktivitelerin süresi ile yakınma ilişkisi incelenir.'
        },
        'Günlük Kullanım': {
          why: 'El bileği gün boyunca çok sayıda küçük tekrara maruz kalır. Tek bir ağır hareketten çok, tekrar sayısı, uygulanan kuvvet ve bileğin uzun süre bükülü kalması yakınmayı etkileyebilir.',
          checks: ['İş, hobi ve ev içi görevlerde tekrar eden el hareketleri', 'Bileğin nötr pozisyondan uzun süre sapması', 'Dinlenmeyle azalma, gece yakınması ve çalışma temposu'],
          daily: 'Çalışma düzeni, kısa molalar, ekipman yerleşimi ve görevi iki ele paylaştırma gibi pratik düzenlemeler değerlendirilir.'
        }
      },
      'dirsek': {
        'Tendon Yapıları': {
          why: 'Dirseğin iç ve dış tarafındaki tendonlar kavrama, kaldırma ve el bileği hareketlerinde yük taşır. Hassasiyetin yeri ve hangi harekette arttığı tendon yüklenmesini anlamada önemlidir.',
          checks: ['Dirseğin iç ve dış kemik çıkıntıları çevresinde hassasiyet', 'Dirence karşı el bileği ve ön kol hareketlerinde ağrı', 'Kavrama kuvveti ile tekrarlayıcı spor veya iş yükü'],
          daily: 'Çaydanlık kaldırma, kapı kolu çevirme, raket kullanma ve aletle çalışma gibi hareketler karşılaştırılır.'
        },
        'Kullanım Şekli': {
          why: 'Dirsek yakınmaları çoğu zaman tek bir olaydan değil, aynı hareketin kuvvetli veya sık tekrarlanmasından etkilenir. Hareketin tekniği ve çalışma yüksekliği yükü değiştirebilir.',
          checks: ['Günlük tekrar sayısı, kullanılan kuvvet ve dinlenme araları', 'Klavye-fare, el aletleri ve spor tekniği', 'Omuz, el bileği ve dirseğin görev sırasında birlikte kullanımı'],
          daily: 'İş istasyonu ve kullanılan ekipmanın konumu, yükü gövdeye yakın taşıma ve görev değişimi gibi noktalar değerlendirilir.'
        },
        'Ön Kol': {
          why: 'Ön kol kasları el bileğini ve parmakları çalıştırırken dirseğe tendonlarla bağlanır. Kas gerginliği, kavrama yükü ve ön kolun dönme hareketleri dirsek çevresi yakınmalarına eşlik edebilir.',
          checks: ['Avuç içini yukarı-aşağı çevirme hareketi', 'Ön kol kaslarında gerginlik ve sağ-sol kuvvet farkı', 'El bileği hareketleriyle dirsek ağrısının değişimi'],
          daily: 'Tornavida kullanma, kavanoz açma, yazı yazma ve taşıma gibi dönme-kavrama birleşimli hareketler incelenir.'
        }
      },
      'omuz': {
        'Hareket Açıklığı': {
          why: 'Omuz çok yönlü hareket eder; kolu kaldırma ve döndürme için eklem, kaslar ve skapula birlikte çalışır. Hangi hareket düzleminde kısıtlılık olduğu değerlendirmeyi yönlendirir.',
          checks: ['Kolu öne, yana ve baş üzerine kaldırma açıklığı', 'İç-dış rotasyon ve ağrılı hareket yayı', 'Aktif hareket ile destekli hareket arasındaki fark'],
          daily: 'Saç tarama, giyinme, arka cebe uzanma ve üst rafa eşya yerleştirme sırasında zorlanma sorgulanır.'
        },
        'Skapula': {
          why: 'Skapula, omuz eklemi hareket ederken uygun yönde dönerek kol için dengeli bir taban sağlar. Göğüs kafesi ve sırt postürü de bu ritmi etkileyebilir.',
          checks: ['Kol kaldırırken skapula-humerus hareket ritmi', 'Kürek kemiği çevresi kasların kontrolü ve dayanıklılığı', 'Torasik omurga hareketi ve omuz kuşağı hizası'],
          daily: 'Baş üstü çalışma, itme-çekme, yüzme veya ağırlık egzersizlerinde omuz çevresinin nasıl tepki verdiği değerlendirilir.'
        },
        'Boyun İlişkisi': {
          why: 'Boyundan çıkan sinirler omuz ve kola uzanır; bu nedenle bazı omuz yakınmaları boyun hareketleriyle değişebilir. Omuz ve boynun birlikte değerlendirilmesi ağrının kaynağını ayırt etmeye yardımcı olur.',
          checks: ['Boyun hareketleriyle omuz veya kol yakınmasının değişimi', 'Kola yayılan ağrı, uyuşma, karıncalanma veya güçsüzlük', 'Boyun, omuz kuşağı ve skapula arasındaki postür ilişkisi'],
          daily: 'Ekran kullanımı, uyku pozisyonu ve uzun süre kolu önde tutma gibi alışkanlıkların etkisi sorgulanır.'
        }
      }
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
    const contextImages=Array.from(detailPage.querySelectorAll('[data-pain-context-image-v219]'));
    const topicModal=document.getElementById('painTopicModalV415');
    const topicClose=document.getElementById('painTopicCloseV415');
    const topicRegion=document.getElementById('painTopicRegionV415');
    const topicTitle=document.getElementById('painTopicTitleV415');
    const topicLead=document.getElementById('painTopicLeadV415');
    const topicWhy=document.getElementById('painTopicWhyV415');
    const topicChecks=document.getElementById('painTopicChecksV415');
    const topicDaily=document.getElementById('painTopicDailyV415');
    const topicWarning=document.getElementById('painTopicWarningV415');
    const topicRelated=document.getElementById('painTopicRelatedV415');

    let activePain='';
    let activeImageSrc='';
    let lastTopicTriggerV415=null;

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
    function slugifyTopicV415(value) {
      return String(value||'detay').toLocaleLowerCase('tr-TR')
        .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
        .replace(/ı/g,'i').replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s').replace(/ö/g,'o').replace(/ç/g,'c')
        .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
    }

    function cardHtml(items,section='genel') {
      return (items||[]).map((item,index)=>{
        const href=`#agri-${activePain}-${slugifyTopicV415(item[0])}`;
        const areaTitle=(data[activePain]&&data[activePain].title)||'Ağrı Alanı';
        const number=String(index+1).padStart(2,'0');
        return `<article class="pain-full-info-card-v215 pain-full-info-card-v219 pain-full-info-card-v415 pain-full-info-card-v416" data-pain-area-v416="${activePain}"><div class="pain-full-card-image-v219 pain-full-card-image-v416"><img src="${activeImageSrc||''}" alt="${item[0]} görseli"><span class="pain-card-area-v416">${areaTitle}</span><span class="pain-card-index-v416">${number}</span></div><div class="pain-full-card-body-v219"><strong>${item[0]}</strong><p>${item[1]}</p><a class="pain-topic-link-v415 pain-topic-link-v416" href="${href}" data-pain-topic-section-v415="${section}" data-pain-topic-index-v415="${index}" aria-label="${item[0]} başlığını detaylı incele">Detayları İncele <span aria-hidden="true">+</span></a></div></article>`;
      }).join('');
    }

    function topicWarningTextV415(key) {
      if(key==='bel' || key==='sirt' || key==='bel-sirt') {
        return 'İki bacakta belirgin güçsüzlük veya uyuşma, genital–makat çevresinde his kaybı, idrar ya da dışkı kontrolünde yeni değişiklik, ciddi travma, ateşle birlikte ağrı veya hızla kötüleşme varsa acil tıbbi değerlendirme gerekir.';
      }
      if(key==='omuz' || key==='dirsek' || key==='el-bilegi' || key==='omuz-kol') {
        return 'Ciddi travma sonrası şekil bozukluğu, kolu kullanamama, geçmeyen uyuşma, elde soğukluk veya renk değişikliği, ateşle birlikte sıcak-kızarık şişlik ya da göğüs ağrısı ve nefes darlığı eşlik ediyorsa gecikmeden tıbbi yardım alınmalıdır.';
      }
      return 'Ciddi travma sonrası şekil bozukluğu, ekleme yük verememe, hızla artan şişlik, sıcak-kızarık eklemle birlikte ateş, belirgin uyuşma veya güç kaybı varsa gecikmeden tıbbi değerlendirme gerekir.';
    }

    function topicDetailV415(item,topicName,topicDescription) {
      const exact=painTopicDetailsV415[activePain] && painTopicDetailsV415[activePain][topicName];
      if(exact) return exact;
      return {
        why: `${topicName}, ${item.title.toLocaleLowerCase('tr-TR')} değerlendirmesinde bölgesel bulguların günlük hareketlerle nasıl ilişkili olduğunu anlamaya yardımcı olan önemli bir başlıktır. Tek başına tanı koydurmaz; diğer muayene bulgularıyla birlikte yorumlanır.`,
        checks: [topicDescription, item.evalText || item.summaryText, 'Yakınmanın ne zaman başladığı, hangi hareketle arttığı ve dinlenmeyle nasıl değiştiği'],
        daily: `${item.title} ile ilişkili günlük işlerde zorlanma, çalışma ve spor alışkanlıkları ile kişinin kaçındığı hareketler birlikte değerlendirilir.`
      };
    }

    function closeTopicV415(updateHash=true,restoreFocus=true) {
      if(!topicModal || topicModal.hidden) return;
      topicModal.classList.remove('is-open-v415');
      topicModal.setAttribute('aria-hidden','true');
      topicModal.hidden=true;
      document.body.classList.remove('pain-topic-open-v415');
      if(updateHash && activePain) history.replaceState({page:'pain-full-detail-v215',pain:activePain},'',`#agri-${activePain}`);
      if(restoreFocus && lastTopicTriggerV415 && typeof lastTopicTriggerV415.focus==='function') lastTopicTriggerV415.focus();
    }

    function openTopicV415(section,index,trigger,push=true) {
      const item=data[activePain];
      if(!item || !topicModal) return;
      const items=section==='degerlendirme' ? (item.evalCards||[]) : (item.summaryCards||[]);
      const topic=items[Number(index)];
      if(!topic) return;
      const details=topicDetailV415(item,topic[0],topic[1]);
      lastTopicTriggerV415=trigger||lastTopicTriggerV415;
      if(topicRegion) topicRegion.textContent=item.title.toLocaleUpperCase('tr-TR')+' · DETAYLI İNCELEME';
      if(topicTitle) topicTitle.textContent=topic[0];
      if(topicLead) topicLead.textContent=topic[1];
      if(topicWhy) topicWhy.textContent=details.why;
      if(topicChecks) topicChecks.innerHTML=(details.checks||[]).map(value=>`<li>${value}</li>`).join('');
      if(topicDaily) topicDaily.textContent=details.daily;
      if(topicWarning) topicWarning.textContent=topicWarningTextV415(activePain);
      if(topicRelated) {
        topicRelated.innerHTML=`<span>Bu bölümdeki diğer başlıklar</span>${items.map((entry,i)=>`<a href="#agri-${activePain}-${slugifyTopicV415(entry[0])}" data-pain-topic-related-v415="${i}" data-pain-topic-section-v415="${section}" class="${i===Number(index)?'is-active-v415':''}">${entry[0]}</a>`).join('')}`;
      }
      topicModal.hidden=false;
      topicModal.setAttribute('aria-hidden','false');
      topicModal.classList.add('is-open-v415');
      document.body.classList.add('pain-topic-open-v415');
      if(push) history.pushState({page:'pain-topic-v415',pain:activePain,section,index:Number(index)},'',`#agri-${activePain}-${slugifyTopicV415(topic[0])}`);
      if(topicClose) topicClose.focus();
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
      detailPage.dataset.painAreaV416=key;
      if(title) title.textContent=item.title;
      if(lead) lead.textContent=item.lead+' '+item.summaryText;
      const cardImage=card ? card.querySelector('img') : null;
      activeImageSrc=(cardImage && (cardImage.getAttribute('src')||cardImage.src)) || painImageMap[key] || activeImageSrc;
      if(image && activeImageSrc) { image.src=activeImageSrc; image.alt=item.title+' medikal görseli'; }
      contextImages.forEach(img=>{ if(activeImageSrc){ img.src=activeImageSrc; img.alt=item.title+' medikal görseli'; } });
      if(generalTitle) generalTitle.textContent=item.summaryTitle;
      if(generalText) generalText.textContent=item.summaryText;
      if(generalCards) generalCards.innerHTML=cardHtml(item.summaryCards,'genel');
      if(symptomsTitle) symptomsTitle.textContent=item.symptomsTitle;
      if(symptomsLead) symptomsLead.textContent=item.symptomsLead;
      if(symptomsList) symptomsList.innerHTML=(item.symptoms||[]).map(x=>`<li>${x}</li>`).join('');
      if(whoTitle) whoTitle.textContent=item.title+' kimlerde görülebilir?';
      if(whoText) whoText.textContent=item.whoText;
      if(evalTitle) evalTitle.textContent=item.evalTitle;
      if(evalText) evalText.textContent=item.evalText;
      if(evalCards) evalCards.innerHTML=cardHtml(item.evalCards,'degerlendirme');
      if(approachTitle) approachTitle.textContent=item.approachTitle;
      if(approachText) approachText.textContent=item.approachText;
      if(approachTags) approachTags.innerHTML=(item.approachTags||[]).map(x=>`<span>${x}</span>`).join('');
      openTab('genel');
    }

    function openDetail(key,card,push=true) {
      closeTopicV415(false,false);
      render(key,card);
      document.body.classList.remove('pain-page-open','pain-nav-scrolled');
      document.body.classList.add('pain-full-detail-open-v215');
      painPage.setAttribute('aria-hidden','true');
      detailPage.setAttribute('aria-hidden','false');
      if(push) history.pushState({page:'pain-full-detail-v215',pain:key},'', '#agri-'+key);
      window.scrollTo({top:0,behavior:'smooth'});
    }

    function closeDetail(push=true) {
      closeTopicV415(false,false);
      document.body.classList.remove('pain-full-detail-open-v215');
      document.body.classList.add('pain-page-open');
      detailPage.setAttribute('aria-hidden','true');
      painPage.setAttribute('aria-hidden','false');
      if(push) history.pushState({page:'agri'},'', '#agri');
      window.scrollTo({top:0,behavior:'smooth'});
    }

    cards.forEach(card=>{
      const cta=card.querySelector('.pain-card-body-v76 span');
      if(cta) cta.textContent='Ağrı Alanını İncele';
      card.addEventListener('click',event=>{
        event.preventDefault();
        openDetail(card.dataset.pain,card,true);
      });
    });

    detailPage.addEventListener('click',event=>{
      const link=event.target.closest('.pain-topic-link-v415');
      if(link) {
        event.preventDefault();
        openTopicV415(link.dataset.painTopicSectionV415||'genel',link.dataset.painTopicIndexV415,link,true);
        return;
      }
      const related=event.target.closest('[data-pain-topic-related-v415]');
      if(related) {
        event.preventDefault();
        openTopicV415(related.dataset.painTopicSectionV415||'genel',related.dataset.painTopicRelatedV415,related,true);
      }
    });

    if(topicClose) topicClose.addEventListener('click',()=>closeTopicV415(true,true));
    detailPage.querySelectorAll('[data-pain-topic-close-v415]').forEach(button=>button.addEventListener('click',()=>closeTopicV415(true,true)));
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape' && topicModal && !topicModal.hidden) closeTopicV415(true,true);
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
    const painTopicHashPattern=/^#agri-(ayak-ayak-bilegi|el-bilegi|boyun-ense|omuz-kol|kalca-diz|bel-sirt|cene-bas|diz|kalca|bel|sirt|dirsek|omuz)-([a-z0-9-]+)$/;
    const match=location.hash.match(painHashPattern);
    const topicMatch=location.hash.match(painTopicHashPattern);
    if(topicMatch && data[topicMatch[1]]) {
      const card=cards.find(c=>c.dataset.pain===topicMatch[1]) || null;
      openDetail(topicMatch[1],card,false);
      const item=data[topicMatch[1]];
      const collections=[['genel',item.summaryCards||[]],['degerlendirme',item.evalCards||[]]];
      for(const [section,items] of collections) {
        const index=items.findIndex(entry=>slugifyTopicV415(entry[0])===topicMatch[2]);
        if(index>=0) { openTopicV415(section,index,null,false); break; }
      }
    }
    else if(match && data[match[1]]) {
      const card=cards.find(c=>c.dataset.pain===match[1]) || null;
      openDetail(match[1],card,false);
    }

    window.addEventListener('popstate',()=>{
      const topicState=location.hash.match(painTopicHashPattern);
      if(topicState && data[topicState[1]]) {
        const card=cards.find(c=>c.dataset.pain===topicState[1]) || null;
        openDetail(topicState[1],card,false);
        const item=data[topicState[1]];
        const collections=[['genel',item.summaryCards||[]],['degerlendirme',item.evalCards||[]]];
        for(const [section,items] of collections) {
          const index=items.findIndex(entry=>slugifyTopicV415(entry[0])===topicState[2]);
          if(index>=0) { openTopicV415(section,index,null,false); break; }
        }
        return;
      }
      const m=location.hash.match(painHashPattern);
      if(m && data[m[1]]) {
        const card=cards.find(c=>c.dataset.pain===m[1]) || null;
        openDetail(m[1],card,false);
      }
      else if(location.hash==='#agri' && document.body.classList.contains('pain-full-detail-open-v215')) closeDetail(false);
    });
})();


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

            const openHerbSection = (source) => {
                window.setTimeout(() => {
                    if (typeof window.openPhytoTreatmentHerbHubV352 === 'function') {
                        window.openPhytoTreatmentHerbHubV352(source, key);
                    }
                }, 90);
            };

            if (key === 'as') {
                if (typeof window.openAnkilozanPageV87 === 'function') window.openAnkilozanPageV87();
                else document.querySelector('.ankilozan-card-link-v87')?.click();
                openHerbSection('as');
                return;
            }
            if (key === 'ra') {
                if (typeof window.openRomatoidPageV198 === 'function') window.openRomatoidPageV198(true);
                else document.querySelector('.romatoid-card-link-v198')?.click();
                openHerbSection('ra');
                return;
            }
            openDisease(key, true);
            openHerbSection('condition');
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
    const treatmentTopNavV308 = document.querySelector('.treatment-detail-nav-modern-v160');

    /* V308: Üst site menüsü Osteopati özel sekmelerinde scroll ile birlikte yukarı çıkar;
       artık viewport'a yapışıp kullanıcıyla birlikte gelmez. */
    function syncOsteoTopNavV308() {
        if (!treatmentTopNavV308) return;
        const maxShift = Math.max(86, treatmentTopNavV308.offsetHeight + 28);
        const shift = -Math.min(specialView.scrollTop, maxShift);
        treatmentTopNavV308.style.setProperty('--osteo-nav-shift-v308', `${shift}px`);
    }

    specialView.addEventListener('scroll', syncOsteoTopNavV308, { passive: true });

    const statusTitle = document.getElementById('osteoTabStatusTitleV258');
    const statusText = document.getElementById('osteoTabStatusTextV258');
    const specialTitle = document.getElementById('osteoSpecialTitleV259');
    const specialText = document.getElementById('osteoSpecialTextV259');
    const specialIndex = document.getElementById('osteoSpecialIndexV259');

    if (!tabs.length || !panels.length) return;

    const tabMeta = {
        manual: { title: 'Manuel Uygulamalar', text: 'Osteopati ve eklem hareketliliğine yönelik içerikler.', index: '01' },
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

    function openSpecialView(key, options = {}) {
        activateTab(key || 'manual');

        /* V304: bağımsız Osteopati ekranı gerçek viewport üzerinde açılsın. */
        document.body.classList.add('treatment-detail-open-v71');
        specialView.hidden = false;
        specialView.setAttribute('aria-hidden', 'false');
        page.classList.add('is-special-view-open-v259');
        document.body.classList.add('osteo-standalone-open-v260');

        const activeKeyV368 = key || 'manual';
        const routeHashV368 = '#osteopati-' + activeKeyV368;
        if (options.pushHistory !== false && location.hash !== routeHashV368) {
            history.pushState(
                { page: 'osteopati-special', tab: activeKeyV368 },
                '',
                routeHashV368
            );
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        specialView.scrollTop = 0;
        if (treatmentTopNavV308) treatmentTopNavV308.style.setProperty('--osteo-nav-shift-v308', '0px');

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
        if (treatmentTopNavV308) treatmentTopNavV308.style.removeProperty('--osteo-nav-shift-v308');
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

        if (options.returnFocus !== false) {
            const firstLauncher = page.querySelector('[data-osteo-tab-target="manual"]');
            if (firstLauncher) firstLauncher.focus({ preventScroll: true });
        }
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            const keyV368 = tab.dataset.osteoTab;
            activateTab(keyV368);
            const hashV368 = '#osteopati-' + keyV368;
            if (location.hash !== hashV368) {
                history.pushState(
                    { page: 'osteopati-special', tab: keyV368 },
                    '',
                    hashV368
                );
            }
        });
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

    if (backButton) backButton.addEventListener('click', () => {
        if (/^#osteopati-(manual|exercise|sports|pain|faq|articles)$/.test(location.hash)) {
            history.back();
        } else {
            closeSpecialView();
        }
    });

    // ESC ile de bağımsız özel sayfadan Osteopati ana vitrininə dön.
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && document.body.classList.contains('osteo-standalone-open-v260')) {
            if (/^#osteopati-(manual|exercise|sports|pain|faq|articles)$/.test(location.hash)) {
                history.back();
            } else {
                closeSpecialView();
            }
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

    // V368: Geri/ileri ile Osteopati alt ekranları arasında gerçek geçmiş gezinmesi.
    window.addEventListener('popstate', () => {
        const matchV368 = location.hash.match(/^#osteopati-(manual|exercise|sports|pain|faq|articles)$/);

        if (matchV368) {
            openSpecialView(matchV368[1], { pushHistory: false });
            return;
        }

        if (location.hash === '#osteopati' && document.body.classList.contains('osteo-standalone-open-v260')) {
            closeSpecialView({ returnFocus: false });
        }
    });

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

        specialTitle.textContent = `Ankilozan Spondilit - ${data.title}`;
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
        specialTitle.textContent = `${currentTitle} - ${data.title}`;
        specialDesc.textContent = data.desc;
        specialIndex.textContent = data.index;
        if (backButton) {
            const backLabel = `${currentTitle} ana bölümüne dön`;
            backButton.setAttribute('aria-label', backLabel);
            backButton.setAttribute('title', backLabel);
        }
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


// =========================================================
// V292 - TEDAVİ UYGULAMASI AÇILIRKEN HASTALIK SAYFALARINI KAPAT
// =========================================================
(function () {
    function closeDiseaseLayersV292() {
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
            if (!el) return;
            el.setAttribute('aria-hidden', 'true');
        });
    }

    document.addEventListener('click', function (event) {
        const treatmentTrigger = event.target.closest('[data-treatment-detail], [data-treatment-top]');
        if (!treatmentTrigger) return;
        closeDiseaseLayersV292();
    }, true);

    window.closeDiseaseLayersV292 = closeDiseaseLayersV292;
})();


// =========================================================
// V293 - CİHAZ UYGULAMALARI ANA SAYFA DAVRANIŞI
// =========================================================
(function () {
    const explore = document.getElementById('deviceAppsExploreV293');
    const grid = document.getElementById('deviceAppsGridV293');
    if (explore && grid) {
        explore.addEventListener('click', () => {
            grid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    // Eski URL'ler yeni cihaz uygulamaları sayfasına yönlensin.
    const oldHash = location.hash;
    if (oldHash === '#robotik-lazer' || oldHash === '#diger-cihazlar') {
        window.setTimeout(() => {
            const trigger = document.querySelector('[data-treatment-detail="cihaz-uygulamalari"]');
            if (trigger) trigger.click();
        }, 40);
    }
})();



// =========================================================
// V316 - PERSONELLER SEKME / ANİMASYONLU KARTLAR
// =========================================================
(function () {
    const grid = document.getElementById('aboutTeamGridV316');
    if (!grid) return;

    const PERSONEL_IMG_01_V317 = 'data:image/jpeg;base64,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';
    const PERSONEL_IMG_02_V317 = 'data:image/jpeg;base64,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';

    const staff = [
        {name:'Dr. Ceyhun Nuri', role:'Klinik Kurucu', type:'Hekim', img:PERSONEL_IMG_01_V317, desc:'Osteopati, fitoterapi ve bütüncül değerlendirme yaklaşımıyla klinik planlamaya liderlik eder.', tags:['Osteopati','Fitoterapi','Muayene'], extra:'Tanı, değerlendirme ve kişiye özel tedavi planlaması süreçlerinin merkezinde yer alır.'},
        {name:'Dr. Mustafa İkizek', role:'Hekim', type:'Hekim', img:PERSONEL_IMG_02_V317, desc:'Klinik değerlendirme, hasta takibi ve hekimlik bakış açısını destekleyen ekip yapılanmasının önemli yüzlerinden biridir.', tags:['Değerlendirme','Takip','Klinik'], extra:'Klinik akışta danışan yönetimi ve hekimlik koordinasyonu tarafını güçlendiren örnek profil kartıdır.'},
        {name:'Klinik Koordinasyon', role:'Operasyon Sorumlusu', type:'Koordinasyon', img:null, desc:'Randevu akışı, danışan yönlendirmesi ve günlük işleyişin düzenli ilerlemesine destek olur.', tags:['Planlama','Akış','Koordinasyon'], extra:'Yoğun günlerde ekibin eşgüdümünü sağlar ve hastanın doğru alana yönlendirilmesine yardımcı olur.'},
        {name:'Danışan Karşılama', role:'Resepsiyon', type:'Karşılama', img:null, desc:'İlk temas noktası olarak danışan kabulü, bilgilendirme ve yönlendirme süreçlerini yürütür.', tags:['Karşılama','Bilgi','Yönlendirme'], extra:'Hasta deneyiminin sıcak ve güven verici başlaması için ön yüz görevini üstlenir.'},
        {name:'Muayene Destek', role:'Klinik Asistan', type:'Destek', img:null, desc:'Muayene öncesi hazırlık, oda düzeni ve danışan bilgilendirme süreçlerine katkı sağlar.', tags:['Hazırlık','Destek','Düzen'], extra:'Hekim görüşmesi öncesinde klinik düzenin sorunsuz ilerlemesine yardımcı olur.'},
        {name:'Osteopati Destek', role:'Uygulama Asistanı', type:'Uygulama', img:null, desc:'Osteopati ve manuel uygulama akışında ekip düzenine ve hasta konforuna destek sunar.', tags:['Osteopati','Mobilite','Konfor'], extra:'Tedavi odasının akışını destekleyen ve süreç konforunu artıran örnek karttır.'},
        {name:'GETAT Uygulama', role:'Uygulama Destek', type:'GETAT', img:null, desc:'Tamamlayıcı uygulamalar sırasında düzen, hazırlık ve takip disiplinini destekler.', tags:['GETAT','Takip','Hazırlık'], extra:'Ozon, hacamat veya benzer destek uygulamaları öncesinde operasyonel destek sunar.'},
        {name:'Fitoterapi Danışma', role:'Bilgilendirme', type:'Danışma', img:null, desc:'Bitkisel destek yaklaşımına yönelik süreçlerin organizasyonu ve bilgilendirme akışında yer alır.', tags:['Fitoterapi','İçerik','Danışma'], extra:'Hasta eğitim materyallerinin doğru iletilmesi ve süreç takibi için destek sağlar.'},
        {name:'Damar Yolu Destek', role:'IV Uygulama Koordinasyon', type:'IV', img:null, desc:'Damar yolu destek süreçlerinde hazırlık ve operasyon düzenini destekleyen örnek profil.', tags:['IV','Hazırlık','Kontrol'], extra:'Uygulama alanı düzeni, hasta hazırlığı ve ekip içi koordinasyon tarafını temsil eder.'},
        {name:'Sosyal Medya & İçerik', role:'Dijital Destek', type:'Medya', img:null, desc:'Klinik bilgilendirmeleri, içerik akışı ve dijital görünürlük başlıklarına destek olur.', tags:['İçerik','Medya','Tanıtım'], extra:'Hastaların kliniği daha iyi tanımasını sağlayan dijital yüzü güçlendirir.'},
        {name:'Randevu Takip', role:'Danışan İletişimi', type:'İletişim', img:null, desc:'Randevu hatırlatma, ilk bilgi paylaşımı ve takip planlamasına yardımcı olur.', tags:['Randevu','Takip','İletişim'], extra:'Danışan ile klinik arasındaki düzenli iletişimi destekleyen başlangıç kartıdır.'},
        {name:'Hasta Deneyimi', role:'Geri Bildirim', type:'Destek', img:null, desc:'Danışan memnuniyeti, geri bildirim ve süreç iyileştirme alanında örnek temsil kartı.', tags:['Memnuniyet','Geri Bildirim','Süreç'], extra:'Hizmet kalitesini yükseltmeye yönelik geri bildirim akışlarını destekler.'},
        {name:'Klinik Düzen', role:'Operasyon Destek', type:'Operasyon', img:null, desc:'İç alanların düzenli, temiz ve akışa uygun kalmasını sağlayan destek alanı.', tags:['Düzen','Operasyon','Akış'], extra:'Klinik deneyimin profesyonel ve konforlu görünümünü destekleyen arka plan rolüdür.'},
        {name:'Uygulama Sonrası Takip', role:'Hasta Bilgilendirme', type:'Takip', img:null, desc:'Uygulama sonrasında dikkat edilmesi gerekenlerin aktarımı ve yönlendirme desteği sunar.', tags:['Takip','Bilgilendirme','Destek'], extra:'Danışanların süreç sonrası yönlendirmeleri daha net takip edebilmesi için örnek karttır.'}
    ];

    grid.innerHTML = staff.map((item, idx) => `
        <article class="team-card-v316" tabindex="0" role="button" aria-expanded="false" aria-label="${item.name} detaylarını göster">
            <div class="team-card-media-v316 ${item.img ? 'has-photo-v317' : 'is-placeholder-v317'}">
                ${item.img
                    ? `<img src="${item.img}" alt="${item.name}">`
                    : `<div class="team-card-placeholder-v317" aria-hidden="true"><span>${String(idx + 1).padStart(2,'0')}</span><strong>PERSONEL</strong><small>Fotoğraf eklenecek</small></div>`}
                <span class="team-card-badge-v316">${item.type}</span>
            </div>
            <div class="team-card-body-v316">
                <span class="team-card-kicker-v316">${String(idx + 1).padStart(2,'0')} · ${item.role}</span>
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <div class="team-card-tags-v316">${item.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
                <div class="team-card-hint-v316"><span>Detayı görmek için tıklayın</span><i>⌄</i></div>
                <div class="team-card-extra-v316"><div>${item.extra}</div></div>
            </div>
        </article>
    `).join('');

    const cards = Array.from(grid.querySelectorAll('.team-card-v316'));
    const toggleCard = (card) => {
        const shouldOpen = !card.classList.contains('is-active');
        cards.forEach(c => {
            c.classList.remove('is-active');
            c.setAttribute('aria-expanded','false');
        });
        if (shouldOpen) {
            card.classList.add('is-active');
            card.setAttribute('aria-expanded','true');
        }
    };

    cards.forEach(card => {
        card.addEventListener('click', () => toggleCard(card));
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleCard(card);
            }
        });
    });
})();


// =========================================================
// V321 - PERSONEL FOTOĞRAFLARI / PARALLAX + REVEAL + CLICK POP
// =========================================================
(function () {
    const panel = document.getElementById('aboutPanelTeamV316');
    if (!panel) return;

    const setupAnimations = () => {
        const cards = Array.from(panel.querySelectorAll('.team-card-v316'));
        if (!cards.length) return false;

        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        cards.forEach((card, index) => {
            card.style.setProperty('--revealDelay', `${Math.min(index * 55, 420)}ms`);

            const media = card.querySelector('.team-card-media-v316.has-photo-v317');
            if (!media || reduceMotion) return;

            media.addEventListener('pointermove', (event) => {
                const rect = media.getBoundingClientRect();
                const px = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
                const py = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
                const tiltY = (px - .5) * 6;
                const tiltX = (.5 - py) * 5;
                const photoX = (px - .5) * -7;
                const photoY = (py - .5) * -5;

                card.style.setProperty('--tiltX', `${tiltX.toFixed(2)}deg`);
                card.style.setProperty('--tiltY', `${tiltY.toFixed(2)}deg`);
                card.style.setProperty('--photoX', `${photoX.toFixed(2)}px`);
                card.style.setProperty('--photoY', `${photoY.toFixed(2)}px`);
                card.classList.add('is-photo-hover-v321');
            });

            media.addEventListener('pointerleave', () => {
                card.style.setProperty('--tiltX', '0deg');
                card.style.setProperty('--tiltY', '0deg');
                card.style.setProperty('--photoX', '0px');
                card.style.setProperty('--photoY', '0px');
                card.classList.remove('is-photo-hover-v321');
            });

            card.addEventListener('click', () => {
                card.classList.remove('photo-pop-v321');
                void card.offsetWidth;
                card.classList.add('photo-pop-v321');
                window.setTimeout(() => card.classList.remove('photo-pop-v321'), 680);
            });
        });

        if (reduceMotion) {
            cards.forEach(card => card.classList.add('is-revealed-v321'));
            return true;
        }

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-revealed-v321');
                    obs.unobserve(entry.target);
                });
            }, { threshold: .12, rootMargin: '0px 0px -4% 0px' });
            cards.forEach(card => observer.observe(card));
        } else {
            cards.forEach(card => card.classList.add('is-revealed-v321'));
        }
        return true;
    };

    if (!setupAnimations()) {
        const watcher = new MutationObserver(() => {
            if (setupAnimations()) watcher.disconnect();
        });
        watcher.observe(panel, { childList: true, subtree: true });
    }
})();

// =========================================================
// V327 - GENEL SAĞLIK / TEDAVİ UYGULAMALARI ÜST DROPDOWN
// =========================================================
(function () {
    const menu = document.getElementById('healthTreatmentMenuV327');
    const button = document.getElementById('healthTreatmentMenuButtonV327');
    const panel = document.getElementById('healthTreatmentMenuPanelV327');
    if (!menu || !button || !panel) return;

    const closeMenu = () => {
        menu.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
        panel.setAttribute('aria-hidden', 'true');
    };

    button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const willOpen = !menu.classList.contains('open');
        document.querySelectorAll('.health-treatment-menu-v327.open').forEach(item => item.classList.remove('open'));
        if (willOpen) {
            menu.classList.add('open');
            button.setAttribute('aria-expanded', 'true');
            panel.setAttribute('aria-hidden', 'false');
        } else {
            closeMenu();
        }
    });

    panel.addEventListener('click', (event) => {
        if (event.target.closest('[data-treatment-detail]')) closeMenu();
    });

    document.addEventListener('click', (event) => {
        if (!menu.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });
})();



// =========================================================
// V331 - GELENEKSEL TEDAVİ / GERÇEK ÖZEL ALT SAYFA MİMARİSİ
// Hero içindeki 3 buton aşağıdaki içerikleri açmaz; seçilen konu
// ayrı bir özel görünüm olarak açılır. Alt sayfadan uygulamaya geri dönülür.
// =========================================================
(function () {
    const treatmentView = document.querySelector('[data-treatment-detail-view="geleneksel-tedavi"]');
    if (!treatmentView) return;

    const detailViews = Array.from(treatmentView.querySelectorAll('[data-traditional-detail]'));

    const applicationLabels = {
        akupunktur: 'Akupunktur',
        suluk: 'Sülük Uygulaması',
        hacamat: 'Hacamat'
    };

    const sectionDescriptions = {
        degerlendirme: 'Uygulamanın hangi başlıklarda değerlendirilebileceğini ayrı bir içerik alanında inceleyin.',
        dikkat: 'Uygulama öncesinde göz önünde bulundurulması gereken güvenlik ve uygunluk başlıklarını inceleyin.',
        sss: 'Uygulama hakkında sık sorulan soruları ve kısa yanıtları ayrı bir içerik alanında inceleyin.'
    };

    function getTopicKey(tabName) {
        if (tabName.endsWith('-dikkat')) return 'dikkat';
        if (tabName.endsWith('-sss')) return 'sss';
        return 'degerlendirme';
    }

    function setPanels(detailView, tabName) {
        const buttons = Array.from(detailView.querySelectorAll('[data-traditional-tab]'));
        const panels = Array.from(detailView.querySelectorAll('[data-traditional-panel]'));
        const targetPanel = panels.find(panel => panel.dataset.traditionalPanel === tabName);
        if (!targetPanel) return null;

        buttons.forEach(button => {
            const active = button.dataset.traditionalTab === tabName;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        panels.forEach(panel => {
            const active = panel === targetPanel;
            panel.classList.toggle('is-active', active);
            panel.setAttribute('aria-hidden', active ? 'false' : 'true');
        });
        return targetPanel;
    }

    function closeSubPage(detailView, shouldScroll) {
        if (!detailView) return;
        detailView.classList.remove('is-traditional-subpage-open-v331');
        const hero = detailView.querySelector('.traditional-detail-hero-v330');
        const stage = detailView.querySelector('.traditional-tabs-stage-v330');
        if (hero) hero.setAttribute('aria-hidden', 'false');
        if (stage) stage.setAttribute('aria-hidden', 'true');

        detailView.querySelectorAll('[data-traditional-panel]').forEach(panel => {
            panel.classList.remove('is-active');
            panel.setAttribute('aria-hidden', 'true');
        });
        detailView.querySelectorAll('[data-traditional-tab]').forEach(button => {
            button.classList.remove('is-active');
            button.setAttribute('aria-selected', 'false');
        });

        if (shouldScroll !== false) {
            window.setTimeout(() => detailView.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
        }
    }

    function openSubPage(detailView, tabName) {
        if (!detailView || !tabName) return;
        const targetPanel = setPanels(detailView, tabName);
        if (!targetPanel) return;

        detailView.classList.add('is-traditional-subpage-open-v331');
        const hero = detailView.querySelector('.traditional-detail-hero-v330');
        const stage = detailView.querySelector('.traditional-tabs-stage-v330');
        if (hero) hero.setAttribute('aria-hidden', 'true');
        if (stage) stage.setAttribute('aria-hidden', 'false');

        window.setTimeout(() => detailView.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
    }

    function buildSubPageHeader(detailView, panel, applicationName, buttons) {
        if (panel.querySelector('.traditional-subpage-header-v331')) return;
        const panelName = panel.dataset.traditionalPanel || '';
        const sourceButton = buttons.find(button => button.dataset.traditionalTab === panelName);
        const title = sourceButton ? sourceButton.querySelector('b')?.textContent.trim() : 'Özel İçerik';
        const topicKey = getTopicKey(panelName);

        const header = document.createElement('header');
        header.className = 'traditional-subpage-header-v331';
        header.innerHTML = `
            <div class="traditional-subpage-top-v331">
                <button type="button" class="traditional-subpage-back-v331" data-traditional-sub-back>
                    <span>←</span><b>${applicationName}</b>
                </button>
                <span class="traditional-subpage-eyebrow-v331">GELENEKSEL & TAMAMLAYICI TIP · ÖZEL İÇERİK</span>
            </div>
            <div class="traditional-subpage-title-row-v331">
                <div>
                    <h1>${title}</h1>
                    <p>${sectionDescriptions[topicKey]}</p>
                </div>
                <div class="traditional-subpage-index-v331">${sourceButton ? sourceButton.querySelector('span')?.textContent.trim() : '01'}<small>/03</small></div>
            </div>
            <nav class="traditional-subpage-switcher-v331" aria-label="${applicationName} özel içerik geçişleri"></nav>
        `;

        const switcher = header.querySelector('.traditional-subpage-switcher-v331');
        buttons.forEach(button => {
            const clone = document.createElement('button');
            clone.type = 'button';
            clone.dataset.traditionalSubSwitch = button.dataset.traditionalTab;
            clone.innerHTML = `<span>${button.querySelector('span')?.textContent.trim() || ''}</span><b>${button.querySelector('b')?.textContent.trim() || ''}</b>`;
            if (button.dataset.traditionalTab === panelName) clone.classList.add('is-active');
            switcher.appendChild(clone);
        });

        panel.prepend(header);
    }

    detailViews.forEach(detailView => {
        const appKey = detailView.dataset.traditionalDetail || '';
        const applicationName = applicationLabels[appKey] || 'Geleneksel Tedavi';
        const heroButtons = Array.from(detailView.querySelectorAll('.traditional-hero-tabs-v330 [data-traditional-tab]'));
        const panels = Array.from(detailView.querySelectorAll('[data-traditional-panel]'));
        const stage = detailView.querySelector('.traditional-tabs-stage-v330');

        if (stage) stage.setAttribute('aria-hidden', 'true');
        panels.forEach(panel => {
            panel.classList.remove('is-active');
            panel.setAttribute('aria-hidden', 'true');
            buildSubPageHeader(detailView, panel, applicationName, heroButtons);
        });
        heroButtons.forEach(button => {
            button.classList.remove('is-active');
            button.setAttribute('aria-selected', 'false');
            button.addEventListener('click', event => {
                event.preventDefault();
                openSubPage(detailView, button.dataset.traditionalTab);
            });
        });

        detailView.addEventListener('click', event => {
            const back = event.target.closest('[data-traditional-sub-back]');
            if (back) {
                event.preventDefault();
                closeSubPage(detailView, true);
                return;
            }
            const switchButton = event.target.closest('[data-traditional-sub-switch]');
            if (switchButton) {
                event.preventDefault();
                openSubPage(detailView, switchButton.dataset.traditionalSubSwitch);
            }
        });
    });

    // Uygulama kartından yeni detay sayfasına her girişte yalnızca giriş/hero görünür.
    treatmentView.querySelectorAll('[data-traditional-open]').forEach(opener => {
        opener.addEventListener('click', () => {
            const name = opener.dataset.traditionalOpen;
            const detailView = detailViews.find(view => view.dataset.traditionalDetail === name);
            if (detailView) window.setTimeout(() => closeSubPage(detailView, false), 20);
        });
    });

    // Ana geleneksel tedaviye dönüşte alt sayfa durumlarını temizle.
    treatmentView.querySelectorAll('[data-traditional-back]').forEach(back => {
        back.addEventListener('click', () => {
            detailViews.forEach(view => closeSubPage(view, false));
        });
    });
})();


// =========================================================
// V332 - SİTE İLE İLGİLİ ÖNERİLER
// =========================================================
(function(){
    const page=document.getElementById('siteFeedbackPageV332');
    const openButtons=document.querySelectorAll('.site-feedback-open-v332');
    const home=document.getElementById('siteFeedbackHomeV332');
    const brand=document.getElementById('siteFeedbackBrandV332');
    const form=document.getElementById('siteFeedbackFormV332');
    const name=document.getElementById('siteFeedbackNameV332');
    const category=document.getElementById('siteFeedbackCategoryV332');
    const message=document.getElementById('siteFeedbackMessageV332');
    const count=document.getElementById('siteFeedbackCountV332');
    const emailBtn=document.getElementById('siteFeedbackEmailV332');
    if(!page||!openButtons.length)return;

    function closeInfoMenus(){
        document.querySelectorAll('.info-menu-v54').forEach(menu=>{
            menu.classList.remove('open','kvkk-open');
            const main=menu.querySelector('.info-menu-button-v54');
            const panel=menu.querySelector('.info-menu-panel-v54');
            const kvkk=menu.querySelector('.info-kvkk-button-v54');
            const sub=menu.querySelector('.info-kvkk-submenu-v54');
            if(main)main.setAttribute('aria-expanded','false');
            if(panel)panel.setAttribute('aria-hidden','true');
            if(kvkk)kvkk.setAttribute('aria-expanded','false');
            if(sub)sub.setAttribute('aria-hidden','true');
        });
    }

    function hideOtherPages(){
        document.body.classList.remove('treatment-page-open','treatment-nav-scrolled','pain-page-open','pain-nav-scrolled','about-page-open','about-nav-scrolled','media-page-open','media-nav-scrolled','legal-page-open-v56','treatment-detail-open-v71','treatment-detail-nav-scrolled-v71','ankilozan-page-open-v87','general-health-detail-open-v75','general-featured-open-v124','info-guide-open-v143');
        ['tedaviAlanlariPage','agriPage','hakkimdaPage','medyaPage','legalPageV56','treatmentDetailPageV71','ankilozanFaqSectionV85','romatoidFaqSectionV198','generalHealthDetailPageV75','generalFeaturedPageV124','infoGuidePageV143','deviceDetailPageV157','conditionDiseasePageV246'].forEach(id=>{const el=document.getElementById(id);if(el)el.setAttribute('aria-hidden','true')});
    }

    function openFeedback(){
        hideOtherPages(); closeInfoMenus();
        document.body.classList.add('site-feedback-open-v332');
        page.setAttribute('aria-hidden','false');
        history.pushState({page:'site-feedback'},'','#site-onerileri');
        window.scrollTo({top:0,behavior:'smooth'});
    }
    function closeFeedback(){
        document.body.classList.remove('site-feedback-open-v332');
        page.setAttribute('aria-hidden','true');
        history.pushState({page:'home'},'','#anasayfa');
        window.scrollTo({top:0,behavior:'smooth'});
    }
    openButtons.forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();openFeedback()}));
    [home,brand].forEach(btn=>{if(btn)btn.addEventListener('click',e=>{e.preventDefault();closeFeedback()})});

    function buildText(){
        const n=(name&&name.value.trim())||'Belirtilmedi';
        const c=(category&&category.value)||'Diğer';
        const m=(message&&message.value.trim())||'';
        return `Site ile ilgili öneri\n\nİsim: ${n}\nKonu: ${c}\n\nÖneri:\n${m}`;
    }
    if(message&&count){
        const sync=()=>count.textContent=String(message.value.length);
        message.addEventListener('input',sync);sync();
    }
    if(form){
        form.addEventListener('submit',e=>{
            e.preventDefault();
            if(!message||!message.value.trim()){message&&message.focus();return;}
            const url='https://wa.me/905349309880?text='+encodeURIComponent(buildText());
            window.open(url,'_blank','noopener,noreferrer');
        });
    }
    if(emailBtn){
        emailBtn.addEventListener('click',()=>{
            if(!message||!message.value.trim()){message&&message.focus();return;}
            const subject='Web Sitesi Görüş ve Önerisi';
            window.location.href='mailto:info@doktorceyhunnuri.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(buildText());
        });
    }
    if(location.hash==='#site-onerileri')openFeedback();
})();


// =========================================================
// V334 - DAMAR YOLU SERUMLARI: TEK DETAY + DİĞER SERUMLAR
// =========================================================
(function () {
    const vascularView = document.querySelector('[data-treatment-detail-view="damar-yolu"]');
    if (!vascularView) return;

    const serumMap = [
        {
            key: 'ozone',
            label: 'Ozonlu Serum',
            short: 'Ozon',
            openId: 'openOzoneDetailV239',
            closeId: 'closeOzoneDetailV239',
            detailId: 'ozoneDetailV239'
        },
        {
            key: 'vitamin-c',
            label: 'C Vitamini Serumu',
            short: 'C Vitamini',
            openId: 'openVitaminCDetailV234',
            closeId: 'closeVitaminCDetailV235',
            detailId: 'vitaminCDetailV234'
        },
        {
            key: 'karnitin',
            label: 'L-Karnitin Serumu',
            short: 'L-Karnitin',
            openId: 'openKarnitinDetailV243',
            closeId: 'closeKarnitinDetailV243',
            detailId: 'karnitinDetailV243'
        },
        {
            key: 'selenium',
            label: 'Selenyum Serumu',
            short: 'Selenyum',
            openId: 'openSeleniumDetailV244',
            closeId: 'closeSeleniumDetailV244',
            detailId: 'seleniumDetailV244'
        },
        {
            key: 'nad',
            label: 'IV NAD+ Serumu',
            short: 'NAD+',
            openId: 'openNadDetailV242',
            closeId: 'closeNadDetailV242',
            detailId: 'nadDetailV242'
        },
        {
            key: 'glutathione',
            label: 'Glutatyon Serumu',
            short: 'Glutatyon',
            openId: 'openGlutathioneDetailV241',
            closeId: 'closeGlutathioneDetailV241',
            detailId: 'glutathioneDetailV241'
        },
        {
            key: 'major-ozone',
            label: 'Majör Ozon',
            short: 'Majör Ozon',
            openId: 'openMajorOzoneDetailV240',
            closeId: 'closeMajorOzoneDetailV240',
            detailId: 'majorOzoneDetailV240'
        }
    ];

    const oldStateClasses = [
        'vitamin-c-tab-open-v235',
        'ozone-tab-open-v239',
        'major-ozone-tab-open-v240',
        'glutathione-tab-open-v241',
        'nad-tab-open-v242',
        'karnitin-tab-open-v243',
        'selenium-tab-open-v244'
    ];

    function hideAllDetails() {
        serumMap.forEach((item) => {
            const section = document.getElementById(item.detailId);
            if (section) {
                section.setAttribute('aria-hidden', 'true');
            }
        });
    }

    function enforceSingleDetail(key) {
        const current = serumMap.find((item) => item.key === key);
        if (!current) return;

        oldStateClasses.forEach((className) => vascularView.classList.remove(className));
        hideAllDetails();

        vascularView.classList.add('serum-focus-v334');
        vascularView.setAttribute('data-active-serum-v334', key);

        const section = document.getElementById(current.detailId);
        if (section) {
            section.setAttribute('aria-hidden', 'false');
        }
    }

    function exitSingleDetail() {
        vascularView.classList.remove('serum-focus-v334');
        vascularView.removeAttribute('data-active-serum-v334');
        hideAllDetails();
    }

    function openSerum(key) {
        const item = serumMap.find((serum) => serum.key === key);
        if (!item) return;

        enforceSingleDetail(key);

        // Eski mevcut açma fonksiyonları varsa onların içerik hazırlama davranışını da koru.
        const openButton = document.getElementById(item.openId);
        if (openButton && !openButton.matches(':active')) {
            // Programatik geçişlerde eski click eventleri de çalışsın.
            openButton.click();
        }

        // Eski event zincirlerinden sonra tek-detay durumunu tekrar garanti et.
        window.requestAnimationFrame(() => {
            enforceSingleDetail(key);

            const top = vascularView.getBoundingClientRect().top + window.scrollY - 10;
            window.scrollTo({
                top: Math.max(0, top),
                behavior: 'smooth'
            });
        });
    }

    function buildOtherSerums(currentKey) {
        const currentSection = document.getElementById(
            serumMap.find((item) => item.key === currentKey)?.detailId || ''
        );
        if (!currentSection) return;

        const editorial = currentSection.querySelector('.vitamin-c-editorial-v234');
        if (!editorial || editorial.querySelector('.other-serums-v334')) return;

        const others = serumMap.filter((item) => item.key !== currentKey);

        const wrapper = document.createElement('section');
        wrapper.className = 'other-serums-v334';
        wrapper.setAttribute('aria-label', 'Diğer damar yolu serumları');

        wrapper.innerHTML = `
            <div class="other-serums-head-v334">
                <div>
                    <span class="other-serums-kicker-v334">DİĞER DAMAR YOLU UYGULAMALARI</span>
                    <h3>Diğer Serumları İnceleyin</h3>
                </div>
                <p>Başka bir serumun bilgi sayfasına geçmek için seçim yapabilirsiniz.</p>
            </div>
            <div class="other-serums-grid-v334">
                ${others.map((item, index) => `
                    <button
                        type="button"
                        class="other-serum-button-v334"
                        data-serum-switch-v334="${item.key}"
                        aria-label="${item.label} bilgi sayfasını aç"
                    >
                        <span class="other-serum-index-v334">${String(index + 1).padStart(2, '0')}</span>
                        <span class="other-serum-copy-v334">
                            <strong>${item.short}</strong>
                            <span>Bilgi sayfasına geç →</span>
                        </span>
                    </button>
                `).join('')}
            </div>
        `;

        editorial.appendChild(wrapper);
    }

    // Her serumun yazılarının altına diğer serum geçişlerini ekle.
    serumMap.forEach((item) => buildOtherSerums(item.key));

    // Ana karttan "Bilgi Edin" tıklandığında yalnızca seçilen serum açık kalsın.
    serumMap.forEach((item) => {
        const openButton = document.getElementById(item.openId);
        if (openButton) {
            openButton.addEventListener('click', () => {
                window.requestAnimationFrame(() => enforceSingleDetail(item.key));
            });
        }

        const closeButton = document.getElementById(item.closeId);
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                window.requestAnimationFrame(exitSingleDetail);
            });
        }
    });

    // Alt kısımdaki diğer serum butonları
    vascularView.addEventListener('click', (event) => {
        const switchButton = event.target.closest('[data-serum-switch-v334]');
        if (!switchButton) return;

        const targetKey = switchButton.getAttribute('data-serum-switch-v334');
        const target = serumMap.find((item) => item.key === targetKey);
        if (!target) return;

        // Önce seçilen görünümü garanti et, sonra mevcut açma düğmesinin işlevini çalıştır.
        enforceSingleDetail(targetKey);

        const targetOpenButton = document.getElementById(target.openId);
        if (targetOpenButton) {
            targetOpenButton.click();
        }

        window.requestAnimationFrame(() => {
            enforceSingleDetail(targetKey);
            const top = vascularView.getBoundingClientRect().top + window.scrollY - 10;
            window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        });
    });

    // Hastalık sayfasına veya başka tedavi alanına geçerken serum odak durumunu temizle.
    document.addEventListener('click', (event) => {
        if (
            event.target.closest('[data-treatment-detail]') ||
            event.target.closest('[data-karnitin-disease-link]') ||
            event.target.closest('[data-selenium-disease-link]') ||
            event.target.closest('[data-vitamin-c-disease-link]') ||
            event.target.closest('[data-ozone-disease-link]') ||
            event.target.closest('[data-major-ozone-disease-link]') ||
            event.target.closest('[data-glutathione-disease-link]') ||
            event.target.closest('[data-nad-disease-link]')
        ) {
            const detailLink = event.target.closest('[data-treatment-detail]');
            if (!detailLink || detailLink.getAttribute('data-treatment-detail') !== 'damar-yolu') {
                exitSingleDetail();
            }
        }
    }, true);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && vascularView.classList.contains('serum-focus-v334')) {
            exitSingleDetail();
        }
    });
})();


// =========================================================
// V344 - OZON HIZLI GEÇİŞ / NET BUTON -> NET BAŞLIK
// Anchor/hash yok: her buton sadece data hedefindeki bölüme kaydırır.
// =========================================================
(function () {
    const quickNav = document.querySelector('.ozone-quick-index-v341');
    if (!quickNav) return;

    const buttons = Array.from(quickNav.querySelectorAll('[data-ozone-jump-v344]'));
    if (!buttons.length) return;

    const targets = buttons
        .map((button) => document.getElementById(button.dataset.ozoneJumpV344))
        .filter(Boolean);

    let clickLockUntil = 0;

    function setActive(targetId) {
        buttons.forEach((button) => {
            button.classList.toggle('is-active-v344', button.dataset.ozoneJumpV344 === targetId);
        });
    }

    function getFixedOffset() {
        const nav = document.querySelector('.treatment-detail-nav-modern-v160');
        if (!nav) return 24;
        const rect = nav.getBoundingClientRect();
        return Math.max(24, rect.height + 30);
    }

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.ozoneJumpV344;
            const target = document.getElementById(targetId);
            if (!target) return;

            clickLockUntil = performance.now() + 1000;
            setActive(targetId);

            const top = target.getBoundingClientRect().top + window.scrollY - getFixedOffset();
            window.scrollTo({
                top: Math.max(0, top),
                behavior: 'smooth'
            });
        });
    });

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        if (performance.now() < clickLockUntil) return;

        const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => Math.abs(a.boundingClientRect.top - getFixedOffset()));

        if (visible.length) setActive(visible[0].target.id);
    }, {
        root: null,
        rootMargin: '-12% 0px -70% 0px',
        threshold: 0
    });

    targets.forEach((target) => observer.observe(target));
})();

// =========================================================
// V350 - Fitoterapi bitki sekmeleri + detay modalı + hastalığa göre 6'lı bitki listeleri
// =========================================================
(function () {
    const mainGrid = document.querySelector('.phyto-grid-v127');
    const guideHead = document.querySelector('.phyto-guide-v127 .phyto-guide-head-v127');
    const conditionHerbGrid = document.getElementById('conditionHerbGridV249');
    const conditionHerbTitle = document.getElementById('conditionHerbTitleV249');
    const conditionHerbNote = document.getElementById('conditionHerbNoteV249');
    const conditionHerbKicker = document.getElementById('conditionHerbKickerV249');

    const herbCatalog = {
        zerdecal: {
            name: 'Zerdeçal', subtitle: 'Kurkumin', image: 'phyto-zerdecal-v412.webp',
            intro: 'Kurkumin içeriği sayesinde eklem ve yumuşak doku hassasiyeti yaşayan kişilerde destekleyici olarak en sık konuşulan bitkisel başlıklardan biridir.',
            benefits: ['Sabah sertliği hissini hafifletmeye destek olabilir.', 'Eklem çevresindeki hassasiyet ve hareket tutukluğunu yatıştırmaya yardımcı olabilir.', 'Günlük yüklenme sonrası vücut konforunu destekleyebilir.'],
            tags: ['Eklem rahatlığı','Sabah sertliği','Genel konfor'],
            caution: 'Kan sulandırıcı kullananlarda, safra yolu problemi olanlarda ve yoğun ilaç tedavisi alan kişilerde hekime danışmadan başlanmamalıdır.'
        },
        boswellia: {
            name: 'Boswellia', subtitle: 'Akgünlük', image: 'phyto-boswellia-v412.webp',
            intro: 'Akgünlük, rahat hareket etmeyi güçleştiren kas-eklem yakınmaları ve bağırsak hassasiyetinde destekleyici olarak değerlendirilebilen reçine kökenli bir içeriktir.',
            benefits: ['Uzun süre oturma sonrası oluşan katılık hissine destek olabilir.', 'Yumuşak doku gerginliğini azaltmaya yardımcı olabilir.', 'Vücudun rahatlama hissini destekleyebilir.'],
            tags: ['Kas-eklem rahatlığı','Hareket konforu','Bölgesel hassasiyet'],
            caution: 'Düzenli ilaç kullananlarda ve mide hassasiyeti olan kişilerde ürün tercihi ile doz mutlaka hekimle birlikte planlanmalıdır.'
        },
        omega3: {
            name: 'Omega-3', subtitle: 'Balık Yağı', image: 'phyto-omega3-v412.webp',
            intro: 'Omega-3 yağ asitleri klasik bir bitki olmasa da fitoterapi-beslenme yaklaşımında sık değerlendirilir ve genel toparlanma planının bir parçası olabilir.',
            benefits: ['Sabahları bedende oluşan sertlik hissini azaltmaya destek olabilir.', 'Gün içinde hareket etmeyi zorlaştıran yaygın hassasiyet hissine yardımcı olabilir.', 'Genel enerji dengesi ve toparlanma sürecini destekleyebilir.'],
            tags: ['Toparlanma','Genel rahatlık','Beslenme desteği'],
            caution: 'Kan sulandırıcı kullananlarda ve bazı kronik hastalıklarda uygun formun hekim kontrolünde seçilmesi önemlidir.'
        },
        isirgan: {
            name: 'Isırgan Otu', subtitle: 'Urtica dioica', image: 'phyto-isirgan-v412.webp',
            intro: 'Isırgan otu geleneksel kullanımı yaygın olan bir bitkidir; vücuttaki genel ağırlık, tutulma ve dolaşım rahatlığı başlıklarında gündeme gelebilir.',
            benefits: ['Bacaklarda ağırlık ve dolgunluk hissini hafifletmeye destek olabilir.', 'Gün boyu oluşan yorgunluk hissinde rahatlatıcı bir destek olabilir.', 'Vücudun genel sıvı-dolaşım dengesini desteklemeye yardımcı olabilir.'],
            tags: ['Bacak rahatlığı','Dolaşım desteği','Günlük konfor'],
            caution: 'İdrar söktürücü, tansiyon veya şeker ilacı kullanan kişilerde kontrolsüz kullanılmamalıdır.'
        },
        sarimsak: {
            name: 'Sarımsak', subtitle: 'Allium sativum', image: 'phyto-sarimsak-v412.webp',
            intro: 'Sarımsak, beslenme desteği tarafında hem dolaşım hem de genel canlılık yaklaşımı içinde değerlendirilebilen güçlü bileşenler içerir.',
            benefits: ['Günlük yorgunluk ve bitkinlik hissinde beslenme desteği olabilir.', 'Bedende ağırlık yapan dolaşım yavaşlığı hissini rahatlatmaya yardımcı olabilir.', 'Genel savunma ve toparlanma hissini destekleyebilir.'],
            tags: ['Canlılık','Dolaşım','Savunma desteği'],
            caution: 'Kan sulandırıcı ilaç kullananlar ve mide hassasiyeti olanlar dikkatli olmalıdır.'
        },
        civanpercemi: {
            name: 'Civanperçemi', subtitle: 'Achillea millefolium', image: 'phyto-civanpercemi-v412.webp',
            intro: 'Civanperçemi daha çok genel rahatlama, sindirim dengesi ve yumuşak doku konforu başlıklarında geleneksel olarak kullanılan bitkiler arasındadır.',
            benefits: ['Bedende gerginlik ve kasılma hissini yumuşatmaya destek olabilir.', 'Sindirimle birlikte artan huzursuzluk hissini dengelemeye yardımcı olabilir.', 'Gün sonunda vücudu sakinleştiren bir destek olarak değerlendirilebilir.'],
            tags: ['Rahatlama','Sindirim konforu','Kas gevşemesi'],
            caution: 'Papatyagiller ailesine alerjisi olanlarda dikkatli kullanılmalıdır.'
        },
        zencefil: {
            name: 'Zencefil', subtitle: 'Ginger', image: 'phyto-zencefil-v412.webp',
            intro: 'Zencefil; mide rahatlığı, bulantı eğilimi ve genel bedensel hassasiyet için en çok başvurulan doğal desteklerden biridir.',
            benefits: ['Bulantı ve mide dalgalanmasını azaltmaya destek olabilir.', 'Soğukluk ve dolaşım yavaşlığı hissini hafifletmeye yardımcı olabilir.', 'Baş bölgesindeki huzursuzluk ve hassasiyet dönemlerinde destek olarak düşünülebilir.'],
            tags: ['Bulantı','Mide konforu','Dolaşım'],
            caution: 'Kan sulandırıcı kullananlar ve mide yanması yaşayanlar için uygunluk kişiye göre değerlendirilmelidir.'
        },
        yesilcay: {
            name: 'Yeşil Çay', subtitle: 'EGCG', image: 'phyto-yesil-cay-v412.webp',
            intro: 'Yeşil çay, polifenol zenginliği nedeniyle hem genel canlılık hem de metabolik toparlanma başlıklarında öne çıkar.',
            benefits: ['Zihinsel yorgunluk ve odak dağınıklığına destek olabilir.', 'Gün boyu süren bitkinlik hissini hafifletmeye yardımcı olabilir.', 'Vücudun hafif ve dinç hissetmesine katkı sağlayabilir.'],
            tags: ['Dinçlik','Odak','Antioksidan destek'],
            caution: 'Kafein hassasiyeti, çarpıntı veya uyku problemi olan kişilerde kontrollü kullanılmalıdır.'
        },
        kekik: {
            name: 'Kekik', subtitle: 'Timol & karvakrol', image: 'phyto-kekik-v412.webp',
            intro: 'Kekik; solunum, sindirim ve genel beden rahatlığı başlıklarında kullanılan aromatik bir bitkidir.',
            benefits: ['Sindirim sonrası şişkinlik hissini dengelemeye yardımcı olabilir.', 'Vücutta ağırlık yapan halsizlik dönemlerinde canlandırıcı olabilir.', 'Genel kas rahatlığı ve gevşeme hissini destekleyebilir.'],
            tags: ['Sindirim','Canlandırıcı etki','Kas rahatlığı'],
            caution: 'Yoğun uçucu yağ içeren formları hassas bünyelerde mide ve cilt iritasyonu yapabilir.'
        },
        corekotu: {
            name: 'Çörek Otu', subtitle: 'Nigella sativa', image: 'phyto-corek-otu-v412.webp',
            intro: 'Çörek otu, hem bağırsak hassasiyeti hem de genel bağışıklık-destek yaklaşımında sık konuşulan tohumlardan biridir.',
            benefits: ['Karın bölgesinde hassasiyet ve şişkinlik hissine destek olabilir.', 'Vücudun toparlanma ve dayanıklılık hissini artırmaya yardımcı olabilir.', 'Genel rahatlama ve nefes açma hissi sağlayabilir.'],
            tags: ['Karın konforu','Toparlanma','Genel destek'],
            caution: 'Şeker ve tansiyon ilaçları kullanan kişilerde kontrolsüz başlanmamalıdır.'
        },
        kusburnu: {
            name: 'Kuşburnu', subtitle: 'Rosa canina', image: 'phyto-kusburnu-v412.webp',
            intro: 'Kuşburnu C vitamini ve polifenol içeriği nedeniyle toparlanma ve günlük canlılık yaklaşımında değerlendirilebilir.',
            benefits: ['Hafif yorgunluk ve isteksizlik hissinde destek olabilir.', 'Eklem çevresindeki genel rahatsızlık hissini yatıştırmaya yardımcı olabilir.', 'Mevsim geçişlerinde vücudun direnç hissini destekleyebilir.'],
            tags: ['Canlılık','Eklem konforu','Mevsim desteği'],
            caution: 'Mide hassasiyeti olanlarda uygun form tercih edilmelidir.'
        },
        beyazsogut: {
            name: 'Beyaz Söğüt', subtitle: 'Söğüt kabuğu', image: 'phyto-beyaz-sogut-v412.webp',
            intro: 'Beyaz söğüt kabuğu daha çok baş, boyun ve kas-eklem hattındaki rahatsızlık hissi için geleneksel olarak bilinir.',
            benefits: ['Baş bölgesindeki zonklayıcı rahatsızlık hissini hafifletmeye destek olabilir.', 'Boyun ve omuz hattındaki gerginliği yumuşatmaya yardımcı olabilir.', 'Hareketi zorlaştıran ağrı algısında rahatlatıcı destek sunabilir.'],
            tags: ['Baş-boyun konforu','Kas-eklem','Gerginlik'],
            caution: 'Aspirin duyarlılığı olanlarda, ülser öyküsü bulunanlarda ve kan sulandırıcı kullananlarda hekime danışılmalıdır.'
        },
        papatya: {
            name: 'Papatya', subtitle: 'Matricaria chamomilla', image: 'phyto-papatya-v412.webp',
            intro: 'Papatya sakinleştirici ve yumuşatıcı yapısı nedeniyle hem sindirim hem de gevşeme odaklı desteklerde öne çıkar.',
            benefits: ['Bedensel huzursuzluk ve rahatlayamama hissini azaltmaya destek olabilir.', 'Karın bölgesindeki sıkışma ve hassasiyeti hafifletmeye yardımcı olabilir.', 'Uykuya geçişte gevşeme hissi sağlayabilir.'],
            tags: ['Sakinleşme','Uykuya geçiş','Karın rahatlığı'],
            caution: 'Papatyagiller alerjisi olan kişiler dikkatli olmalıdır.'
        },
        biberiye: {
            name: 'Biberiye', subtitle: 'Rosmarinus officinalis', image: 'phyto-biberiye-v412.webp',
            intro: 'Biberiye, zihinsel toparlanma ve dolaşım hissiyle ilişkilendirilen aromatik desteklerden biridir.',
            benefits: ['Baş bölgesindeki dolgunluk ve baskı hissine destek olabilir.', 'Zihinsel yorgunluk ve odak kaybını hafifletmeye yardımcı olabilir.', 'Kaslarda hissedilen ağırlık ve hantallık hissini canlandırabilir.'],
            tags: ['Odak','Canlılık','Baş konforu'],
            caution: 'Yüksek tansiyon, gebelik veya nöbet öyküsü olanlarda yoğun formları hekime danışılarak kullanılmalıdır.'
        },
        melisa: {
            name: 'Melisa', subtitle: 'Oğulotu', image: 'phyto-melisa-v412.webp',
            intro: 'Melisa; zihni sakinleştiren, karın bölgesini rahatlatan ve gevşemeyi destekleyen bitkiler arasında yer alır.',
            benefits: ['İç huzursuzluk ve gerginlik hissini yatıştırmaya destek olabilir.', 'Bacaklarda dinlenirken artan huzursuz histe gevşemeye yardımcı olabilir.', 'Karın rahatlığı ve yumuşak sindirim konforunu destekleyebilir.'],
            tags: ['Sakinleşme','Bacak rahatlığı','Sindirim'],
            caution: 'Tiroit ilaçları kullananlarda ve yoğun sakinleştirici alan kişilerde hekim görüşü alınmalıdır.'
        },
        atescicegi: {
            name: 'Ateş Çiçeği', subtitle: 'Feverfew', image: 'phyto-ates-cicegi-v412.webp',
            intro: 'Ateş çiçeği daha çok tekrarlayan baş hassasiyeti yaşayan kişilerde destek amaçlı araştırılan bitkisel başlıklardandır.',
            benefits: ['Sık tekrarlayan baş bölgesi hassasiyetinde destek olabilir.', 'Işık ve sesle artan rahatsızlık hissinin hafifletilmesine yardımcı olabilir.', 'Ataklar arası genel dengeyi korumayı destekleyebilir.'],
            tags: ['Baş hassasiyeti','Denge','Atak arası destek'],
            caution: 'Kan sulandırıcı kullananlarda, ağız içi hassasiyet yaşayanlarda ve gebelerde uygun olmayabilir.'
        },
        lavanta: {
            name: 'Lavanta', subtitle: 'Lavandula', image: 'phyto-lavanta-v412.webp',
            intro: 'Lavanta, gevşeme ve sakinleşme hissi oluşturan aromatik yapısıyla özellikle stres eşlik eden yakınmalarda değerlendirilebilir.',
            benefits: ['Uyku öncesi gevşemeyi ve sakinleşmeyi destekleyebilir.', 'Baş-boyun hattındaki gerginliği hafifletmeye yardımcı olabilir.', 'Yaygın vücut hassasiyetinde rahatlatıcı bir his sağlayabilir.'],
            tags: ['Gevşeme','Uyku','Stres'],
            caution: 'Yoğun yağ formları hassas ciltte iritasyon yapabilir; ağızdan kullanımlarda uygun ürün seçimi önemlidir.'
        },
        ashwagandha: {
            name: 'Ashwagandha', subtitle: 'Hint ginsengi', image: 'phyto-ashwagandha-v412.webp',
            intro: 'Ashwagandha; stres yükü, düşük enerji ve toparlanma güçlüğü yaşayan kişilerde destek başlığı olarak sık anılır.',
            benefits: ['Sürekli yorgun ve tükenmiş hissetme durumunda destek olabilir.', 'Strese bağlı kas gerginliği ve toparlanma güçlüğünü hafifletmeye yardımcı olabilir.', 'Genel dayanıklılık hissini destekleyebilir.'],
            tags: ['Stres dengesi','Toparlanma','Dayanıklılık'],
            caution: 'Tiroid hastalığı, otoimmün tablolar ve gebelik durumunda hekim görüşü gerektirir.'
        },
        pasiflora: {
            name: 'Pasiflora', subtitle: 'Çarkıfelek', image: 'phyto-pasiflora-v412.webp',
            intro: 'Pasiflora özellikle bedensel huzursuzluk, uykuya dalma güçlüğü ve gevşeme ihtiyacında öne çıkan bitkisel seçeneklerdendir.',
            benefits: ['Gece artan huzursuzluk ve kıpırdanma hissini azaltmaya destek olabilir.', 'Uykuya geçişte zihin ve bedeni sakinleştirmeye yardımcı olabilir.', 'Yaygın gerginlik hissini yumuşatabilir.'],
            tags: ['Uyku','Huzursuzluk','Sakinleşme'],
            caution: 'Uyku ilaçları veya sakinleştirici kullanan kişiler kontrolsüz birlikte kullanmamalıdır.'
        },
        ginkgo: {
            name: 'Ginkgo Biloba', subtitle: 'Yaprak ekstresi', image: 'phyto-ginkgo-v412.webp',
            intro: 'Ginkgo biloba daha çok dolaşım, zihinsel netlik ve bacak konforu başlıklarında değerlendirilen desteklerden biridir.',
            benefits: ['Bacaklarda rahatsız eden dolaşım yavaşlığı hissini destekleyebilir.', 'Zihinsel bulanıklık ve dikkat dağınıklığını hafifletmeye yardımcı olabilir.', 'Gün içi enerji düşüşlerinde canlılığı destekleyebilir.'],
            tags: ['Dolaşım','Zihin açıklığı','Bacak konforu'],
            caution: 'Kan sulandırıcılarla etkileşebilir; ameliyat öncesi dönemde kullanılmamalıdır.'
        },
        kediotu: {
            name: 'Kediotu', subtitle: 'Valeriana', image: 'phyto-kediotu-v412.webp',
            intro: 'Kediotu gevşeme ve uyku desteği yaklaşımında sık geçen bitkilerden biridir; özellikle gece artan huzursuzluk hissine eşlik eden durumlarda değerlendirilir.',
            benefits: ['Uykuya geçişi zorlaştıran iç huzursuzluğu azaltmaya destek olabilir.', 'Gece belirginleşen bacak rahatsızlığında gevşeme hissi sağlayabilir.', 'Kaslarda dinlenirken hissedilen gerginliği yumuşatabilir.'],
            tags: ['Uyku','Gece rahatlığı','Kas gevşemesi'],
            caution: 'Sakinleştirici ilaçlarla birlikte kullanımı ancak hekim önerisiyle düşünülmelidir.'
        },
        rezene: {
            name: 'Rezene', subtitle: 'Foeniculum vulgare', image: 'phyto-rezene-v412.webp',
            intro: 'Rezene, bağırsak hareketleriyle ilişkili konfor başlıklarında en geleneksel bitkisel desteklerden biridir.',
            benefits: ['Gaz, şişkinlik ve karında doluluk hissini hafifletmeye destek olabilir.', 'Sindirim sonrası kasılma ve rahatsızlık hissini azaltmaya yardımcı olabilir.', 'Yemeklerden sonra karın bölgesinde rahatlama sağlayabilir.'],
            tags: ['Şişkinlik','Sindirim','Karın rahatlığı'],
            caution: 'Hormon duyarlı durumlarda ve yoğun bitkisel ürün kullananlarda uygunluk değerlendirilmelidir.'
        },
        aloe: {
            name: 'Aloe Vera', subtitle: 'Yaprak jeli', image: 'phyto-aloe-vera-v412.webp',
            intro: 'Aloe vera uygun formda kullanıldığında sindirim hattı ve doku yatıştırma başlıklarında değerlendirilebilir.',
            benefits: ['Sindirim kanalındaki yanma ve hassasiyet hissini yatıştırmaya destek olabilir.', 'Dışkılama sonrası rahatlama hissini destekleyebilir.', 'Mide-bağırsak hattında serinletici bir konfor sağlayabilir.'],
            tags: ['Yatıştırıcı etki','Sindirim hattı','Konfor'],
            caution: 'Bazı formları barsak hareketlerini aşırı artırabilir; aktif yakınmalarda hekime danışılmadan kullanılmamalıdır.'
        },
        nane: {
            name: 'Nane', subtitle: 'Mentha', image: 'phyto-nane-v412.webp',
            intro: 'Nane özellikle mide ve bağırsak rahatlığı ile baş-boyun çevresindeki ferahlama hissi için bilinen desteklerden biridir.',
            benefits: ['Karın bölgesindeki sıkışma ve gaz hissini hafifletmeye yardımcı olabilir.', 'Bulantı ve mide dalgalanmasında destek olabilir.', 'Ferahlama hissi ile genel rahatlamayı destekleyebilir.'],
            tags: ['Ferahlık','Mide rahatlığı','Gaz hissi'],
            caution: 'Reflü yakınması olan kişilerde her form uygun olmayabilir.'
        },
        psyllium: {
            name: 'Karnıyarık Otu', subtitle: 'Psyllium', image: 'phyto-psyllium-v412.webp',
            intro: 'Psyllium, bağırsak düzeni ve dışkılama konforunu destekleyen lif kaynakları içinde öne çıkar.',
            benefits: ['Bağırsak hareketlerinde düzen hissini destekleyebilir.', 'Karın dolgunluğu ve düzensizlik hissini hafifletmeye yardımcı olabilir.', 'Dışkılama sonrası rahatlık hissini artırabilir.'],
            tags: ['Lif desteği','Bağırsak düzeni','Karın konforu'],
            caution: 'Yeterli su alınmadan kullanılmamalı; bağırsak tıkanıklığı öyküsü olanlarda hekime danışılmalıdır.'
        },
        rhodiola: {
            name: 'Rhodiola', subtitle: 'Altın kök', image: 'phyto-rhodiola-v412.webp',
            intro: 'Rhodiola; zihinsel ve fiziksel yorgunluk dönemlerinde adaptasyon desteği amacıyla anılan bitkilerden biridir.',
            benefits: ['Uzun süren bitkinlik ve motivasyon düşüklüğünde destek olabilir.', 'Zihinsel bulanıklık ve çabuk yorulma hissini hafifletmeye yardımcı olabilir.', 'Stresle birlikte gelen enerji düşüşünde toparlanmayı destekleyebilir.'],
            tags: ['Enerji','Zihinsel toparlanma','Stres uyumu'],
            caution: 'Çarpıntı, yüksek anksiyete veya bazı psikiyatrik ilaç kullanımlarında uygunluğu hekim belirlemelidir.'
        },
        ginseng: {
            name: 'Ginseng', subtitle: 'Panax ginseng', image: 'phyto-ginseng-v412.webp',
            intro: 'Ginseng, fiziksel ve zihinsel canlılık desteği dendiğinde en sık öne çıkan desteklerden biridir.',
            benefits: ['Sabah kalkarken yaşanan güçsüzlük hissine destek olabilir.', 'Gün içinde çabuk tükenme ve konsantrasyon düşüklüğünü hafifletmeye yardımcı olabilir.', 'Genel enerji ve dayanıklılık hissini destekleyebilir.'],
            tags: ['Canlılık','Dayanıklılık','Odak'],
            caution: 'Tansiyon, çarpıntı veya kan şekeri ilacı kullanan kişilerde uygunluğu kişiye göre değerlendirilmelidir.'
        }
    };

    const diseaseSets = {
        as: {
            title: 'Ankilozan Spondilit için Bitkisel Destekler',
            short: 'AS',
            desc: 'Buradaki bitkiler hastalığın adından çok; sabah sertliği, omurga çevresi tutukluk, hareketle rahatlama ihtiyacı ve genel beden konforu gibi yakınmalar üzerinden düşünülmüştür.',
            note: 'Bu içerikler tanı ve tedavinin yerine geçmez. Özellikle düzenli ilaç kullananlarda bitkisel ürünlerin uygunluğu hekim tarafından değerlendirilmelidir.',
            herbs: ['zerdecal','boswellia','omega3','isirgan','sarimsak','civanpercemi']
        },
        ra: {
            title: 'Romatoid Artrit için Bitkisel Destekler',
            short: 'RA',
            desc: 'Bu başlıkta seçimler; küçük eklemlerde hassasiyet, sabah el-parmak tutukluğu, genel rahatlama ihtiyacı ve günlük hareket konforu dikkate alınarak düzenlendi.',
            note: 'Romatoloji ilaçlarını değiştirmeden önce mutlaka hekim görüşü alınmalıdır. Özellikle kan sulandırıcı ve bağışıklık sistemiyle ilişkili tedavilerde etkileşim riski önemlidir.',
            herbs: ['zencefil','yesilcay','kekik','corekotu','kusburnu','beyazsogut']
        },
        'bas-agrisi-migren': {
            title: 'Baş Ağrısı ve Migren için Bitkisel Destekler',
            short: 'Migren',
            desc: 'Seçimler; baş bölgesinde zonklama, mide dalgalanması, ışık-ses hassasiyeti ve stresle artan gerginlik gibi yakınmalar üzerinden hazırlanmıştır.',
            note: 'Yeni başlayan, ani gelişen veya alışılmışın dışında şiddetli baş ağrılarında bitkisel ürünlerle oyalanmadan tıbbi değerlendirme gerekir.',
            herbs: ['papatya','biberiye','melisa','atescicegi','lavanta','zencefil']
        },
        'bel-sirt-agrisi': {
            title: 'Bel ve Sırt Ağrısı için Bitkisel Destekler',
            short: 'Bel & Sırt',
            desc: 'Bu seçimler; bel-sırt hattında gerginlik, hareket sonrası tutulma, kaslarda ağırlık hissi ve günlük toparlanma ihtiyacı gibi yakınmalar üzerinden düzenlendi.',
            note: 'Uyuşma, kuvvet kaybı, ateş, travma veya giderek artan ağrı varsa bitkisel desteklerden önce tıbbi değerlendirme önceliklidir.',
            herbs: ['beyazsogut','civanpercemi','kekik','ashwagandha','rhodiola','ginseng']
        },
        fibromiyalji: {
            title: 'Fibromiyalji için Bitkisel Destekler',
            short: 'Fibromiyalji',
            desc: 'Bitkiler; yaygın vücut hassasiyeti, dinlenmeden kalkma hissi, uyku kalitesinin bozulması ve stres eşlik eden bedensel yorgunluk dikkate alınarak seçildi.',
            note: 'Fibromiyaljide bitkisel destekler tek başına çözüm değildir; uyku, hareket, stres yönetimi ve kişiye özel tıbbi plan temel yaklaşımı oluşturur.',
            herbs: ['ashwagandha','pasiflora','lavanta','biberiye','zerdecal','ginkgo']
        },
        'huzursuz-bacak': {
            title: 'Huzursuz Bacak Sendromu için Bitkisel Destekler',
            short: 'HBS',
            desc: 'Seçimler; gece belirginleşen bacak huzursuzluğu, dinlenirken artan kıpırdanma ihtiyacı, gevşeyememe ve uykuya dalma güçlüğü üzerinde odaklanır.',
            note: 'Huzursuz bacak hissi demir eksikliği ve farklı nedenlerle ilişkili olabilir. Bitkisel ürünlerden önce altta yatan nedenlerin araştırılması önceliklidir.',
            herbs: ['kediotu','ginkgo','papatya','melisa','isirgan','pasiflora']
        },
        'iltihabi-bagirsak': {
            title: 'İltihabi Bağırsak Yakınmaları için Bitkisel Destekler',
            short: 'Bağırsak',
            desc: 'Buradaki seçimlerde hastalık adından çok; karında huzursuzluk, gaz-şişkinlik, dışkılama düzeni ve bağırsak konforu gibi başlıklar öne çıkarıldı.',
            note: 'Alevlenme dönemlerinde ya da aktif karın yakınmalarında bitkisel ürün seçimi mutlaka gastroenteroloji ve hekim kontrolüyle yapılmalıdır.',
            herbs: ['rezene','aloe','nane','psyllium','boswellia','corekotu']
        },
        'kronik-yorgunluk': {
            title: 'Kronik Yorgunluk için Bitkisel Destekler',
            short: 'Yorgunluk',
            desc: 'Bu set; çabuk tükenme, sabah dinlenemeden uyanma, zihinsel bulanıklık ve gün içinde enerjiyi sürdürememe yakınmaları temel alınarak hazırlandı.',
            note: 'Uzun süren yorgunlukta kansızlık, tiroit, uyku sorunları ve diğer tıbbi nedenler araştırılmadan yalnızca takviye odaklı gidilmemelidir.',
            herbs: ['rhodiola','ginseng','yesilcay','kusburnu','omega3','sarimsak']
        }
    };

    // V413: Aynı bitki farklı hastalık kartlarında açıldığında, içerik o hastalığın
    // yakınmalarına göre değişir. Böylece 8 başlıktaki 48 kart ayrı ayrı anlatılır.
    const diseaseMetaV413 = {
        as: {
            name: 'Ankilozan Spondilit', badge: 'AS',
            evidence: 'Bitkisel destekler ankilozan spondilitin romatoloji tedavisinin yerine geçmez; kanıt düzeyi ürüne göre değişir ve ilaç etkileşimleri hekimle değerlendirilmelidir.'
        },
        ra: {
            name: 'Romatoid Artrit', badge: 'RA',
            evidence: 'Romatoid artritte hastalık düzenleyici ilaçlar temel tedavidir. Bitkisel ürünler yalnızca tamamlayıcı yaklaşım olarak ve romatoloji takibi bozulmadan değerlendirilmelidir.'
        },
        'bas-agrisi-migren': {
            name: 'Baş Ağrısı ve Migren', badge: 'MİGREN',
            evidence: 'Migren ve baş ağrısında bitkisel ürünlerin etkisi kişiden kişiye değişir. Yeni, ani veya alışılmışın dışında şiddetli baş ağrısı tıbbi değerlendirme gerektirir.'
        },
        'bel-sirt-agrisi': {
            name: 'Bel ve Sırt Ağrısı', badge: 'BEL & SIRT',
            evidence: 'Bel ve sırt ağrısında bitkisel destekler altta yatan mekanik ya da nörolojik nedeni düzeltmez; hareket planı ve doğru tanı önceliklidir.'
        },
        fibromiyalji: {
            name: 'Fibromiyalji', badge: 'FİBROMİYALJİ',
            evidence: 'Fibromiyaljide tek bir bitki bütün yakınmaları çözmez. Uyku, düzenli hareket, stres yönetimi ve kişiye özel tıbbi plan birlikte ele alınmalıdır.'
        },
        'huzursuz-bacak': {
            name: 'Huzursuz Bacak Sendromu', badge: 'HBS',
            evidence: 'Huzursuz bacak yakınmalarında demir eksikliği, böbrek hastalığı, ilaçlar ve uyku düzeni gibi nedenler araştırılmadan yalnızca bitkisel ürüne yönelinmemelidir.'
        },
        'iltihabi-bagirsak': {
            name: 'İltihabi Bağırsak Yakınmaları', badge: 'BAĞIRSAK',
            evidence: 'Alevlenme döneminde bazı bitkisel ürünler yakınmaları artırabilir veya ilaçlarla etkileşebilir. Gastroenteroloji tedavisi değiştirilmeden hekim görüşü alınmalıdır.'
        },
        'kronik-yorgunluk': {
            name: 'Kronik Yorgunluk', badge: 'YORGUNLUK',
            evidence: 'Uzun süren yorgunlukta kansızlık, tiroit, enfeksiyon, uyku bozukluğu ve ilaç etkileri araştırılmalıdır; bitkisel destek tanısal değerlendirmenin yerine geçmez.'
        }
    };

    const diseaseCardContentV413 = {
        as: {
            zerdecal: [
                'Zerdeçal, ankilozan spondilitte görülebilen sabah sertliği ve omurga çevresindeki hassasiyet için destekleyici planlarda değerlendirilen içeriklerden biridir.',
                'Kurkumin içeriği nedeniyle inflamasyonla ilişkili süreçler açısından araştırılmıştır; amaç hastalığı tedavi etmek değil günlük hareket konforunu desteklemektir.',
                ['Sabah kalkınca belirginleşen tutukluk hissi', 'Bel ve kalça çevresindeki hareket hassasiyeti', 'Günlük aktivite sonrası toparlanma ihtiyacı']
            ],
            boswellia: [
                'Boswellia, ankilozan spondilitte omurga ve sakroiliak bölge çevresindeki gerginlik ile hareket kısıtlılığı hissi için tamamlayıcı olarak düşünülebilir.',
                'Boswellik asit içeren standart ürünler eklem konforu bağlamında araştırılmıştır; mevcut romatoloji tedavisine eklenmesi ancak hekim değerlendirmesiyle olmalıdır.',
                ['Omurga çevresinde katılık hissi', 'Uzun oturma sonrası açılma güçlüğü', 'Hareket sırasında daha rahat hissetme ihtiyacı']
            ],
            omega3: [
                'Omega-3, ankilozan spondilitte inflamatuar yükü azaltmayı hedefleyen dengeli beslenme yaklaşımının bir parçası olarak değerlendirilebilir.',
                'EPA ve DHA içeren kaynaklar doğrudan hastalık tedavisi değildir; beslenme kalitesi, kullanılan ilaçlar ve kanama riski birlikte ele alınmalıdır.',
                ['Genel beden sertliği hissi', 'Egzersiz sonrası toparlanma', 'Kalp-damar sağlığını destekleyen beslenme düzeni']
            ],
            isirgan: [
                'Isırgan otu, ankilozan spondilitte doğrudan hastalık kontrolü için değil; bedende ağırlık, şişkinlik ve dolaşım rahatlığı ihtiyacı olduğunda geleneksel destek olarak ele alınır.',
                'İdrar söktürücü etki gösterebileceği için tansiyon, böbrek fonksiyonu ve kullanılan ilaçlar dikkate alınmalıdır.',
                ['Bacaklarda ağırlık ve dolgunluk hissi', 'Gün içindeki genel yorgunluk', 'Sıvı-dolaşım dengesinin izlenmesi']
            ],
            sarimsak: [
                'Sarımsak, ankilozan spondilitte eklem yakınmalarını tedavi etmek için değil; kalp-damar sağlığını destekleyen beslenme düzeninin bir bileşeni olarak değerlendirilebilir.',
                'Düzenli kullanım planlanırken kan sulandırıcı ilaçlar, mide hassasiyeti ve ameliyat dönemi mutlaka göz önünde bulundurulmalıdır.',
                ['Dolaşım odaklı beslenme desteği', 'Genel canlılık ve toparlanma', 'Dengeli öğün düzenine katkı']
            ],
            civanpercemi: [
                'Civanperçemi, ankilozan spondilitte hastalığı baskılayan bir tedavi değildir; kas gerginliği ve sindirim eşlikli huzursuzluk dönemlerinde geleneksel destek olarak düşünülebilir.',
                'Papatyagiller alerjisi, gebelik ve düzenli ilaç kullanımı varsa ürün formu ve uygunluğu hekimle değerlendirilmelidir.',
                ['Kaslarda sıkışma ve gerginlik hissi', 'Sindirimle artan bedensel huzursuzluk', 'Gün sonunda gevşeme ihtiyacı']
            ]
        },
        ra: {
            zencefil: [
                'Zencefil, romatoid artritte görülebilen sabah tutukluğu ve eklem hassasiyeti için destekleyici beslenme planlarında değerlendirilebilir.',
                'Zencefilin biyoaktif bileşenleri inflamasyon süreçleri açısından araştırılmıştır; ancak romatoid artrit ilaçlarının yerine geçmez ve kanama riski dikkate alınmalıdır.',
                ['Sabah el-parmak tutukluğu hissi', 'Eklem çevresindeki hassasiyet', 'Mideyi zorlamayan destek seçimi']
            ],
            yesilcay: [
                'Yeşil çay, romatoid artritte antioksidan içeriği nedeniyle genel beslenme desteği olarak ele alınabilir.',
                'EGCG içeriği ilgi çekse de klinik sonuçlar tek başına tedavi kanıtı oluşturmaz; kafein hassasiyeti ve ilaçlarla kullanım zamanı değerlendirilmelidir.',
                ['Gün içi zihinsel canlılık', 'Antioksidan ağırlıklı beslenme', 'Yorgunlukla birlikte düşen odaklanma']
            ],
            kekik: [
                'Kekik, romatoid artritte eklem hasarını durduran bir bitki değildir; aromatik içeriğiyle sindirim ve genel beden rahatlığı için destekleyici olarak düşünülebilir.',
                'Yoğun uçucu yağ formları ağızdan gelişigüzel kullanılmamalı; mide hassasiyeti ve ilaç etkileşimi açısından ürün biçimi önemsenmelidir.',
                ['Şişkinlik ve sindirim konforu', 'Genel kas rahatlığı hissi', 'Öğün sonrası ağırlığın azaltılması']
            ],
            corekotu: [
                'Çörek otu, romatoid artritte bağışıklık sistemini “güçlendirmek” amacıyla kontrolsüz kullanılmamalı; yalnızca kişisel uygunluk varsa tamamlayıcı içerik olarak değerlendirilmelidir.',
                'Otoimmün hastalıkta kullanılan ilaçlar nedeniyle ürünün dozu, standardizasyonu ve olası kan şekeri-tansiyon etkileri hekimle konuşulmalıdır.',
                ['Genel toparlanma hissi', 'Sindirim ve karın konforu', 'İlaçlarla etkileşim riskinin değerlendirilmesi']
            ],
            kusburnu: [
                'Kuşburnu, romatoid artritte C vitamini ve polifenol içeren bir besin desteği olarak günlük beslenmeye eşlik edebilir.',
                'Amaç eklem iltihabını tek başına tedavi etmek değil; mevsimsel direnç, genel canlılık ve dengeli beslenme yaklaşımını desteklemektir.',
                ['Günlük canlılık ihtiyacı', 'Eklem çevresindeki genel rahatsızlık hissi', 'Mevsim geçişlerinde beslenme desteği']
            ],
            beyazsogut: [
                'Beyaz söğüt kabuğu, romatoid artritte ağrı hissi için geleneksel olarak anılsa da hastalık aktivitesini kontrol eden bir tedavi değildir.',
                'Salisilat benzeri bileşenleri nedeniyle aspirin duyarlılığı, ülser, böbrek sorunu ve kan sulandırıcı kullanımı varsa özellikle dikkat edilmelidir.',
                ['Eklem ağrısı algısı', 'Hareketi zorlaştıran hassasiyet', 'Güvenli kullanım ve kanama riskinin değerlendirilmesi']
            ]
        },
        'bas-agrisi-migren': {
            papatya: [
                'Papatya, migren ve baş ağrısında özellikle stres, mide hassasiyeti ve gevşeyememe eşlik ettiğinde destekleyici olarak düşünülebilir.',
                'Sakinleştirici ve sindirim rahatlatıcı geleneksel kullanımı vardır; migren atağını durduran ilaç yerine geçmez.',
                ['Stresle artan baş-boyun gerginliği', 'Atağa eşlik eden mide huzursuzluğu', 'Uyku öncesi gevşeme ihtiyacı']
            ],
            biberiye: [
                'Biberiye, baş ağrısı ve migrende dolaşım hissi ile zihinsel yorgunluk öne çıktığında aromatik destek olarak değerlendirilebilir.',
                'Doğrudan migren tedavisi olduğuna dair güçlü kanıt yoktur; yoğun uçucu yağlar ve yüksek tansiyon öyküsü açısından dikkat gerekir.',
                ['Başta dolgunluk ve ağırlık hissi', 'Zihinsel yorgunluk', 'Boyun-omuz hattındaki gerginlik']
            ],
            melisa: [
                'Melisa, migren ve baş ağrısında stres, iç huzursuzluk ve uyku düzensizliği tetikleyici olduğunda gevşeme desteği olarak ele alınabilir.',
                'Oğulotunun sakinleştirici etkisi kişiden kişiye değişir; tiroit ilaçları ve sedatiflerle birlikte kullanım değerlendirilmelidir.',
                ['Stresle yükselen ağrı algısı', 'Uykuya geçiş güçlüğü', 'Mide-bağırsak eşlikli huzursuzluk']
            ],
            atescicegi: [
                'Ateş çiçeği, tekrarlayan migren ataklarının sıklığıyla ilgili araştırılmış bitkisel seçeneklerden biridir; anlık atağı kesmek amacıyla kullanılmaz.',
                'Düzenli kullanım düşünülüyorsa gebelik, kan sulandırıcı kullanımı ve ağız içi hassasiyet açısından hekim görüşü alınmalıdır.',
                ['Tekrarlayan atak örüntüsü', 'Işık ve ses hassasiyeti', 'Ataklar arasındaki koruyucu planın değerlendirilmesi']
            ],
            lavanta: [
                'Lavanta, migren ve gerilim tipi baş ağrısında stresle artan kas gerginliği ve gevşeme ihtiyeti için destekleyici aromaterapi başlığı olarak düşünülebilir.',
                'Koku hassasiyeti bazı kişilerde migreni tetikleyebileceğinden düşük yoğunlukla ve kişisel toleransa göre değerlendirilmelidir.',
                ['Boyun ve omuzlarda gerginlik', 'Uyku öncesi sakinleşme', 'Koku toleransının gözlenmesi']
            ],
            zencefil: [
                'Zencefil, migren atağına eşlik eden bulantı ve mide dalgalanması belirgin olduğunda destekleyici olarak değerlendirilebilir.',
                'Bulantı üzerindeki geleneksel kullanımı öne çıkar; şiddetli migren atağında reçeteli tedavinin yerine konmamalıdır.',
                ['Bulantı ve mide dalgalanması', 'Soğukluk ve genel halsizlik hissi', 'Atağın erken dönemindeki beslenme toleransı']
            ]
        },
        'bel-sirt-agrisi': {
            beyazsogut: [
                'Beyaz söğüt kabuğu, bel ve sırt ağrısında ağrı algısını azaltmaya yönelik geleneksel destekler arasında anılır.',
                'Fıtık, sinir basısı veya yapısal sorunu düzeltmez; aspirin duyarlılığı, mide ülseri ve kan sulandırıcı kullanımı varsa uygun olmayabilir.',
                ['Hareketle artan ağrı hissi', 'Kas-eklem hattındaki hassasiyet', 'Güvenlik ve kanama riskinin değerlendirilmesi']
            ],
            civanpercemi: [
                'Civanperçemi, bel ve sırt ağrısında kasılma ve gerginlik hissi öne çıktığında geleneksel gevşeme desteği olarak düşünülebilir.',
                'Bitkisel ürünün amacı mekanik nedeni ortadan kaldırmak değil; hareket ve manuel yaklaşım planına eşlik eden konfor desteği sunmaktır.',
                ['Kaslarda sıkışma hissi', 'Gün sonunda artan sırt gerginliği', 'Hareket sonrası gevşeme ihtiyacı']
            ],
            kekik: [
                'Kekik, bel ve sırt ağrısında doğrudan tedavi değildir; aromatik içeriğiyle kas rahatlığı ve genel canlılık için destekleyici olarak ele alınabilir.',
                'Uçucu yağ içeren ürünler cilde doğrudan yoğun uygulanmamalı ve ağızdan kullanımda uygun form seçilmelidir.',
                ['Kas yorgunluğu ve hantallık', 'Hareket sonrası rahatlama ihtiyacı', 'Topikal ürünlerde cilt toleransı']
            ],
            ashwagandha: [
                'Ashwagandha, bel ve sırt ağrısında stresle artan kas gerginliği ve toparlanma güçlüğü varsa destekleyici başlık olarak değerlendirilebilir.',
                'Ağrının mekanik nedenini çözmez; tiroit, otoimmün hastalık, gebelik ve karaciğer öyküsü açısından uygunluğu hekim belirlemelidir.',
                ['Strese bağlı kas gerginliği', 'Uyku sonrası dinlenememe', 'Fiziksel toparlanma güçlüğü']
            ],
            rhodiola: [
                'Rhodiola, bel ve sırt ağrısına eşlik eden zihinsel-fiziksel yorgunluk dönemlerinde adaptasyon desteği amacıyla düşünülebilir.',
                'Ağrı kesici değildir; çarpıntı, yüksek anksiyete veya psikiyatrik ilaç kullanımı varsa kişisel uygunluk değerlendirilmelidir.',
                ['Çabuk yorulma hissi', 'Egzersize devam etme güçlüğü', 'Stresle düşen günlük enerji']
            ],
            ginseng: [
                'Ginseng, bel ve sırt ağrısında hareketsizlikle artan enerji düşüklüğü ve rehabilitasyona katılım güçlüğü varsa genel canlılık desteği olarak ele alınabilir.',
                'Tansiyon, çarpıntı, kan şekeri ve uyku düzeni üzerindeki etkileri nedeniyle gelişigüzel kullanılmamalıdır.',
                ['Gün içi enerji düşüşü', 'Hareket programına devamlılık', 'Zihinsel ve fiziksel dayanıklılık']
            ]
        },
        fibromiyalji: {
            ashwagandha: [
                'Ashwagandha, fibromiyaljide stres yükü, uyku kalitesizliği ve dinlenmeden uyanma yakınmaları birlikte olduğunda destekleyici olarak değerlendirilebilir.',
                'Bazı preparatlar stres ve uyku için araştırılmıştır; fibromiyaljiyi tedavi ettiği gösterilmiş değildir ve otoimmün-tiroit durumlarında dikkat gerekir.',
                ['Stresle artan yaygın hassasiyet', 'Dinlenmeden uyanma hissi', 'Günlük toparlanma güçlüğü']
            ],
            pasiflora: [
                'Pasiflora, fibromiyaljide uykuya dalma güçlüğü ve gece boyunca gevşeyememe öne çıktığında sakinleşme desteği olarak düşünülebilir.',
                'Sedatif ilaçlarla birlikte uyku hâlini artırabileceğinden kullanım zamanı ve kişisel uygunluk hekimle değerlendirilmelidir.',
                ['Uykuya geçiş güçlüğü', 'Gece artan bedensel huzursuzluk', 'Kaslarda gevşeyememe hissi']
            ],
            lavanta: [
                'Lavanta, fibromiyaljide yaygın gerginlik, stres ve uyku öncesi gevşeme ihtiyacı için destekleyici aromaterapi seçeneği olarak ele alınabilir.',
                'Koku hassasiyeti veya migren eşlik ediyorsa düşük yoğunlukla başlanmalı; yağ formları cilde uygun şekilde seyreltilmelidir.',
                ['Yaygın kas gerginliği', 'Stresle artan ağrı algısı', 'Uyku öncesi rahatlama']
            ],
            biberiye: [
                'Biberiye, fibromiyaljide zihinsel bulanıklık ve gün içi hantallık belirgin olduğunda canlandırıcı aromatik destek olarak değerlendirilebilir.',
                'Doğrudan fibromiyalji tedavisi değildir; yüksek tansiyon, nöbet öyküsü ve yoğun uçucu yağ kullanımı açısından dikkat gerekir.',
                ['Zihinsel bulanıklık hissi', 'Gün içi enerji düşüşü', 'Kaslarda ağırlık ve hantallık']
            ],
            zerdecal: [
                'Zerdeçal, fibromiyaljide yaygın ağrı ve hassasiyet için destekleyici beslenme başlığı olarak değerlendirilebilir; ancak hastalığın tek nedeni inflamasyon değildir.',
                'Bu nedenle kurkumin tek başına çözüm olarak sunulmamalı; uyku, hareket ve stres planıyla birlikte ele alınmalıdır.',
                ['Yaygın beden hassasiyeti', 'Aktivite sonrası toparlanma', 'Dengeli ve antioksidan ağırlıklı beslenme']
            ],
            ginkgo: [
                'Ginkgo biloba, fibromiyaljide zihinsel bulanıklık ve dikkat dağınıklığı yaşayan kişilerde bilişsel destek amacıyla gündeme gelebilir.',
                'Fibromiyaljiye özgü güçlü kanıt yoktur; kan sulandırıcılarla etkileşim ve ameliyat öncesi kullanım özellikle önemlidir.',
                ['Dikkat ve odaklanma güçlüğü', 'Zihinsel yorgunluk', 'Dolaşım ve ilaç etkileşimlerinin değerlendirilmesi']
            ]
        },
        'huzursuz-bacak': {
            kediotu: [
                'Kediotu, huzursuz bacak sendromunda gece artan hareket ettirme isteği ve uykuya dalma güçlüğü için gevşeme desteği olarak değerlendirilebilir.',
                'HBS nedenini tedavi etmez; sedatif ilaçlarla birlikte aşırı uyku hâli oluşturabileceği için kontrolsüz kullanılmamalıdır.',
                ['Gece artan bacak huzursuzluğu', 'Uykuya geçiş güçlüğü', 'Dinlenirken kasların gevşeyememesi']
            ],
            ginkgo: [
                'Ginkgo biloba, huzursuz bacak yakınmalarında dolaşım yavaşlığı hissi eşlik ediyorsa destekleyici olarak düşünülebilir.',
                'HBS için doğrudan etkinliği kanıtlanmış değildir; kan sulandırıcı kullananlarda ve ameliyat öncesinde uygun olmayabilir.',
                ['Bacaklarda dolaşım yavaşlığı hissi', 'Dinlenirken artan rahatsızlık', 'İlaç etkileşimlerinin değerlendirilmesi']
            ],
            papatya: [
                'Papatya, huzursuz bacak sendromunda uyku öncesi gerginlik ve zihinsel huzursuzluk eşlik ettiğinde sakinleşme desteği olarak ele alınabilir.',
                'Altta yatan demir eksikliğini veya nörolojik nedeni düzeltmez; papatyagiller alerjisi olanlar dikkatli olmalıdır.',
                ['Uyku öncesi gevşeyememe', 'Gece artan iç huzursuzluk', 'Karın gerginliğiyle bozulan uyku']
            ],
            melisa: [
                'Melisa, huzursuz bacak sendromunda stresle artan kıpırdanma ihtiyacı ve uykuya dalma güçlüğü için destekleyici olarak değerlendirilebilir.',
                'Tiroit ilacı veya sakinleştirici kullananlarda ürün seçimi ve kullanım zamanı hekimle planlanmalıdır.',
                ['Stresle artan bacak huzursuzluğu', 'Uykuya geçişte sakinleşme', 'Gece boyunca gevşeme ihtiyacı']
            ],
            isirgan: [
                'Isırgan otu, huzursuz bacak sendromunda doğrudan tedavi değildir; bacaklarda ağırlık ve sıvı tutma hissi eşlik ettiğinde geleneksel destek olarak düşünülebilir.',
                'İdrar söktürücü etkisi gece uyanmalarını artırabileceği için kullanım zamanı, böbrek durumu ve ilaçlar birlikte değerlendirilmelidir.',
                ['Bacaklarda ağırlık hissi', 'Sıvı-dolaşım dengesinin izlenmesi', 'Gece kullanım zamanının planlanması']
            ],
            pasiflora: [
                'Pasiflora, huzursuz bacak sendromunda gece belirginleşen bedensel huzursuzluk ve uykuya geçememe durumunda gevşeme desteği olarak ele alınabilir.',
                'HBS nedenini ortadan kaldırmaz; uyku ilaçları ve sakinleştiricilerle birlikte kullanımı hekim önerisi gerektirir.',
                ['Gece kıpırdanma ihtiyacı', 'Uykuya dalma güçlüğü', 'Zihin ve bedenin sakinleşmesi']
            ]
        },
        'iltihabi-bagirsak': {
            rezene: [
                'Rezene, iltihabi bağırsak yakınmalarında gaz, şişkinlik ve yemek sonrası doluluk öne çıktığında semptom odaklı destek olarak değerlendirilebilir.',
                'Bağırsaktaki iltihabı tedavi etmez; alevlenme döneminde tolerans değişebileceği için küçük miktar ve kişisel gözlem önemlidir.',
                ['Gaz ve karında doluluk', 'Yemek sonrası kasılma hissi', 'Kişisel toleransın izlenmesi']
            ],
            aloe: [
                'Aloe vera, iltihabi bağırsak yakınmalarında yatıştırıcı olarak pazarlansa da her formu uygun değildir ve bazı ürünler ishali artırabilir.',
                'Özellikle aloe lateksi içeren ürünler bağırsak hareketlerini hızlandırabileceğinden aktif hastalıkta hekim görüşü olmadan kullanılmamalıdır.',
                ['Yanma ve hassasiyet hissi', 'İshal riskinin değerlendirilmesi', 'Ürün formu ve içerik kontrolü']
            ],
            nane: [
                'Nane, iltihabi bağırsak yakınmalarında gaz, kramp ve karında sıkışma hissi öne çıktığında semptomatik rahatlama desteği olarak düşünülebilir.',
                'Alevlenmeyi tedavi etmez; reflü, ishal veya yoğun hassasiyet varsa nane yağı içeren ürünler yakınmaları artırabilir.',
                ['Gaz ve karın sıkışması', 'Yemek sonrası spazm hissi', 'Reflü ve kişisel toleransın izlenmesi']
            ],
            psyllium: [
                'Karnıyarık otu lifi, iltihabi bağırsak yakınmalarında dışkı kıvamı ve bağırsak düzeni için yalnızca uygun dönemde değerlendirilebilir.',
                'Daralma, tıkanıklık riski veya aktif şiddetli alevlenme varsa uygun olmayabilir; yeterli suyla ve gastroenteroloji görüşüyle kullanılmalıdır.',
                ['Dışkı kıvamının düzenlenmesi', 'Bağırsak ritminin desteklenmesi', 'Yeterli su ve daralma riskinin değerlendirilmesi']
            ],
            boswellia: [
                'Boswellia, iltihabi bağırsak süreçlerinde inflamasyonla ilişkili yollar açısından araştırılmıştır; ancak kanıtlar standart tedavinin yerine geçecek düzeyde değildir.',
                'Ürün standardizasyonu, mide-bağırsak toleransı ve kullanılan ilaçlarla etkileşim gastroenteroloji planı içinde değerlendirilmelidir.',
                ['Karın bölgesindeki hassasiyet', 'Alevlenme dışı dönemde konfor arayışı', 'Ürün kalitesi ve ilaç etkileşimleri']
            ],
            corekotu: [
                'Çörek otu, iltihabi bağırsak yakınmalarında genel sindirim konforu için gündeme gelebilir; hastalığın alevlenmesini kontrol eden bir tedavi değildir.',
                'Yağ veya yoğun ekstre formları bazı kişilerde mide-bağırsak yakınmalarını artırabilir; kan şekeri ve tansiyon ilaçlarıyla etkileşim dikkate alınmalıdır.',
                ['Karın konforu ve şişkinlik', 'Yoğun yağ formlarına tolerans', 'İlaç etkileşimi ve kişisel yanıt']
            ]
        },
        'kronik-yorgunluk': {
            rhodiola: [
                'Rhodiola, kronik yorgunlukta zihinsel tükenme, motivasyon düşüklüğü ve stresle artan enerji kaybı için adaptasyon desteği olarak değerlendirilebilir.',
                'Yorgunluğun tıbbi nedenini tedavi etmez; çarpıntı, yüksek anksiyete ve psikiyatrik ilaç kullanımı varsa uygunluğu değerlendirilmelidir.',
                ['Zihinsel tükenme hissi', 'Stresle düşen enerji', 'Günlük işlere başlama güçlüğü']
            ],
            ginseng: [
                'Ginseng, kronik yorgunlukta sabah güçsüzlüğü ve gün içinde çabuk tükenme için canlılık desteği amacıyla ele alınabilir.',
                'Tansiyon, kan şekeri, çarpıntı ve uyku düzenini etkileyebileceğinden ürün formu ve kullanım zamanı kişiye özel planlanmalıdır.',
                ['Sabah enerji düşüklüğü', 'Fiziksel dayanıklılık ihtiyacı', 'Gün içi odaklanma güçlüğü']
            ],
            yesilcay: [
                'Yeşil çay, kronik yorgunlukta kısa süreli uyanıklık ve odak desteği sağlayabilen kafeinli bir içecektir.',
                'Enerji hissini geçici artırabilir fakat yetersiz uykuyu telafi etmez; çarpıntı ve uyku bozukluğu yaşayanlarda miktar sınırlanmalıdır.',
                ['Zihinsel odaklanma', 'Gün içi kısa süreli canlılık', 'Kafein ve uyku dengesinin korunması']
            ],
            kusburnu: [
                'Kuşburnu, kronik yorgunlukta vitamin ve polifenol içeren bir besin desteği olarak dengeli öğün planına eşlik edebilir.',
                'Tek başına enerji eksikliğinin nedenini çözmez; amaç beslenme çeşitliliği ve mevsimsel toparlanma hissini desteklemektir.',
                ['Beslenme çeşitliliği', 'Mevsimsel canlılık ihtiyacı', 'Sıvı ve öğün düzenine katkı']
            ],
            omega3: [
                'Omega-3, kronik yorgunlukta hücresel enerji üreten bir uyarıcı değildir; dengeli beslenme ve genel sağlık desteği kapsamında değerlendirilebilir.',
                'Balık yağı veya alg yağı seçimi, EPA-DHA içeriği, kan sulandırıcı kullanımı ve beslenme düzeniyle birlikte planlanmalıdır.',
                ['Dengeli yağ asidi alımı', 'Genel toparlanma ve beslenme kalitesi', 'İlaçlarla güvenli kullanım']
            ],
            sarimsak: [
                'Sarımsak, kronik yorgunlukta doğrudan enerji veren bir ürün değildir; dolaşım ve genel beslenme kalitesini destekleyen bir gıda olarak değerlendirilebilir.',
                'Mide hassasiyeti, kan sulandırıcı kullanımı ve ameliyat dönemi varsa yoğun takviye formları yerine hekim görüşü alınmalıdır.',
                ['Dengeli öğünlerde doğal kullanım', 'Dolaşım odaklı beslenme', 'Mide ve kanama riskinin değerlendirilmesi']
            ]
        }
    };

    function getDiseaseHerbContentV413(diseaseKey, herbId) {
        const herb = herbCatalog[herbId];
        const meta = diseaseMetaV413[diseaseKey];
        const item = diseaseCardContentV413[diseaseKey]?.[herbId];
        if (!herb || !meta || !item) {
            return {
                diseaseKey: diseaseKey || '',
                diseaseName: meta?.name || 'Genel Bitkisel Destek',
                badge: meta?.badge || 'FİTOTERAPİ',
                summary: herb?.intro || '',
                why: 'Bu içerik kişinin yakınmaları, kullandığı ilaçlar ve muayene bulguları birlikte değerlendirilerek planlanmalıdır.',
                focus: herb?.benefits || [],
                evidence: meta?.evidence || 'Bitkisel ürünler mevcut tıbbi tedavinin yerine geçmez; kişisel uygunluk hekim tarafından değerlendirilmelidir.'
            };
        }
        return {
            diseaseKey,
            diseaseName: meta.name,
            badge: meta.badge,
            summary: item[0],
            why: item[1],
            focus: item[2],
            evidence: meta.evidence
        };
    }

    const diseaseOrder = ['as','ra','bas-agrisi-migren','bel-sirt-agrisi','fibromiyalji','huzursuz-bacak','iltihabi-bagirsak','kronik-yorgunluk'];
    let activeMainDisease = 'as';

    function cardHTML(herbId, index, diseaseKey) {
        const herb = herbCatalog[herbId];
        if (!herb) return '';
        const context = getDiseaseHerbContentV413(diseaseKey, herbId);
        return `
            <button type="button" class="phyto-card-v127 phyto-card-button-v350 phyto-card-v413" data-herb-id-v350="${herbId}" data-disease-key-v413="${diseaseKey}" aria-label="${herb.name} • ${context.diseaseName} detayını aç">
                <span class="phyto-card-visual-v413">
                    <img src="${herb.image}" alt="${herb.name} görseli" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='phyto-biberiye-v412.webp';">
                    <span class="phyto-number-v127">${String(index + 1).padStart(2, '0')}</span>
                    <span class="phyto-disease-badge-v413">${context.badge}</span>
                </span>
                <div class="phyto-card-body-v127">
                    <span class="phyto-card-kicker-v413">${context.diseaseName} • Bitkisel Destek</span>
                    <h3>${herb.name}${herb.subtitle ? ` <small>${herb.subtitle}</small>` : ''}</h3>
                    <p>${context.summary}</p>
                    <div class="phyto-card-focus-v413">
                        ${(context.focus || []).slice(0,2).map(item => `<span>${item}</span>`).join('')}
                    </div>
                    <span class="phyto-card-cta-v413">Hastalığa özel detayı incele</span>
                </div>
            </button>
        `;
    }

    function renderMainDisease(key) {
        if (!mainGrid || !diseaseSets[key]) return;
        activeMainDisease = key;
        window.phytoActiveDiseaseV413 = key;
        const data = diseaseSets[key];
        mainGrid.innerHTML = data.herbs.map((id, index) => cardHTML(id, index, key)).join('');
        const descNode = document.getElementById('phytoCurrentDescV350');
        if (descNode) descNode.textContent = data.desc;
        document.querySelectorAll('.phyto-disease-tab-v350').forEach(btn => {
            btn.classList.toggle('is-active', btn.dataset.phytoDiseaseV350 === key);
        });
        wireHerbTriggers(mainGrid);
    }

    function ensureMainPhytoFilters() {
        if (!mainGrid || !guideHead || document.getElementById('phytoDiseaseTabsV350')) return;
        const wrap = document.createElement('div');
        wrap.className = 'phyto-disease-switch-v350';
        wrap.innerHTML = `
            <div class="phyto-disease-tabs-v350" id="phytoDiseaseTabsV350" aria-label="Fitoterapi hastalık sekmeleri">
                ${diseaseOrder.map(key => `<button type="button" class="phyto-disease-tab-v350${key === activeMainDisease ? ' is-active' : ''}" data-phyto-disease-v350="${key}">${diseaseSets[key].short}</button>`).join('')}
            </div>
            <p class="phyto-current-desc-v350" id="phytoCurrentDescV350"></p>
        `;
        guideHead.appendChild(wrap);
        wrap.addEventListener('click', function (event) {
            const btn = event.target.closest('[data-phyto-disease-v350]');
            if (!btn) return;
            renderMainDisease(btn.dataset.phytoDiseaseV350);
        });
        renderMainDisease(activeMainDisease);
    }

    function ensureModal() {
        if (document.getElementById('phytoModalV350')) return;
        const modal = document.createElement('div');
        modal.className = 'phyto-modal-v350';
        modal.id = 'phytoModalV350';
        modal.setAttribute('aria-hidden', 'true');
        modal.innerHTML = `
            <div class="phyto-modal-backdrop-v350" data-phyto-close-v350></div>
            <div class="phyto-modal-card-v350" role="dialog" aria-modal="true" aria-labelledby="phytoModalTitleV350">
                <button type="button" class="phyto-modal-close-v350" aria-label="Pencereyi kapat" data-phyto-close-v350>×</button>
                <div class="phyto-modal-content-v350" id="phytoModalContentV350"></div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', function (event) {
            if (event.target.closest('[data-phyto-close-v350]')) closeModal();
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
        });
    }

    function openModal(herbId) {
        ensureModal();
        const herb = herbCatalog[herbId];
        const modal = document.getElementById('phytoModalV350');
        const content = document.getElementById('phytoModalContentV350');
        if (!herb || !modal || !content) return;
        content.innerHTML = `
            <div class="phyto-modal-hero-v350">
                <img src="${herb.image}" alt="${herb.name} görseli" onerror="this.onerror=null;this.src='phyto-biberiye-v412.webp';">
                <div class="phyto-modal-copy-v350">
                    <small>DETAYLI BİTKİ BİLGİSİ</small>
                    <h3 id="phytoModalTitleV350">${herb.name}${herb.subtitle ? ` <span>(${herb.subtitle})</span>` : ''}</h3>
                    <p>${herb.intro}</p>
                    <div class="phyto-benefit-tags-v350">${(herb.tags || []).map(tag => `<span>${tag}</span>`).join('')}</div>
                </div>
            </div>
            <div class="phyto-modal-sections-v350">
                <section class="phyto-modal-panel-v350">
                    <h4>Destek olabileceği yakınmalar</h4>
                    <ul>${herb.benefits.map(item => `<li>${item}</li>`).join('')}</ul>
                </section>
                <section class="phyto-modal-panel-v350">
                    <h4>Nasıl düşünülmeli?</h4>
                    <ul>
                        <li>Bu başlık bir ilaç yerine değil, destek yaklaşımı olarak ele alınmalıdır.</li>
                        <li>Kişinin kullandığı ilaçlar, mide-bağırsak yapısı ve eşlik eden hastalıkları birlikte değerlendirilmelidir.</li>
                        <li>Uygun form, ürün kalitesi ve kullanım süresi hekimle birlikte planlanmalıdır.</li>
                    </ul>
                </section>
            </div>
            <div class="phyto-modal-warning-v350"><strong>Dikkat:</strong> ${herb.caution}</div>
        `;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        const modal = document.getElementById('phytoModalV350');
        if (!modal) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function normalizeHerbKey(title) {
        const text = (title || '').toLowerCase();
        if (text.includes('zerdeçal')) return 'zerdecal';
        if (text.includes('boswellia') || text.includes('akgünlük')) return 'boswellia';
        if (text.includes('omega')) return 'omega3';
        if (text.includes('ısırgan')) return 'isirgan';
        if (text.includes('sarımsak')) return 'sarimsak';
        if (text.includes('civanperçemi')) return 'civanpercemi';
        if (text.includes('zencefil')) return 'zencefil';
        if (text.includes('yeşil çay')) return 'yesilcay';
        if (text.includes('kekik')) return 'kekik';
        if (text.includes('çörek otu')) return 'corekotu';
        if (text.includes('kuşburnu')) return 'kusburnu';
        if (text.includes('beyaz söğüt')) return 'beyazsogut';
        if (text.includes('papatya')) return 'papatya';
        if (text.includes('biberiye')) return 'biberiye';
        if (text.includes('melisa') || text.includes('oğulotu')) return 'melisa';
        if (text.includes('ateş çiçeği') || text.includes('feverfew')) return 'atescicegi';
        if (text.includes('lavanta')) return 'lavanta';
        if (text.includes('ashwagandha')) return 'ashwagandha';
        if (text.includes('pasiflora') || text.includes('çarkıfelek')) return 'pasiflora';
        if (text.includes('ginkgo')) return 'ginkgo';
        if (text.includes('kediotu')) return 'kediotu';
        if (text.includes('rezene')) return 'rezene';
        if (text.includes('aloe')) return 'aloe';
        if (text.includes('nane')) return 'nane';
        if (text.includes('karnıyarık')) return 'psyllium';
        if (text.includes('rhodiola')) return 'rhodiola';
        if (text.includes('ginseng')) return 'ginseng';
        return '';
    }

    function wireHerbTriggers(root) {
        if (!root) return;
        root.querySelectorAll('.phyto-card-button-v350[data-herb-id-v350]').forEach(card => {
            if (card.dataset.wiredV350 === 'true') return;
            card.dataset.wiredV350 = 'true';
            card.addEventListener('click', function () {
                openModal(card.dataset.herbIdV350);
            });
        });
        root.querySelectorAll('.phyto-herbal-card-v232').forEach(card => {
            if (card.dataset.wiredV350 === 'true') return;
            const title = card.querySelector('h3')?.textContent || '';
            const key = normalizeHerbKey(title);
            if (!key || !herbCatalog[key]) return;
            card.dataset.wiredV350 = 'true';
            card.classList.add('is-clickable-v350');
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `${title.trim()} detayını aç`);
            const opener = function () { openModal(key); };
            card.addEventListener('click', opener);
            card.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    opener();
                }
            });
        });
    }

    function renderConditionHerbs(key) {
        if (!conditionHerbGrid || !diseaseSets[key]) return;
        window.phytoActiveDiseaseV413 = key;
        const data = diseaseSets[key];
        if (conditionHerbKicker) conditionHerbKicker.textContent = `${data.short.toUpperCase()} • FİTOTERAPİ`;
        if (conditionHerbTitle) conditionHerbTitle.textContent = data.title;
        conditionHerbGrid.innerHTML = data.herbs.map((id, index) => {
            const herb = herbCatalog[id];
            if (!herb) return '';
            const context = getDiseaseHerbContentV413(key, id);
            return `
                <article class="phyto-herbal-card-v232 is-clickable-v350 phyto-card-v413" data-herb-id-v350="${id}" data-disease-key-v413="${key}" tabindex="0" role="button" aria-label="${herb.name} • ${context.diseaseName} detayını aç">
                    <div class="phyto-card-visual-v413">
                        <img src="${herb.image}" alt="${herb.name} görseli" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='phyto-biberiye-v412.webp';">
                        <span class="phyto-number-v413">${String(index + 1).padStart(2, '0')}</span>
                        <span class="phyto-disease-badge-v413">${context.badge}</span>
                    </div>
                    <div class="phyto-card-content-v413">
                        <span class="phyto-card-kicker-v413">${context.diseaseName} • Bitkisel Destek</span>
                        <h3>${herb.name}</h3>
                        <p>${context.summary}</p>
                        <div class="phyto-card-focus-v413">${(context.focus || []).slice(0,2).map(item => `<span>${item}</span>`).join('')}</div>
                        <strong class="phyto-card-cta-v413">Hastalığa özel detayı incele</strong>
                    </div>
                </article>
            `;
        }).join('');
        if (conditionHerbNote) conditionHerbNote.textContent = data.note;
        wireHerbTriggers(conditionHerbGrid);
    }

    function patchConditionPage() {
        if (typeof window.openConditionDiseaseV246 === 'function' && !window._phytoConditionPatchedV350) {
            const original = window.openConditionDiseaseV246;
            const wrapped = function (key, push) {
                const result = original(key, push);
                setTimeout(function () { renderConditionHerbs(key); }, 30);
                return result;
            };
            window.openConditionDiseaseV246 = wrapped;
            window.openConditionDiseaseV249 = wrapped;
            window._phytoConditionPatchedV350 = true;
        }
    }

    ensureMainPhytoFilters();
    ensureModal();
    wireHerbTriggers(document);
    patchConditionPage();

    const observer = new MutationObserver(function () {
        wireHerbTriggers(document);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // V351: Aynı fitoterapi verisini tedavi alanları özel sekmelerinde de kullan.
    window.phytoHerbCatalogV350 = herbCatalog;
    window.phytoDiseaseSetsV350 = diseaseSets;
    window.phytoNormalizeHerbKeyV350 = normalizeHerbKey;
    window.phytoDiseaseMetaV413 = diseaseMetaV413;
    window.phytoDiseaseCardContentV413 = diseaseCardContentV413;
    window.phytoGetDiseaseHerbContentV413 = getDiseaseHerbContentV413;
    window.phytoActiveDiseaseV413 = activeMainDisease;
})();


// =========================================================
// V351 - Tedavi Alanları Bitkisel Destek sekmesini düzelt +
// bitki kartlarını Bel/Sırt ağrısı gibi ayrı özel sayfada aç.
// =========================================================
(function () {
    const catalog = window.phytoHerbCatalogV350 || {};
    const diseaseSets = window.phytoDiseaseSetsV350 || {};
    const normalizeKey = window.phytoNormalizeHerbKeyV350 || function(){ return ''; };
    const getDiseaseContent = window.phytoGetDiseaseHerbContentV413 || function(diseaseKey, herbKey){
        const herb = catalog[herbKey] || {};
        return { diseaseKey: diseaseKey || '', diseaseName: 'Genel Bitkisel Destek', badge: 'FİTOTERAPİ', summary: herb.intro || '', why: herb.intro || '', focus: herb.benefits || [], evidence: 'Bitkisel ürünler mevcut tıbbi tedavinin yerine geçmez.' };
    };
    const detailView = document.getElementById('phytoHerbDetailV351');
    const detailKicker = document.querySelector('#phytoHerbDetailV351 .phyto-herb-head-copy-v351 > span');
    const detailTitle = document.getElementById('phytoHerbTitleV351');
    const detailSubtitle = document.getElementById('phytoHerbSubtitleV351');
    const detailImage = document.getElementById('phytoHerbImageV351');
    const detailTags = document.getElementById('phytoHerbTagsV351');
    const detailPanel = document.getElementById('phytoHerbPanelV351');
    const backButton = document.getElementById('phytoHerbBackV351');
    const detailTabs = Array.from(document.querySelectorAll('[data-phyto-herb-tab-v351]'));
    let activeHerb = '';
    let activeDisease = '';
    let activeTab = 'overview';
    let previousScrollY = 0;
    let lastDiseaseKey = '';

    if (!detailView || !detailPanel) return;

    function escapeText(value) {
        return String(value || '').replace(/[&<>\"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[ch] || ch));
    }

    function findHerbKey(card) {
        const direct = card?.dataset?.herbIdV350;
        if (direct && catalog[direct]) return direct;
        const title = card?.querySelector?.('h3')?.textContent || '';
        const normalized = normalizeKey(title);
        if (normalized && catalog[normalized]) return normalized;
        const lower = title.toLocaleLowerCase('tr-TR');
        return Object.keys(catalog).find(key => {
            const herbName = (catalog[key]?.name || '').toLocaleLowerCase('tr-TR');
            return herbName && lower.includes(herbName);
        }) || '';
    }

    function renderDetail() {
        const herb = catalog[activeHerb];
        if (!herb) return;
        const context = getDiseaseContent(activeDisease, activeHerb);
        detailTabs.forEach(btn => btn.classList.toggle('is-active', btn.dataset.phytoHerbTabV351 === activeTab));
        if (detailKicker) detailKicker.textContent = `${context.badge} • ${context.diseaseName.toLocaleUpperCase('tr-TR')}`;
        detailTitle.textContent = herb.name || 'Bitki Detayı';
        detailSubtitle.textContent = `${context.diseaseName} • ${herb.subtitle || 'bitkisel destek'} • hastalığa özel değerlendirme`;
        detailImage.src = herb.image || 'phyto-biberiye-v412.webp';
        detailImage.alt = `${herb.name || 'Bitki'} görseli`;
        detailImage.onerror = function(){ this.onerror=null; this.src='phyto-biberiye-v412.webp'; };
        detailTags.innerHTML = [`${context.badge} • ${context.diseaseName}`, ...(herb.tags || [])].map((tag,index) => `<span${index === 0 ? ' class="is-context-v413"' : ''}>${escapeText(tag)}</span>`).join('');

        if (activeTab === 'benefits') {
            detailPanel.innerHTML = `
                <div class="phyto-panel-eyebrow-v413"><span>${escapeText(context.badge)}</span> YAKINMA ODAKLARI</div>
                <h3>${escapeText(context.diseaseName)} kapsamında hangi yakınmalar öne çıkıyor?</h3>
                <p class="phyto-panel-lead-v413">${escapeText(context.summary)}</p>
                <div class="phyto-focus-grid-v413">
                    ${(context.focus || []).map((item,index) => `
                        <article><span>${String(index + 1).padStart(2,'0')}</span><div><strong>Yakınma odağı</strong><p>${escapeText(item)}</p></div></article>
                    `).join('')}
                </div>
                <div class="phyto-evidence-note-v413"><strong>Değerlendirme çerçevesi</strong><p>${escapeText(context.evidence)}</p></div>
            `;
        } else if (activeTab === 'usage') {
            detailPanel.innerHTML = `
                <div class="phyto-panel-eyebrow-v413"><span>${escapeText(context.badge)}</span> BU HASTALIKTA NEDEN?</div>
                <h3>${escapeText(herb.name)} neden bu listede yer alıyor?</h3>
                <p class="phyto-panel-lead-v413">${escapeText(context.why)}</p>
                <div class="phyto-assessment-grid-v413">
                    <article><span>01</span><strong>Yakınmayı tanımla</strong><p>${escapeText((context.focus || [])[0] || 'Kişinin öncelikli yakınması belirlenir.')}</p></article>
                    <article><span>02</span><strong>Kişisel uygunluğu kontrol et</strong><p>Kullanılan ilaçlar, eşlik eden hastalıklar, gebelik durumu ve alerji öyküsü birlikte değerlendirilir.</p></article>
                    <article><span>03</span><strong>Destek olarak konumlandır</strong><p>Ürünün formu ve kullanım süresi, mevcut tedaviyi değiştirmeden hekimle birlikte planlanır.</p></article>
                </div>
                <div class="phyto-evidence-note-v413"><strong>Kanıt ve beklenti</strong><p>${escapeText(context.evidence)}</p></div>
            `;
        } else if (activeTab === 'caution') {
            detailPanel.innerHTML = `
                <div class="phyto-panel-eyebrow-v413"><span>GÜVENLİK</span> DİKKAT EDİLECEKLER</div>
                <h3>${escapeText(herb.name)} kullanmadan önce bilinmesi gerekenler</h3>
                <p class="phyto-panel-lead-v413">Bitkisel olması, her ürünün her kişi için veya her dozda güvenli olduğu anlamına gelmez.</p>
                <div class="phyto-warning-grid-v413">
                    <article><span aria-hidden="true">!</span><div><strong>Bitkiye özel uyarı</strong><p>${escapeText(herb.caution || 'Düzenli ilaç kullanan kişiler hekime danışmadan bitkisel ürün başlamamalıdır.')}</p></div></article>
                    <article><span aria-hidden="true">i</span><div><strong>${escapeText(context.diseaseName)} için önemli not</strong><p>${escapeText(context.evidence)}</p></div></article>
                </div>
                <div class="phyto-safety-footer-v413">Mevcut ilaçların dozu değiştirilmemeli veya kesilmemelidir. Yeni bir ürün başlanmadan önce hekim ya da eczacıyla olası etkileşimler kontrol edilmelidir.</div>
            `;
        } else {
            detailPanel.innerHTML = `
                <div class="phyto-panel-eyebrow-v413"><span>${escapeText(context.badge)}</span> HASTALIĞA ÖZEL GENEL BAKIŞ</div>
                <h3>${escapeText(herb.name)}${herb.subtitle ? ` <small>(${escapeText(herb.subtitle)})</small>` : ''}</h3>
                <p class="phyto-panel-lead-v413">${escapeText(context.summary)}</p>
                <div class="phyto-overview-grid-v413">
                    <article class="is-wide-v413"><small>NEDEN BU LİSTEDE?</small><strong>${escapeText(context.diseaseName)} bağlamı</strong><p>${escapeText(context.why)}</p></article>
                    <article><small>YAKLAŞIM</small><strong>Destekleyici kullanım</strong><p>Mevcut tedavinin yerine değil, yakınma ve yaşam kalitesi odaklı tamamlayıcı planın parçası olarak düşünülür.</p></article>
                    <article><small>PLANLAMA</small><strong>Kişiye özel değerlendirme</strong><p>Ürün formu, ilaçlar, eşlik eden hastalıklar ve kişisel tolerans birlikte ele alınır.</p></article>
                </div>
                <div class="phyto-section-head-v413"><span>ÖNE ÇIKAN YAKINMA ODAKLARI</span><small>${escapeText(context.badge)} • 3 BAŞLIK</small></div>
                <ul class="phyto-herb-list-v351 phyto-herb-list-v413">${(context.focus || []).map(item => `<li>${escapeText(item)}</li>`).join('')}</ul>
                <div class="phyto-evidence-note-v413"><strong>Tıbbi çerçeve</strong><p>${escapeText(context.evidence)}</p></div>
            `;
        }
    }

    function openHerbDetail(key, diseaseKey = '') {
        if (!catalog[key]) return;
        activeHerb = key;
        activeDisease = diseaseKey && diseaseSets[diseaseKey]
            ? diseaseKey
            : (lastDiseaseKey && diseaseSets[lastDiseaseKey] ? lastDiseaseKey : (window.phytoActiveDiseaseV413 || ''));
        activeTab = 'overview';
        previousScrollY = window.scrollY || 0;
        renderDetail();
        document.body.classList.add('phyto-herb-detail-open-v351');
        detailView.setAttribute('aria-hidden','false');
        detailView.scrollTo({top:0, behavior:'auto'});
        window.setTimeout(() => backButton?.focus({preventScroll:true}), 20);
    }

    function closeHerbDetail() {
        document.body.classList.remove('phyto-herb-detail-open-v351');
        detailView.setAttribute('aria-hidden','true');
        window.scrollTo({top:previousScrollY, behavior:'auto'});
    }

    detailTabs.forEach(btn => btn.addEventListener('click', () => {
        activeTab = btn.dataset.phytoHerbTabV351 || 'overview';
        renderDetail();
    }));
    backButton?.addEventListener('click', closeHerbDetail);
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && document.body.classList.contains('phyto-herb-detail-open-v351')) closeHerbDetail();
    });

    function diseaseKeyFromContext(source) {
        if (source === 'as') return 'as';
        if (source === 'ra') return 'ra';
        const state = window.getConditionDiseaseStateV279?.();
        if (state?.key && diseaseSets[state.key]) return state.key;
        const hash = location.hash.replace('#','');
        const match = hash.match(/^(bas-agrisi-migren|fibromiyalji|huzursuz-bacak|iltihabi-bagirsak|kronik-yorgunluk|bel-sirt-agrisi)/);
        if (match && diseaseSets[match[1]]) return match[1];
        return lastDiseaseKey && diseaseSets[lastDiseaseKey] ? lastDiseaseKey : '';
    }

    function herbHubHtml(key) {
        const set = diseaseSets[key];
        if (!set) return '';
        return `
            <section class="phyto-herbal-focus-v232 phyto-disease-hub-v351">
                <div class="phyto-focus-head-v232">
                    <div>
                        <span>${escapeText(set.short || 'FİTOTERAPİ')} • BİTKİSEL DESTEK</span>
                        <h2>${escapeText(set.title)}</h2>
                    </div>
                    <p>${escapeText(set.desc)}</p>
                </div>
                <div class="phyto-herbal-grid-v232">
                    ${(set.herbs || []).map((id,index) => {
                        const herb = catalog[id];
                        if (!herb) return '';
                        const context = getDiseaseContent(key, id);
                        return `
                            <article class="phyto-herbal-card-v232 is-clickable-v350 phyto-card-v413" data-herb-id-v350="${id}" data-disease-key-v413="${key}" tabindex="0" role="button" aria-label="${escapeText(herb.name)} • ${escapeText(context.diseaseName)} detayını aç">
                                <div class="phyto-card-visual-v413">
                                    <img src="${escapeText(herb.image)}" alt="${escapeText(herb.name)} görseli" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='phyto-biberiye-v412.webp';">
                                    <span class="phyto-number-v413">${String(index+1).padStart(2,'0')}</span>
                                    <span class="phyto-disease-badge-v413">${escapeText(context.badge)}</span>
                                </div>
                                <div class="phyto-card-content-v413">
                                    <span class="phyto-card-kicker-v413">${escapeText(context.diseaseName)} • Bitkisel Destek</span>
                                    <h3>${escapeText(herb.name)}</h3>
                                    <p>${escapeText(context.summary)}</p>
                                    <div class="phyto-card-focus-v413">${(context.focus || []).slice(0,2).map(item => `<span>${escapeText(item)}</span>`).join('')}</div>
                                    <strong class="phyto-card-cta-v413">Hastalığa özel detayı incele</strong>
                                </div>
                            </article>`;
                    }).join('')}
                </div>
                <div class="phyto-focus-note-v232"><strong>Önemli Not:</strong><p>${escapeText(set.note)}</p></div>
            </section>`;
    }

    function renderTreatmentHerbHub(source, forcedKey = '') {
        const key = forcedKey && diseaseSets[forcedKey] ? forcedKey : diseaseKeyFromContext(source);
        if (!key || !diseaseSets[key]) return;
        lastDiseaseKey = key;
        window.phytoActiveDiseaseV413 = key;
        const set = diseaseSets[key];
        if (source === 'as') {
            const content = document.getElementById('asSpecialContentV274');
            if (!content) return;
            content.innerHTML = `<section class="as-special-panel-v274"><div class="as-special-panel-head-v274"><span>FİTOTERAPİ & DESTEK</span><h3>${escapeText(set.title)}</h3><p>${escapeText(set.desc)}</p></div>${herbHubHtml(key)}</section>`;
            document.body.classList.add('as-special-open-v274');
            document.getElementById('asSpecialViewV274')?.setAttribute('aria-hidden','false');
            const t = document.getElementById('asSpecialTitleV274'); if(t) t.textContent='Ankilozan Spondilit - Bitkisel Destekler';
            const d = document.getElementById('asSpecialDescV274'); if(d) d.textContent='Fitoterapi başlıklarını aynı özel sayfa düzeninde inceleyin.';
            const i = document.getElementById('asSpecialIndexV274'); if(i) i.textContent='06';
        } else {
            const content = document.getElementById('treatmentSpecialContentV279');
            if (!content) return;
            content.innerHTML = `<section class="as-special-panel-v274"><div class="as-special-panel-head-v274"><span>FİTOTERAPİ & DESTEK</span><h3>${escapeText(set.title)}</h3><p>${escapeText(set.desc)}</p></div>${herbHubHtml(key)}</section>`;
            document.body.classList.add('treatment-special-open-v279');
            document.getElementById('treatmentSpecialViewV279')?.setAttribute('aria-hidden','false');
            const t = document.getElementById('treatmentSpecialTitleV279'); if(t) t.textContent=`${set.short} - Bitkisel Destekler`;
            const d = document.getElementById('treatmentSpecialDescV279'); if(d) d.textContent='Fitoterapi sayfasındaki sistemin aynısı bu hastalık alanında da kullanılır.';
            const i = document.getElementById('treatmentSpecialIndexV279'); if(i) i.textContent='06';
        }
    }

    // V352: Fitoterapi ana hastalık düğmeleri de doğrudan aynı Bitkisel Destekler özel sayfasını açabilsin.
    window.openPhytoTreatmentHerbHubV352 = function (source, forcedKey) {
        renderTreatmentHerbHub(source || 'condition', forcedKey || '');
    };
    window.openPhytoHerbDetailV352 = openHerbDetail;

    // Bitki kartlarında V350 modalı yerine artık tam ekran özel sayfa aç.
    document.addEventListener('click', event => {
        const card = event.target.closest('[data-herb-id-v350], .phyto-herbal-card-v232.is-clickable-v350, .phyto-card-button-v350');
        if (!card || detailView.contains(card)) return;
        const key = findHerbKey(card);
        if (!key) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        openHerbDetail(key, card.dataset.diseaseKeyV413 || '');
    }, true);

    document.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        const card = event.target.closest?.('[data-herb-id-v350], .phyto-herbal-card-v232.is-clickable-v350');
        if (!card) return;
        const key = findHerbKey(card);
        if (!key) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        openHerbDetail(key, card.dataset.diseaseKeyV413 || '');
    }, true);

    // Tedavi alanlarındaki Bitkisel Destekler butonunun her koşulda açılmasını garanti et.
    document.addEventListener('click', event => {
        const asLauncher = event.target.closest('[data-as-special-target-v274="herbs"]');
        const asTab = event.target.closest('[data-as-special-tab-v274="herbs"]');
        const treatmentLauncher = event.target.closest('[data-treatment-special-target-v279="herbs"]');
        const treatmentTab = event.target.closest('[data-treatment-special-tab-v279="herbs"]');
        if (!asLauncher && !asTab && !treatmentLauncher && !treatmentTab) return;

        let source = 'condition';
        if (asLauncher || asTab) source = 'as';
        else if (treatmentLauncher) source = treatmentLauncher.closest('[data-treatment-launch-source-v279]')?.dataset.treatmentLaunchSourceV279 || 'condition';
        else {
            const h = location.hash;
            source = h.includes('romatoid-artrit') || document.body.classList.contains('romatoid-page-open-v198') ? 'ra' : 'condition';
        }
        const stateKey = window.getConditionDiseaseStateV279?.()?.key || '';
        window.setTimeout(() => renderTreatmentHerbHub(source, source === 'condition' ? stateKey : source), 35);
    }, true);
})();


// =========================================================
// V354 - Ozon başlık butonları aç / kapa
// =========================================================
(function () {
    const shell = document.getElementById('ozoneIndexCollapseV354');
    const toggle = document.getElementById('ozoneIndexToggleV354');
    const panel = document.getElementById('ozoneIndexPanelV354');
    if (!shell || !toggle || !panel) return;

    const label = toggle.querySelector('.ozone-index-toggle-label-v354');

    function setOpen(open) {
        shell.classList.toggle('is-open-v354', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.setAttribute('aria-hidden', open ? 'false' : 'true');
        if (label) label.textContent = open ? 'Başlıkları Gizle' : 'Başlıkları Aç';
    }

    toggle.addEventListener('click', function () {
        setOpen(!shell.classList.contains('is-open-v354'));
    });

    setOpen(true);
})();

// =========================================================
// V356 - Osteopati açıldığında doğrudan ana hero'yu viewport başına getir.
// Önceki smooth-scroll davranışının sayfayı boş video alanında bırakmasını engeller.
// =========================================================
(function () {
    const detailPage = document.getElementById('treatmentDetailPageV71');
    const osteoView = document.querySelector('[data-treatment-detail-view="osteopati"]');

    if (!detailPage || !osteoView) return;

    function isOsteoOpenV356() {
        return document.body.classList.contains('treatment-detail-open-v71') &&
               osteoView.classList.contains('active') &&
               detailPage.getAttribute('aria-hidden') !== 'true';
    }

    function syncOsteoStartV356(forceScroll) {
        const open = isOsteoOpenV356();
        document.body.classList.toggle('osteo-main-open-v356', open);
        if (!open || !forceScroll) return;

        const hero = osteoView.querySelector('.osteo-signature-hero-v257, .osteopathy-page-hero-v95');
        if (!hero) return;

        // CSS sınıfı uygulandıktan sonra gerçek hero konumunu al.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const top = hero.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top: Math.max(0, top), left: 0, behavior: 'auto' });
            });
        });
    }

    // Osteopati butonuna basıldığında eski smooth-scroll tamamlanmasını beklemeden
    // ana hero'yu kesin olarak ekran başına al.
    document.addEventListener('click', function (event) {
        const trigger = event.target.closest('[data-treatment-detail="osteopati"], [data-treatment-top="osteopati"]');
        if (!trigger) return;
        setTimeout(() => syncOsteoStartV356(true), 0);
        setTimeout(() => syncOsteoStartV356(true), 90);
    }, true);

    // Geri/ileri, hash ile giriş ve farklı menülerden açılışlarda da aynı davranış.
    window.addEventListener('popstate', () => setTimeout(() => syncOsteoStartV356(true), 30));
    window.addEventListener('hashchange', () => setTimeout(() => syncOsteoStartV356(true), 30));

    const observer = new MutationObserver(() => {
        const wasOpen = document.body.classList.contains('osteo-main-open-v356');
        const open = isOsteoOpenV356();
        document.body.classList.toggle('osteo-main-open-v356', open);
        if (open && !wasOpen) setTimeout(() => syncOsteoStartV356(true), 0);
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    observer.observe(osteoView, { attributes: true, attributeFilter: ['class'] });
    observer.observe(detailPage, { attributes: true, attributeFilter: ['aria-hidden'] });

    syncOsteoStartV356(location.hash === '#osteopati');
})();

// =========================================================
// V357 - Osteopatiyi dış sayfa scroll'undan tamamen bağımsız aç.
// Hero her açılışta kendi tam ekran kabının en üstünden başlar.
// =========================================================
(function () {
    const detailPage = document.getElementById('treatmentDetailPageV71');
    const osteoView = document.querySelector('[data-treatment-detail-view="osteopati"]');
    if (!detailPage || !osteoView) return;

    let wasOpen = false;

    function osteoIsOpenV357() {
        return document.body.classList.contains('treatment-detail-open-v71') &&
            detailPage.getAttribute('aria-hidden') !== 'true' &&
            osteoView.classList.contains('active');
    }

    function startVideoV357() {
        const video = osteoView.querySelector('.osteo-bg-video-v355');
        if (!video) return;
        video.muted = true;
        video.playsInline = true;
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        const promise = video.play();
        if (promise && typeof promise.catch === 'function') promise.catch(() => {});
    }

    function syncV357(forceTop) {
        const open = osteoIsOpenV357();
        document.body.classList.toggle('osteo-main-fixed-v357', open);

        if (!open) {
            wasOpen = false;
            return;
        }

        if (!wasOpen || forceTop) {
            detailPage.scrollTop = 0;
            osteoView.scrollTop = 0;
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

            requestAnimationFrame(() => {
                detailPage.scrollTop = 0;
                startVideoV357();
                requestAnimationFrame(() => {
                    detailPage.scrollTop = 0;
                    startVideoV357();
                });
            });
        }

        wasOpen = true;
    }

    document.addEventListener('click', function (event) {
        const trigger = event.target.closest('[data-treatment-detail="osteopati"], [data-treatment-top="osteopati"]');
        if (!trigger) return;
        setTimeout(() => syncV357(true), 0);
        setTimeout(() => syncV357(true), 60);
        setTimeout(() => syncV357(true), 180);
    }, true);

    const observer = new MutationObserver(() => syncV357(false));
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    observer.observe(detailPage, { attributes: true, attributeFilter: ['aria-hidden'] });
    observer.observe(osteoView, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('hashchange', () => setTimeout(() => syncV357(true), 20));
    window.addEventListener('popstate', () => setTimeout(() => syncV357(true), 20));
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && osteoIsOpenV357()) startVideoV357();
    });

    syncV357(location.hash === '#osteopati');
})();

// =========================================================
// V359 - Osteopati video arka planını aktif görünümde sürekli çalıştır.
// =========================================================
(function () {
    const osteo = document.querySelector('[data-treatment-detail-view="osteopati"]');
    if (!osteo) return;
    const video = osteo.querySelector('.osteo-bg-video-v355');
    if (!video) return;

    function ensurePlayV359() {
        if (!osteo.classList.contains('active')) return;
        video.muted = true;
        video.defaultMuted = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('autoplay', '');
        const p = video.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
    }

    video.addEventListener('loadeddata', ensurePlayV359);
    video.addEventListener('canplay', ensurePlayV359);
    video.addEventListener('pause', () => {
        if (osteo.classList.contains('active') && !document.hidden) setTimeout(ensurePlayV359, 120);
    });

    const obs = new MutationObserver(() => {
        if (osteo.classList.contains('active')) {
            requestAnimationFrame(ensurePlayV359);
            setTimeout(ensurePlayV359, 160);
            setTimeout(ensurePlayV359, 700);
        }
    });
    obs.observe(osteo, { attributes: true, attributeFilter: ['class'] });

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) ensurePlayV359();
    });

    document.addEventListener('click', (event) => {
        if (event.target.closest('[data-treatment-detail="osteopati"], [data-treatment-top="osteopati"]')) {
            setTimeout(ensurePlayV359, 40);
            setTimeout(ensurePlayV359, 300);
        }
    }, true);

    ensurePlayV359();
})();

// =========================================================
// V361 - OSTEOPATİ EGZERSİZ OYNATMA LİSTELERİ
// Şimdilik kartlar kanalın Oynatma Listeleri sayfasına gider.
// Özel playlist URL'leri geldiğinde aşağıdaki alanlara yazılması yeterlidir.
// =========================================================
(function () {
    const playlistUrlsV361 = {
        "boyun": "",
        "omuz-kol": "",
        "bel-sirt": "",
        "kalca-diz": "",
        "ayak-bilek": "",
        "postur-esneme": ""
    };

    document.querySelectorAll('[data-playlist-slot-v361]').forEach(function (card) {
        const key = card.getAttribute('data-playlist-slot-v361');
        const url = playlistUrlsV361[key];
        if (url) card.href = url;
    });
})();

// =========================================================
// V362 - İĞNELİ UYGULAMALAR: OZON / PROLOTERAPİ / NÖRAL TERAPİ / NÖRALPRO
// Serum kartlarındaki mantıkla özel bilgi sayfası açar.
// =========================================================
(function () {
    const view = document.querySelector('[data-treatment-detail-view="igne"]');
    if (!view || view.dataset.injectionDetailV362 === 'true') return;
    view.dataset.injectionDetailV362 = 'true';

    const detailData = {
        'Ozon': {
            chip: 'LOKAL OZON ENJEKSİYONU',
            title: 'Lokal Ozon Enjeksiyonu',
            image: './injection-ozon-v80.png?v=150',
            intro: 'Tıbbi ozon jeneratöründe medikal oksijenden hazırlanan kontrollü oksijen-ozon gaz karışımının, hekim tarafından seçilmiş eklem çevresi veya yumuşak doku bölgelerine lokal olarak uygulanmasını ifade eder.',
            tags: ['Lokal uygulama', 'Eklem & yumuşak doku', 'Kişiye özel planlama'],
            panels: [
                {
                    kicker: 'TEMEL BİLGİ',
                    title: 'Ozonlu iğne nedir?',
                    body: 'Burada uygulanan madde klasik anlamda bir ilaç ampulü değildir. Medikal ozon cihazında uygulama sırasında hazırlanan oksijen-ozon gaz karışımı steril enjektöre alınır ve hedef dokuya göre lokal enjeksiyon planlanır.'
                },
                {
                    kicker: 'PLANLAMA',
                    title: 'Nasıl uygulanır?',
                    body: 'Önce ağrının kaynağı ve hedef anatomik bölge belirlenir. Cilt temizliği ve steril hazırlık sonrası, seçilmiş hastalarda eklem içi, eklem çevresi veya yumuşak doku düzeyinde lokal uygulama düşünülebilir. Gerektiğinde ultrason rehberliği kullanılabilir.'
                },
                {
                    kicker: 'DEĞERLENDİRME',
                    title: 'Hangi yakınmalarda gündeme gelebilir?',
                    list: [
                        'Eklem çevresinde ağrı, hassasiyet ve hareket kısıtlılığı görülen seçilmiş durumlar',
                        'Kas-tendon-bağ kaynaklı bölgesel yakınmaların tamamlayıcı yönetimi',
                        'Muayene ile hedef dokunun net olarak belirlendiği lokal kas-iskelet sistemi problemleri'
                    ]
                },
                {
                    kicker: 'MEKANİZMA',
                    title: 'Nasıl etki göstermesi beklenir?',
                    body: 'Lokal ozon uygulamalarının kontrollü oksidatif uyarı, redoks sinyalleri ve inflamatuvar süreçlerle ilişkili mekanizmaları araştırılmaktadır. Bu mekanizmaların klinik sonucu kişiye, hedef dokuya ve temel probleme göre değişebilir.'
                }
            ],
            note: 'Lokal ozon enjeksiyonu, mevcut tanı ve temel tedavinin yerine geçmez. Uygulamanın yöntemi, konsantrasyonu ve seans planı hekim değerlendirmesine göre belirlenmelidir.',
            safety: '<strong>Önemli güvenlik ayrımı:</strong> Burada anlatılan uygulama lokal enjeksiyondur. Ozon gazının doğrudan damar içine verilmesi aynı işlem değildir ve güvenli bir uygulama olarak değerlendirilmez.'
        },
        'Proloterapi': {
            chip: 'REJENERATİF ENJEKSİYON',
            title: 'Proloterapi',
            image: './injection-proloterapi-v80.png?v=150',
            intro: 'Proloterapi, özellikle bağ, tendon ve eklem çevresindeki seçilmiş kas-iskelet sistemi yakınmalarında kullanılan enjeksiyon temelli bir yaklaşımdır. En sık kullanılan solüsyonlardan biri hipertonik dekstrozdur.',
            tags: ['Bağ & tendon', 'Entez bölgeleri', 'Doku iyileşme yanıtı'],
            panels: [
                { kicker: 'TEMEL BİLGİ', title: 'Proloterapi nedir?', body: 'Amaç yalnızca ağrıyı geçici olarak baskılamak değil; seçilmiş hedef dokuda vücudun iyileşme yanıtıyla ilişkili süreçleri uyarmaya çalışmaktır. Mekanizma tek bir yola indirgenemez.' },
                { kicker: 'HEDEF DOKU', title: 'Nerelere uygulanabilir?', body: 'Muayene sonrasında bağ-tendon yapışma bölgeleri, eklem çevresi dokular veya belirli yumuşak doku hedefleri seçilebilir. Uygulama noktası şikâyetin yerine göre değil, klinik değerlendirmeye göre belirlenir.' },
                { kicker: 'SÜREÇ', title: 'İlk günlerde ne olabilir?', list: ['Enjeksiyon bölgesinde geçici hassasiyet veya dolgunluk', 'İlk günlerde ağrıda kısa süreli artış', 'Kişiye göre değişen toparlanma süreci ve kontrollü hareket planı'] },
                { kicker: 'PLANLAMA', title: 'Kaç seans gerekir?', body: 'Herkes için sabit bir seans sayısı yoktur. Tanı, hedef doku, şikâyetin süresi ve klinik yanıt birlikte değerlendirilir.' }
            ],
            note: 'Proloterapi her kas-iskelet sistemi ağrısına uygun değildir. Önce doğru tanı, ardından uygun hedef dokunun belirlenmesi gerekir.',
            safety: '<strong>Dikkat:</strong> Kullanılan ilaçlar, kanama riski, aktif enfeksiyon ve genel sağlık durumu uygulama öncesinde hekime bildirilmelidir.'
        },
        'Nöral Terapi': {
            chip: 'LOKAL ANESTEZİK TEMELLİ YAKLAŞIM',
            title: 'Nöral Terapi',
            image: './injection-noral-terapi-v80.png?v=150',
            intro: 'Nöral terapi; seçilmiş deri, skar, tetik nokta veya belirli anatomik alanlara lokal anestezik içeren enjeksiyonların planlanabildiği tamamlayıcı bir yaklaşımdır.',
            tags: ['Skar değerlendirmesi', 'Tetik noktalar', 'Ağrı modülasyonu'],
            panels: [
                { kicker: 'TEMEL BİLGİ', title: 'Nöral terapi nedir?', body: 'Uygulama genellikle düşük konsantrasyonlu lokal anesteziklerin belirlenmiş noktalara enjeksiyonuna dayanır. Hedef, ağrı ve otonom sinir sistemiyle ilişkili yanıtların klinik değerlendirme içinde ele alınmasıdır.' },
                { kicker: 'DEĞERLENDİRME', title: 'Hangi bölgeler seçilebilir?', body: 'Skar dokuları, tetik noktalar, hassas cilt alanları veya anatomik değerlendirmeyle ilişkili seçilmiş bölgeler hekim tarafından belirlenebilir.' },
                { kicker: 'KANIT', title: 'Ne beklenmeli?', body: 'Farklı yakınmalarda kullanımı bildirilmiş olsa da klinik kanıt düzeyi endikasyona göre değişir. Bu nedenle uygulama kişiye özel ve tamamlayıcı çerçevede değerlendirilmelidir.' },
                { kicker: 'GÜVENLİK', title: 'Neler değerlendirilir?', list: ['Lokal anesteziklere karşı bilinen alerji', 'Kanama riski ve kullanılan ilaçlar', 'Uygulama bölgesinde enfeksiyon veya cilt problemi'] }
            ],
            note: 'Nöral terapi ana tanı ve tedavinin yerine geçmez. Uygunluk, hedef bölge ve içerik hekim değerlendirmesiyle planlanır.',
            safety: '<strong>Dikkat:</strong> Lokal anesteziklere karşı geçmişte gelişmiş reaksiyonlar ve kullanılan tüm ilaçlar uygulama öncesinde hekime bildirilmelidir.'
        },
        'NöralPro': {
            chip: 'KİŞİYE ÖZEL ENJEKSİYON PLANI',
            title: 'NöralPro',
            image: './injection-noralpro-v80.png?v=150',
            intro: 'NöralPro, klinikte muayene ve hedef doku değerlendirmesi sonrasında kişiye özel planlanan enjeksiyon yaklaşımı olarak ele alınır. İçerik, bölge ve seans planı hastaya göre belirlenir.',
            tags: ['Kişiye özel', 'Hedef doku', 'Klinik planlama'],
            panels: [
                { kicker: 'YAKLAŞIM', title: 'NöralPro nasıl düşünülmeli?', body: 'Bu başlık herkese aynı içerikle uygulanan sabit bir formül olarak değerlendirilmez. Öncelik, kişinin şikâyetini ve hedef dokuyu belirlemek, ardından uygun enjeksiyon planını oluşturmaktır.' },
                { kicker: 'PLANLAMA', title: 'İçerik ve bölge nasıl belirlenir?', body: 'Muayene bulguları, mevcut hastalıklar, kullanılan ilaçlar ve hedeflenen klinik amaç birlikte değerlendirilir. Uygulama bölgesi ve kullanılacak içerik buna göre kişiselleştirilir.' },
                { kicker: 'TAKİP', title: 'Tedavi yanıtı nasıl izlenir?', list: ['Ağrı ve hassasiyet düzeyi', 'Hareket kapasitesi ve günlük fonksiyon', 'Uygulama sonrası klinik değişim ve yeniden değerlendirme'] },
                { kicker: 'SINIRLAR', title: 'Her hastaya uygun mudur?', body: 'Hayır. Enjeksiyon gereksinimi olmayan veya farklı tedavinin öncelikli olduğu kişilerde kullanılmayabilir. Uygunluk yalnızca klinik değerlendirme sonrasında belirlenir.' }
            ],
            note: 'NöralPro adı altında uygulanacak içerik ve yöntem kişiye göre değişebileceği için, web sayfasındaki bilgi genel çerçeve sunar; kişisel plan muayene sonrasında belirlenir.',
            safety: '<strong>Güvenlik:</strong> Kullanılan tüm ilaçlar, alerji öyküsü, kanama riski ve eşlik eden hastalıklar enjeksiyon planlanmadan önce hekime bildirilmelidir.'
        }
    };

    const cards = Array.from(view.querySelectorAll('.injection-card-v72'));
    const supportedCards = cards.filter(card => detailData[(card.querySelector('h2')?.textContent || '').trim()]);
    if (!supportedCards.length) return;

    const detail = document.createElement('section');
    detail.className = 'injection-special-detail-v362';
    detail.id = 'injectionSpecialDetailV362';
    detail.setAttribute('aria-hidden', 'true');
    detail.innerHTML = `
        <div class="injection-special-topbar-v362">
            <button type="button" class="injection-special-back-v362" id="injectionSpecialBackV362">← İğne Uygulamalarına Dön</button>
            <div class="injection-special-heading-v362">
                <small>İĞNELİ UYGULAMA</small>
                <strong id="injectionSpecialTopTitleV362">Detaylı Bilgi</strong>
            </div>
            <span class="injection-special-chip-v362" id="injectionSpecialTopChipV362">Bilgi Edin</span>
        </div>
        <div class="injection-special-shell-v362" id="injectionSpecialContentV362"></div>
    `;
    view.appendChild(detail);

    const content = detail.querySelector('#injectionSpecialContentV362');
    const topTitle = detail.querySelector('#injectionSpecialTopTitleV362');
    const topChip = detail.querySelector('#injectionSpecialTopChipV362');
    const backButton = detail.querySelector('#injectionSpecialBackV362');
    let lastTrigger = null;

    function render(key) {
        const data = detailData[key];
        if (!data) return;
        topTitle.textContent = data.title;
        topChip.textContent = data.chip;
        content.innerHTML = `
            <section class="injection-special-hero-v362">
                <div class="injection-special-media-v362">
                    <img src="${data.image}" alt="${data.title} uygulamasını temsil eden medikal görsel">
                </div>
                <div class="injection-special-copy-v362">
                    <span>${data.chip}</span>
                    <h1>${data.title}</h1>
                    <p>${data.intro}</p>
                    <div class="injection-special-tags-v362">${data.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
                </div>
            </section>
            <section class="injection-special-grid-v362">
                ${data.panels.map(panel => `
                    <article class="injection-special-panel-v362">
                        <small>${panel.kicker}</small>
                        <h2>${panel.title}</h2>
                        ${panel.body ? `<p>${panel.body}</p>` : ''}
                        ${panel.list ? `<ul>${panel.list.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
                    </article>
                `).join('')}
            </section>
            <div class="injection-special-note-v362"><strong>Klinik yaklaşım:</strong> ${data.note}</div>
            <div class="injection-ozone-safety-v362">${data.safety}</div>
        `;
    }

    function scrollViewTop() {
        const top = view.getBoundingClientRect().top + window.scrollY - 8;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }

    function openDetail(key, trigger) {
        lastTrigger = trigger || null;
        render(key);
        view.classList.add('injection-detail-active-v362');
        detail.setAttribute('aria-hidden', 'false');
        requestAnimationFrame(scrollViewTop);
    }

    function closeDetail() {
        view.classList.remove('injection-detail-active-v362');
        detail.setAttribute('aria-hidden', 'true');
        if (lastTrigger) {
            requestAnimationFrame(() => {
                lastTrigger.closest('.injection-card-v72')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        }
    }

    supportedCards.forEach(card => {
        const key = (card.querySelector('h2')?.textContent || '').trim();
        card.classList.add('injection-detail-ready-v362');
        card.dataset.injectionDetailKeyV362 = key;

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'injection-detail-open-v362';
        button.textContent = 'Bilgi Edin';
        button.setAttribute('aria-label', `${key} hakkında detaylı bilgi aç`);
        card.appendChild(button);

        button.addEventListener('click', event => {
            event.stopPropagation();
            openDetail(key, button);
        });

        card.addEventListener('click', event => {
            if (event.target.closest('button, a')) return;
            openDetail(key, button);
        });
    });

    backButton?.addEventListener('click', closeDetail);

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && view.classList.contains('injection-detail-active-v362')) {
            closeDetail();
        }
    });
})();

// =========================================================
// V364 - Manuel uygulama kartları -> bağımsız detay sayfaları
// =========================================================
(function(){
    const page=document.getElementById('osteoManualDetailPageV364');
    const back=document.getElementById('osteoManualDetailBackV364');
    if(!page) return;
    const title=document.getElementById('osteoManualDetailTitleV364');
    const kicker=document.getElementById('osteoManualDetailKickerV364');
    const intro=document.getElementById('osteoManualDetailIntroV364');
    const index=document.getElementById('osteoManualDetailIndexV364');
    const views=[...page.querySelectorAll('[data-manual-view-v364]')];
    const meta={
        'postur':['01','OSTEOPATİ • POSTÜR ANALİZİ','Postür Analizi','Oturma, ayakta durma ve yürüyüş sırasında vücudun yükü nasıl taşıdığını görsel örneklerle inceleyin.'],
        'somato-visseral':['02','OSTEOPATİ • FONKSİYONEL İLİŞKİLER','Somato-Visseral Bağlantı','Diyafram-solunum, karın-bel-pelvis ve stres-otonom sistem ilişkilerini üç başlıkta ayrıntılı inceleyin.'],
        'mobilizasyon':['03','OSTEOPATİ • KONTROLLÜ HAREKET','Mobilizasyon','Eklem hareket açıklığı, omurga segmentleri ve aktif hareketle bütünleştirme yaklaşımını görsellerle inceleyin.'],
        'pelvis-omurga':['04','OSTEOPATİ • HAREKET ZİNCİRİ','Pelvis & Omurga','Boyun, toraks, bel ve pelvis arasındaki hareket ve yük aktarımı ilişkilerini birlikte ele alın.']
    };
    let lastFocus=null;
    function open(key,trigger,options={}){
        if(!meta[key]) return;
        lastFocus=trigger||document.activeElement;
        const m=meta[key]; index.textContent=m[0]; kicker.textContent=m[1]; title.textContent=m[2]; intro.textContent=m[3];
        views.forEach(v=>{const on=v.dataset.manualViewV364===key;v.hidden=!on;v.classList.toggle('is-active-v364',on)});
        page.hidden=false; page.setAttribute('aria-hidden','false'); document.body.classList.add('osteo-manual-detail-open-v364'); page.scrollTop=0;
        const hashV368='#osteopati-manual-'+key;
        if(options.pushHistory!==false && location.hash!==hashV368){
            history.pushState({page:'osteopati-manual-detail',detail:key},'',hashV368);
        }
    }
    function close(){page.hidden=true;page.setAttribute('aria-hidden','true');document.body.classList.remove('osteo-manual-detail-open-v364'); if(lastFocus?.focus) lastFocus.focus();}
    document.addEventListener('click',e=>{const b=e.target.closest('[data-osteo-manual-detail-v364]');if(!b)return;open(b.dataset.osteoManualDetailV364,b)});
    back?.addEventListener('click',()=>{
        if(/^#osteopati-manual-(postur|somato-visseral|mobilizasyon|pelvis-omurga)$/.test(location.hash)){
            history.back();
        }else{
            close();
        }
    });
    document.addEventListener('keydown',e=>{
        if(e.key==='Escape'&&!page.hidden){
            if(/^#osteopati-manual-(postur|somato-visseral|mobilizasyon|pelvis-omurga)$/.test(location.hash)){
                history.back();
            }else{
                close();
            }
        }
    });
    window.addEventListener('popstate',()=>{
        const matchV368=location.hash.match(/^#osteopati-manual-(postur|somato-visseral|mobilizasyon|pelvis-omurga)$/);
        if(matchV368){
            open(matchV368[1],null,{pushHistory:false});
            return;
        }
        if(!page.hidden){
            close();
        }
    });
})();
// =========================================================
// V368 - GERİ / İLERİ GEÇMİŞ KOORDİNASYONU
// Örnek: Ana Sayfa -> Fitoterapi -> Osteopati -> Manuel Uygulamalar
// Geri: Manuel Uygulamalar -> Osteopati -> Fitoterapi -> Ana Sayfa
// =========================================================
(function () {
    const validTreatmentsV368 = new Set([
        'osteopati','fitoterapi','cihaz-uygulamalari','robotik-lazer',
        'diger-cihazlar','geleneksel-tedavi','igne','estetik','damar-yolu','ozon-tedavisi'
    ]);

    const detailPageV368 = document.getElementById('treatmentDetailPageV71');
    const treatmentViewsV368 = detailPageV368
        ? Array.from(detailPageV368.querySelectorAll('[data-treatment-detail-view]'))
        : [];
    const topButtonsV368 = Array.from(document.querySelectorAll('[data-treatment-top]'));
    const manualDetailV368 = document.getElementById('osteoManualDetailPageV364');
    const osteoSpecialV368 = document.getElementById('osteoSpecialViewV259');
    const osteoPageV368 = document.querySelector('.osteopathy-page-v95');

    function setTreatmentV368(name) {
        if (!detailPageV368 || !validTreatmentsV368.has(name)) return false;

        const aliases = {
            'robotik-lazer': 'cihaz-uygulamalari',
            'diger-cihazlar': 'cihaz-uygulamalari'
        };
        const selected = aliases[name] || name;

        document.body.classList.add('treatment-detail-open-v71');
        detailPageV368.setAttribute('aria-hidden', 'false');

        treatmentViewsV368.forEach(view => {
            view.classList.toggle('active', view.dataset.treatmentDetailView === selected);
        });

        topButtonsV368.forEach(button => {
            button.classList.toggle('is-current-v74', button.dataset.treatmentTop === selected);
        });

        return true;
    }

    function closeManualV368() {
        if (!manualDetailV368) return;
        manualDetailV368.hidden = true;
        manualDetailV368.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('osteo-manual-detail-open-v364');
    }

    function closeOsteoSpecialV368() {
        if (!osteoSpecialV368) return;
        document.body.classList.remove('osteo-standalone-open-v260');
        if (osteoPageV368) osteoPageV368.classList.remove('is-special-view-open-v259');
        osteoSpecialV368.hidden = true;
        osteoSpecialV368.setAttribute('aria-hidden', 'true');
    }

    function syncRouteV368() {
        const hash = location.hash;
        const route = hash.replace('#', '');

        if (/^osteopati-manual-(postur|somato-visseral|mobilizasyon|pelvis-omurga)$/.test(route)) {
            setTreatmentV368('osteopati');
            return;
        }

        if (/^osteopati-(manual|exercise|sports|pain|faq|articles)$/.test(route)) {
            closeManualV368();
            setTreatmentV368('osteopati');
            return;
        }

        if (validTreatmentsV368.has(route)) {
            closeManualV368();
            closeOsteoSpecialV368();
            setTreatmentV368(route);
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            return;
        }

        if (!hash) {
            closeManualV368();
            closeOsteoSpecialV368();
            if (detailPageV368) detailPageV368.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('treatment-detail-open-v71');
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }
    }

    window.addEventListener('popstate', () => {
        // Eski modüllerin popstate işlemleri bittikten sonra son görünümü eşitle.
        setTimeout(syncRouteV368, 0);
    });

    window.addEventListener('pageshow', () => {
        setTimeout(syncRouteV368, 0);
    });
})();


// =========================================================
// V370 - Osteopati Soru & Cevap gelişmiş akordeon animasyonu
// =========================================================
(function(){
    const section = document.getElementById('osteoFaqV105');
    if (!section) return;

    const items = Array.from(section.querySelectorAll('.osteo-faq-item-v370'));

    function setHeight(answer, open){
        if (!answer) return;
        if (!open){
            answer.style.maxHeight = null;
            return;
        }
        requestAnimationFrame(() => {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        });
    }

    items.forEach(item => {
        const button = item.querySelector(':scope > button');
        const answer = item.querySelector('.osteo-faq-answer-v105');
        if (!button || !answer) return;

        button.addEventListener('click', () => {
            // Eski V105 dinleyicisi de çalıştığı için son görsel durumu bir sonraki frame'de eşitle.
            requestAnimationFrame(() => {
                items.forEach(other => {
                    const otherAnswer = other.querySelector('.osteo-faq-answer-v105');
                    const otherButton = other.querySelector(':scope > button');
                    const open = other.classList.contains('open');
                    if (otherButton) otherButton.setAttribute('aria-expanded', open ? 'true' : 'false');
                    setHeight(otherAnswer, open);
                });
            });
        });
    });

    window.addEventListener('resize', () => {
        items.forEach(item => {
            if (!item.classList.contains('open')) return;
            setHeight(item.querySelector('.osteo-faq-answer-v105'), true);
        });
    }, {passive:true});
})();


// =========================================================
// V371 - Osteopati SSS: bağımsız sütun yerleşimi
// Sol sorunun açılması sağ sütunun satır yüksekliğini etkilemez.
// Masaüstünde 1-3-5... solda, 2-4-6... sağda;
// mobilde tekrar 1,2,3,4... doğal sıraya döner.
// =========================================================
(function(){
    const section = document.getElementById('osteoFaqV105');
    if (!section) return;

    const grid = section.querySelector('.osteo-faq-grid-v370');
    if (!grid) return;

    const items = Array.from(grid.querySelectorAll(':scope > .osteo-faq-item-v370'));
    if (!items.length) return;

    items.forEach((item, index) => {
        item.dataset.faqOrderV371 = String(index);
    });

    const left = document.createElement('div');
    const right = document.createElement('div');
    left.className = 'osteo-faq-column-v371 osteo-faq-column-left-v371';
    right.className = 'osteo-faq-column-v371 osteo-faq-column-right-v371';

    let mobile = null;

    function resetAnswerHeightV371(item){
        const answer = item.querySelector('.osteo-faq-answer-v105');
        if (!answer) return;
        if (item.classList.contains('open')) {
            requestAnimationFrame(() => {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            });
        } else {
            answer.style.maxHeight = null;
        }
    }

    function arrangeV371(){
        const nowMobile = window.matchMedia('(max-width: 980px)').matches;
        if (mobile === nowMobile && grid.classList.contains('osteo-faq-independent-v371')) {
            items.forEach(resetAnswerHeightV371);
            return;
        }
        mobile = nowMobile;

        const ordered = items.slice().sort((a,b) =>
            Number(a.dataset.faqOrderV371) - Number(b.dataset.faqOrderV371)
        );

        grid.innerHTML = '';
        grid.classList.add('osteo-faq-independent-v371');

        if (nowMobile) {
            ordered.forEach(item => grid.appendChild(item));
        } else {
            ordered.forEach((item, index) => {
                (index % 2 === 0 ? left : right).appendChild(item);
            });
            grid.append(left, right);
        }

        ordered.forEach(resetAnswerHeightV371);
    }

    arrangeV371();

    let resizeTimerV371 = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimerV371);
        resizeTimerV371 = setTimeout(arrangeV371, 80);
    }, {passive:true});
})();


// =========================================================
// V372 - FİTOTERAPİ CANLI BİTKİ ARAMA
// Bir harf/isim yazıldığında katalogdan eşleşen bitkileri gösterir;
// sonuca tıklanınca mevcut V351 özel bitki detay sayfasını açar.
// =========================================================
(function () {
    const root = document.getElementById('phytoSearchV372');
    const input = document.getElementById('phytoSearchInputV372');
    const searchButton = document.getElementById('phytoSearchButtonV372');
    const clearButton = document.getElementById('phytoSearchClearV372');
    const results = document.getElementById('phytoSearchResultsV372');
    const grid = document.getElementById('phytoSearchResultGridV372');
    const resultLabel = document.getElementById('phytoSearchResultLabelV372');
    const resultCount = document.getElementById('phytoSearchResultCountV372');

    if (!root || !input || !searchButton || !results || !grid) return;

    const catalog = window.phytoHerbCatalogV350 || {};

    function normalize(value) {
        return String(value || '')
            .toLocaleLowerCase('tr-TR')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/ı/g, 'i')
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9\s-]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function escapeHtml(value) {
        return String(value || '').replace(/[&<>"']/g, ch => ({
            '&':'&amp;',
            '<':'&lt;',
            '>':'&gt;',
            '"':'&quot;',
            "'":'&#39;'
        })[ch]);
    }

    function searchableText(key, herb) {
        return normalize([
            key,
            herb?.name,
            herb?.subtitle,
            ...(Array.isArray(herb?.tags) ? herb.tags : []),
            ...(Array.isArray(herb?.benefits) ? herb.benefits : [])
        ].filter(Boolean).join(' '));
    }

    const entries = Object.entries(catalog)
        .filter(([, herb]) => herb && herb.name)
        .map(([key, herb]) => ({
            key,
            herb,
            nameNorm: normalize(herb.name),
            subtitleNorm: normalize(herb.subtitle),
            haystack: searchableText(key, herb)
        }))
        .sort((a,b) => a.herb.name.localeCompare(b.herb.name, 'tr'));

    function findMatches(rawQuery) {
        const q = normalize(rawQuery);
        if (!q) return [];

        // Kullanıcı "b" yazdığında önce B ile başlayan bitkiler görünür.
        const starts = entries.filter(item =>
            item.nameNorm.startsWith(q) ||
            item.subtitleNorm.startsWith(q)
        );

        const includes = entries.filter(item =>
            !starts.includes(item) && item.haystack.includes(q)
        );

        return [...starts, ...includes].slice(0, 12);
    }

    function render(rawQuery, forceOpen = false) {
        const q = String(rawQuery || '').trim();
        clearButton.hidden = !q;

        if (!q) {
            grid.innerHTML = '';
            results.hidden = true;
            input.setAttribute('aria-expanded', 'false');
            return;
        }

        const matches = findMatches(q);
        results.hidden = false;
        input.setAttribute('aria-expanded', 'true');
        if (resultLabel) resultLabel.textContent = `“${q}” için bitkiler`;
        if (resultCount) resultCount.textContent = `${matches.length} sonuç`;

        if (!matches.length) {
            grid.innerHTML = `
                <div class="phyto-search-empty-v372">
                    <div>
                        <strong>Eşleşen bitki bulunamadı.</strong>
                        Farklı bir harf veya bitki adı deneyebilirsiniz.
                    </div>
                </div>`;
            return;
        }

        grid.innerHTML = matches.map(({key, herb}) => `
            <button
                type="button"
                class="phyto-search-result-card-v372"
                data-phyto-search-herb-v372="${escapeHtml(key)}"
                aria-label="${escapeHtml(herb.name)} detay sayfasını aç"
            >
                <img
                    src="${escapeHtml(herb.image || 'phyto-biberiye-v412.webp')}"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    onerror="this.onerror=null;this.src='phyto-biberiye-v412.webp';"
                >
                <span class="phyto-search-result-copy-v372">
                    <strong>${escapeHtml(herb.name)}${herb.subtitle ? ` (${escapeHtml(herb.subtitle)})` : ''}</strong>
                    <small>${escapeHtml((herb.tags || []).slice(0,3).join(' • ') || herb.intro || 'Bitkisel destek bilgisi')}</small>
                </span>
                <span class="phyto-search-result-arrow-v372" aria-hidden="true">↗</span>
            </button>
        `).join('');

        if (forceOpen) {
            const first = grid.querySelector('[data-phyto-search-herb-v372]');
            if (first) first.focus({preventScroll:true});
        }
    }

    function runSearch(focusFirst = false) {
        render(input.value, focusFirst);
    }

    input.addEventListener('input', () => runSearch(false));
    input.addEventListener('focus', () => {
        if (input.value.trim()) runSearch(false);
    });
    input.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            runSearch(true);
        } else if (event.key === 'Escape') {
            results.hidden = true;
            input.setAttribute('aria-expanded','false');
        } else if (event.key === 'ArrowDown' && !results.hidden) {
            const first = grid.querySelector('[data-phyto-search-herb-v372]');
            if (first) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    searchButton.addEventListener('click', () => runSearch(true));

    clearButton.addEventListener('click', () => {
        input.value = '';
        render('');
        input.focus();
    });

    grid.addEventListener('keydown', event => {
        const cards = Array.from(grid.querySelectorAll('[data-phyto-search-herb-v372]'));
        const current = event.target.closest?.('[data-phyto-search-herb-v372]');
        if (!current || !cards.length) return;
        const index = cards.indexOf(current);
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
            event.preventDefault();
            cards[(index + 1) % cards.length].focus();
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
            event.preventDefault();
            cards[(index - 1 + cards.length) % cards.length].focus();
        } else if (event.key === 'Escape') {
            results.hidden = true;
            input.setAttribute('aria-expanded','false');
            input.focus();
        }
    });

    grid.addEventListener('click', event => {
        const card = event.target.closest('[data-phyto-search-herb-v372]');
        if (!card) return;
        const key = card.dataset.phytoSearchHerbV372;
        if (!key) return;

        results.hidden = true;
        input.setAttribute('aria-expanded','false');

        if (typeof window.openPhytoHerbDetailV352 === 'function') {
            window.openPhytoHerbDetailV352(key);
        } else {
            // Nadir bir yükleme sırası durumunda mevcut bitki kartını tetikle.
            const fallback = document.querySelector(`[data-herb-id-v350="${CSS.escape(key)}"]`);
            if (fallback) fallback.click();
        }
    });

    // Arama alanının dışına tıklanınca sonuç kutusunu kapat.
    document.addEventListener('click', event => {
        if (!root.contains(event.target)) {
            results.hidden = true;
            input.setAttribute('aria-expanded','false');
        }
    });

    // Fitoterapi sayfasına her yeniden girişte önceki arama açık kalmasın.
    document.addEventListener('click', event => {
        const target = event.target.closest?.('[data-treatment-detail], [data-treatment-top]');
        if (!target) return;
        if (target.dataset.treatmentDetail === 'fitoterapi' || target.dataset.treatmentTop === 'fitoterapi') return;
        results.hidden = true;
        input.setAttribute('aria-expanded','false');
    }, true);
})();


// =========================================================
// V373 - ANA SAYFA GENEL SİTE ARAMA
// Not: Fitoterapi içindeki TEK TEK bitkiler bilerek indekslenmez.
// Arama yalnızca site bölümleri, tedaviler, hastalık sayfaları ve bilgi alanlarını gösterir.
// =========================================================
(function(){
    const root = document.getElementById('homeSiteSearchV373');
    const input = document.getElementById('homeSiteSearchInputV373');
    const submit = document.getElementById('homeSiteSearchSubmitV373');
    const clear = document.getElementById('homeSiteSearchClearV373');
    const results = document.getElementById('homeSiteSearchResultsV373');
    const list = document.getElementById('homeSiteSearchListV373');
    const count = document.getElementById('homeSiteSearchCountV373');

    if (!root || !input || !results || !list) return;

    function norm(value){
        return String(value || '')
            .toLocaleLowerCase('tr-TR')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g,'')
            .replace(/ı/g,'i')
            .replace(/ğ/g,'g')
            .replace(/ü/g,'u')
            .replace(/ş/g,'s')
            .replace(/ö/g,'o')
            .replace(/ç/g,'c')
            .replace(/[^a-z0-9\s&-]/g,' ')
            .replace(/\s+/g,' ')
            .trim();
    }

    const index = [
        {title:'Osteopati', category:'Tedavi Uygulaması', desc:'Osteopati ana sayfası, manuel değerlendirme, hareket ve soru-cevap alanları.', keys:'osteopati manuel terapi hareket postür', steps:['[data-treatment-detail="osteopati"]'], icon:'O'},
        {title:'Fitoterapi', category:'Tedavi Uygulaması', desc:'Fitoterapi ve bitkisel yaklaşım ana sayfası.', keys:'fitoterapi fito terapi bitkisel destek bitki', steps:['[data-treatment-detail="fitoterapi"]'], icon:'F'},
        {title:'Damar Yolu Uygulamaları', category:'Tedavi Uygulaması', desc:'Serum ve damar yolu uygulamaları bilgi alanı.', keys:'damar yolu serum iv vitamin c l karnitin', steps:['[data-treatment-detail="damar-yolu"]'], icon:'IV'},
        {title:'İğneli Uygulamalar', category:'Tedavi Uygulaması', desc:'Proloterapi, nöral terapi ve diğer enjeksiyon uygulamalarının bulunduğu alan.', keys:'igne iğne enjeksiyon proloterapi nöral terapi neural ozonlu igne', steps:['[data-treatment-detail="igne"]'], icon:'+'},
        {title:'Ozon Tedavisi', category:'Tedavi Uygulaması', desc:'Ozon uygulamaları ve ayrıntılı bilgilendirme sayfası.', keys:'ozon major otohemoterapi minor otohemoterapi', steps:['[data-treatment-detail="ozon-tedavisi"]'], icon:'O₃'},
        {title:'Cihaz Uygulamaları', category:'Tedavi Uygulaması', desc:'Klinikte kullanılan cihaz uygulamaları ve bilgi sayfaları.', keys:'cihaz magneto ems lenf drenaj', steps:['[data-treatment-detail="cihaz-uygulamalari"]'], icon:'C'},
        {title:'Geleneksel Tedaviler', category:'Tedavi Uygulaması', desc:'Akupunktur, hacamat ve sülük uygulamaları.', keys:'geleneksel tedavi akupunktur hacamat suluk sülük hirudoterapi', steps:['[data-treatment-detail="geleneksel-tedavi"]'], icon:'G'},
        {title:'Estetiğe Bakış', category:'Tedavi Uygulaması', desc:'Estetik ve tamamlayıcı yaklaşım bilgi alanı.', keys:'estetik cilt görünüm', steps:['[data-treatment-detail="estetik"]'], icon:'E'},

        {title:'Tedavi Alanları', category:'Ana Bölüm', desc:'Hastalık ve klinik durumlara göre bilgi sayfalarını görüntüleyin.', keys:'tedavi alanlari hastalik hastalıklar', steps:['#heroDiseasesButton'], icon:'T'},
        {title:'Ağrı', category:'Ana Bölüm', desc:'Boyun, sırt, bel, omuz, kalça, diz ve diğer ağrı bölgeleri.', keys:'agri ağrı bel boyun sirt sırt omuz kalca kalça diz', steps:['#heroPainButton'], icon:'A'},
        {title:'Sosyal Medya', category:'Medya', desc:'YouTube, TV programları ve sosyal medya içerikleri.', keys:'medya sosyal medya youtube video tv instagram reels', steps:['#heroMediaButton'], icon:'▶'},
        {title:'Hakkımda', category:'Kurumsal', desc:'Dr. Ceyhun Nuri, eğitimler, görevler, sağlık kurumu ve personeller.', keys:'hakkimda hakkımda ceyhun nuri egitim eğitim görev personel klinik kurum', steps:['#heroAboutButton'], icon:'Dr'},
        {title:'Öne Çıkanlar', category:'Ana Bölüm', desc:'Sitedeki öne çıkan genel içeriklere hızlı erişim.', keys:'one cikanlar öne çıkanlar genel', steps:['#heroGeneralButtonV124'], icon:'★'},

        {title:'Beslenme', category:'Genel Sağlık', desc:'Beslenme yaklaşımı ve genel sağlık içerikleri.', keys:'genel saglik sağlık beslenme diyet', steps:['[data-health-detail="beslenme"]'], icon:'B'},
        {title:'Supplementler', category:'Genel Sağlık', desc:'Takviye edici ürünler hakkında bilgilendirme.', keys:'genel saglik sağlık supplement takviye vitamin mineral', steps:['[data-health-detail="supplementler"]'], icon:'S'},
        {title:'Detoks Kürleri', category:'Genel Sağlık', desc:'35 tarif; mide, bağırsak, karaciğer, kalp, dalak ve kilo kontrolü filtreleri.', keys:'genel saglik sağlık detoks kur kür mide bağırsak karaciğer kalp dalak kilo tarif', steps:['[data-health-detail="kurler"]'], icon:'D'},

        {title:'Ankilozan Spondilit', category:'Tedavi Alanı', desc:'Ankilozan spondilit özel bilgi sayfası.', keys:'as ankilozan spondilit sakroileit omurga', steps:['[data-phyto-disease="as"]'], icon:'AS'},
        {title:'Romatoid Artrit', category:'Tedavi Alanı', desc:'Romatoid artrit özel bilgi sayfası.', keys:'ra romatoid artrit eklem', steps:['[data-phyto-disease="ra"]'], icon:'RA'},
        {title:'Baş Ağrısı & Migren', category:'Tedavi Alanı', desc:'Baş ağrısı ve migren hakkında bilgi sayfası.', keys:'bas baş agrisi ağrısı migren', steps:['[data-phyto-disease="bas-agrisi-migren"]'], icon:'BA'},
        {title:'Bel & Sırt Ağrısı', category:'Tedavi Alanı', desc:'Bel ve sırt ağrısı özel bilgi sayfası.', keys:'bel sirt sırt agrisi ağrısı bel agrisi', steps:['[data-phyto-disease="bel-sirt-agrisi"]'], icon:'BS'},
        {title:'Fibromiyalji', category:'Tedavi Alanı', desc:'Fibromiyalji özel bilgi sayfası.', keys:'fibromiyalji yaygin ağrı yorgunluk hassasiyet', steps:['[data-phyto-disease="fibromiyalji"]'], icon:'F'},
        {title:'Huzursuz Bacak', category:'Tedavi Alanı', desc:'Huzursuz bacak yakınmaları hakkında bilgi sayfası.', keys:'huzursuz bacak sendromu gece bacak', steps:['[data-phyto-disease="huzursuz-bacak"]'], icon:'HB'},
        {title:'İltihabi Bağırsak', category:'Tedavi Alanı', desc:'İltihabi bağırsak hastalıkları bilgi sayfası.', keys:'iltihabi inflamatuar bagirsak bağırsak ibd', steps:['[data-phyto-disease="iltihabi-bagirsak"]'], icon:'İB'},
        {title:'Kronik Yorgunluk', category:'Tedavi Alanı', desc:'Uzun süren yorgunluk ve enerji düşüklüğü hakkında bilgi sayfası.', keys:'kronik yorgunluk enerji halsizlik', steps:['[data-phyto-disease="kronik-yorgunluk"]'], icon:'KY'},

        {title:'Postür Analizi', category:'Osteopati', desc:'Oturma, ayakta durma ve yürüyüş paternlerini inceleyen özel sayfa.', keys:'postur postür duruş oturus oturuş yuruyus yürüyüş analiz', steps:['[data-treatment-detail="osteopati"]','[data-osteo-tab-target="manual"]','[data-osteo-manual-detail-v364="postur"]'], icon:'P'},
        {title:'Somato-Visseral Bağlantı', category:'Osteopati', desc:'Diyafram, solunum, gövde ve kas-iskelet ilişkileri.', keys:'somato visseral visceral diyafram solunum govde gövde', steps:['[data-treatment-detail="osteopati"]','[data-osteo-tab-target="manual"]','[data-osteo-manual-detail-v364="somato-visseral"]'], icon:'SV'},
        {title:'Mobilizasyon', category:'Osteopati', desc:'Eklem ve omurga hareketliliğine yönelik manuel yaklaşım sayfası.', keys:'mobilizasyon eklem hareket omurga segmental', steps:['[data-treatment-detail="osteopati"]','[data-osteo-tab-target="manual"]','[data-osteo-manual-detail-v364="mobilizasyon"]'], icon:'M'},
        {title:'Pelvis & Omurga', category:'Osteopati', desc:'Pelvis, boyun, toraks ve bel arasındaki hareket ve yük aktarımı ilişkileri.', keys:'pelvis omurga bel toraks boyun tilt yuk aktarimi', steps:['[data-treatment-detail="osteopati"]','[data-osteo-tab-target="manual"]','[data-osteo-manual-detail-v364="pelvis-omurga"]'], icon:'PO'},
        {title:'Egzersiz & Hareket', category:'Osteopati', desc:'Bölgelere göre egzersiz videoları ve hareket içerikleri.', keys:'egzersiz hareket video boyun kol omuz bel diz', steps:['[data-treatment-detail="osteopati"]','[data-osteo-tab-target="exercise"]'], icon:'↗'},
        {title:'Spor Yaralanmaları', category:'Osteopati', desc:'Spor ve yüklenmeyle ilişkili değerlendirme içerikleri.', keys:'spor yaralanma yuklenme yüklenme fonksiyon', steps:['[data-treatment-detail="osteopati"]','[data-osteo-tab-target="sports"]'], icon:'S'},
        {title:'Osteopati Soru & Cevap', category:'Osteopati', desc:'Osteopati hakkında sık sorulan sorular ve ayrıntılı cevaplar.', keys:'osteopati soru cevap merak edilenler faq', steps:['[data-treatment-detail="osteopati"]','[data-osteo-tab-target="faq"]'], icon:'?'},
        {title:'Bilimsel Yayınlar', category:'Osteopati', desc:'Osteopati ve hareket alanındaki akademik kaynaklar.', keys:'bilimsel yayin yayın makale akademik kaynak', steps:['[data-treatment-detail="osteopati"]','[data-osteo-tab-target="articles"]'], icon:'≡'}
    ];

    index.forEach(item => {
        item._search = norm([item.title,item.category,item.desc,item.keys].join(' '));
        item._title = norm(item.title);
    });

    function score(item, query){
        if (!query) return 0;
        const words = query.split(' ').filter(Boolean);
        if (!words.every(word => item._search.includes(word))) return -1;
        let value = 0;
        if (item._title === query) value += 120;
        if (item._title.startsWith(query)) value += 80;
        if (item._title.includes(query)) value += 55;
        words.forEach(word => {
            if (item._title.startsWith(word)) value += 24;
            else if (item._title.includes(word)) value += 15;
            else value += 5;
        });
        return value;
    }

    function search(query){
        const q = norm(query);
        if (!q) return [];
        return index
            .map(item => ({item, score:score(item,q)}))
            .filter(entry => entry.score >= 0)
            .sort((a,b) => b.score - a.score || a.item.title.localeCompare(b.item.title,'tr'))
            .slice(0,10)
            .map(entry => entry.item);
    }

    function escapeHtml(value){
        return String(value || '').replace(/[&<>"']/g, ch => ({
            '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
        }[ch]));
    }

    function render(query){
        const q = query.trim();
        clear.hidden = !q;
        if (!q){
            results.hidden = true;
            input.setAttribute('aria-expanded','false');
            list.innerHTML = '';
            return;
        }

        const found = search(q);
        count.textContent = found.length ? `${found.length} sonuç` : 'Sonuç bulunamadı';

        if (!found.length){
            list.innerHTML = `
                <div class="home-site-search-empty-v373">
                    <strong>Bu ifadeyle eşleşen bir bölüm bulamadım.</strong>
                    “Osteopati”, “Fitoterapi”, “Sosyal Medya”, “Ağrı” veya bir hastalık adı deneyebilirsiniz.
                </div>`;
        } else {
            list.innerHTML = found.map((item, i) => `
                <button type="button" class="home-site-search-result-v373" data-home-search-result-v373="${i}">
                    <span class="home-site-search-result-icon-v373" aria-hidden="true">${escapeHtml(item.icon || '↗')}</span>
                    <span class="home-site-search-result-copy-v373">
                        <span>${escapeHtml(item.category)}</span>
                        <strong>${escapeHtml(item.title)}</strong>
                        <small>${escapeHtml(item.desc)}</small>
                    </span>
                    <span class="home-site-search-result-arrow-v373" aria-hidden="true">↗</span>
                </button>
            `).join('');
            Array.from(list.querySelectorAll('[data-home-search-result-v373]')).forEach((button, i) => {
                button._homeSearchItemV373 = found[i];
            });
        }

        results.hidden = false;
        input.setAttribute('aria-expanded','true');
    }

    function clickSelector(selector){
        const el = document.querySelector(selector);
        if (!el) return false;
        el.click();
        return true;
    }

    function navigate(item){
        if (!item || !Array.isArray(item.steps)) return;
        results.hidden = true;
        input.setAttribute('aria-expanded','false');
        if (typeof window.closeHomeSiteSearchV400 === 'function') {
            window.closeHomeSiteSearchV400(false);
        }

        let delay = 0;
        item.steps.forEach((selector, idx) => {
            window.setTimeout(() => {
                const ok = clickSelector(selector);
                if (!ok && idx === 0) {
                    // Güvenli son seçenek: hash bağlantısı olan bir elemanı bul.
                    const hashTarget = document.querySelector(`a[href="#${CSS.escape(norm(item.title).replace(/\s+/g,'-'))}"]`);
                    hashTarget?.click();
                }
            }, delay);
            delay += idx === 0 ? 120 : 140;
        });
    }

    let timer = null;
    input.addEventListener('input', () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => render(input.value), 80);
    });
    input.addEventListener('focus', () => {
        if (input.value.trim()) render(input.value);
    });
    input.addEventListener('keydown', event => {
        if (event.key === 'Enter'){
            event.preventDefault();
            const first = list.querySelector('[data-home-search-result-v373]');
            if (first && first._homeSearchItemV373) navigate(first._homeSearchItemV373);
            else render(input.value);
        } else if (event.key === 'Escape'){
            results.hidden = true;
            input.setAttribute('aria-expanded','false');
        } else if (event.key === 'ArrowDown' && !results.hidden){
            const first = list.querySelector('[data-home-search-result-v373]');
            if (first){
                event.preventDefault();
                first.focus();
            }
        }
    });

    submit?.addEventListener('click', () => {
        const first = list.querySelector('[data-home-search-result-v373]');
        if (first && first._homeSearchItemV373) navigate(first._homeSearchItemV373);
        else render(input.value);
    });

    clear?.addEventListener('click', () => {
        input.value = '';
        render('');
        input.focus();
    });

    list.addEventListener('click', event => {
        const button = event.target.closest('[data-home-search-result-v373]');
        if (!button) return;
        navigate(button._homeSearchItemV373);
    });

    root.addEventListener('click', event => {
        const shortcut = event.target.closest?.('[data-site-search-shortcut-v400]');
        if (!shortcut) return;
        const title = shortcut.dataset.siteSearchShortcutV400 || '';
        const item = index.find(entry => norm(entry.title) === norm(title));
        if (item) navigate(item);
    });

    list.addEventListener('keydown', event => {
        const buttons = Array.from(list.querySelectorAll('[data-home-search-result-v373]'));
        const current = event.target.closest?.('[data-home-search-result-v373]');
        if (!current || !buttons.length) return;
        const indexNow = buttons.indexOf(current);
        if (event.key === 'ArrowDown'){
            event.preventDefault();
            buttons[(indexNow + 1) % buttons.length].focus();
        } else if (event.key === 'ArrowUp'){
            event.preventDefault();
            buttons[(indexNow - 1 + buttons.length) % buttons.length].focus();
        } else if (event.key === 'Escape'){
            results.hidden = true;
            input.setAttribute('aria-expanded','false');
            input.focus();
        }
    });

    document.addEventListener('click', event => {
        if (!root.contains(event.target)){
            results.hidden = true;
            input.setAttribute('aria-expanded','false');
        }
    });
})();


// V374: Ağrı ve Osteopati Ağrı kartları HTML içinde ayaktan yukarı sıralandı.
// Ayrı Diz, Kalça, Bel ve Sırt kartları mevcut V215/V265 detay yönlendirmesini kullanır.


// V375: Ana sayfa genel araması, menü gridinden çıkarılıp bağımsız üst-orta arama paneline taşındı.


// V376: Genel arama fotoğraf üzerinden kaldırıldı ve ana hero sonrasındaki bağımsız bölüme taşındı.


// =========================================================
// V400 - TAM EKRAN SİTE ARAMA MODALI
// Küçük "Sitede Ara" butonu korunur; tıklanınca büyük arama ekranı açılır.
// =========================================================
(function(){
    const section = document.querySelector('.home-search-section-v376');
    const toggle = document.getElementById('homeSearchToggleV377');
    const label = document.getElementById('homeSearchToggleLabelV377');
    const panel = document.getElementById('homeSiteSearchV373');
    const input = document.getElementById('homeSiteSearchInputV373');
    const results = document.getElementById('homeSiteSearchResultsV373');
    const closeButton = document.getElementById('homeSiteSearchCloseV400');
    if (!section || !toggle || !panel) return;

    function setOpen(open, focusInput){
        section.classList.toggle('is-open-v377', open);
        document.body.classList.toggle('site-search-modal-open-v400', open);
        toggle.setAttribute('aria-expanded', String(open));
        panel.hidden = !open;
        panel.setAttribute('aria-hidden', String(!open));
        if (label) label.textContent = 'Sitede Ara';

        if (!open && results) {
            results.hidden = true;
            input?.setAttribute('aria-expanded', 'false');
        }
        if (open && focusInput) {
            window.setTimeout(() => input?.focus(), 120);
        }
    }

    window.openHomeSiteSearchV400 = function(focusInput = true){
        setOpen(true, focusInput);
    };
    window.closeHomeSiteSearchV400 = function(returnFocus = false){
        setOpen(false, false);
        if (returnFocus) window.setTimeout(() => toggle.focus(), 30);
    };

    toggle.addEventListener('click', () => setOpen(true, true));
    closeButton?.addEventListener('click', () => window.closeHomeSiteSearchV400(true));

    panel.addEventListener('click', event => {
        if (event.target === panel) window.closeHomeSiteSearchV400(true);
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !panel.hidden) {
            window.closeHomeSiteSearchV400(true);
        }
    });

    setOpen(false, false);
})();


// V378: Açılır genel arama, ana görselde menü altındaki sol boş alana taşındı.


// V379: Ana sayfa arama düğmesi sağ altta, hızlı iletişim düğmesinin soluna taşındı.

// V380: Osteopati girişinde klinik video arka planı ve yeni uygulama görseli kullanıldı.

// V381: Sağ kartta doktor fotoğrafı yerine bütüncül anatomik omurga-pelvis görseli kullanıldı.

// V382: Osteopati ana açıklaması güncellendi; uygulama videosu altındaki üç rozet kaldırıldı.

// V383: Osteopati ana açıklamasından eklem hareketliliği ifadesi kaldırıldı.

// V384: Beslenme tanıtım alanı kaldırıldı; Hamilelik detayına alt alta 6 açıklamalı tarif eklendi.

// V385: Hamilelik dışındaki yedi beslenme başlığına alt alta 6'şar açıklamalı tarif eklendi.

(() => {
    const sets = {
        balanced: {
            label: 'DENGELİ VE DOĞAL BESLENME • 6 PRATİK TARİF',
            title: 'Günlük Dengeli Beslenme Tarifleri',
            intro: 'Sebze, meyve, tam tahıl, kaliteli protein ve sağlıklı yağları aynı gün içinde çeşitlendirmeyi kolaylaştıran pratik öğün fikirleri.',
            note: 'Porsiyonlar yaşa, aktiviteye, mevcut hastalıklara ve hedeflere göre değişir. Alerji, diyabet, böbrek hastalığı veya özel diyet gereksiniminde tarifleri hekim ve diyetisyenle kişiselleştirin.',
            recipes: [
                ['Akdeniz Kahvaltı Tabağı','GÜNE DENGELİ BAŞLANGIŞ','1 iyi pişmiş yumurta|Domates ve salatalık|Az tuzlu peynir|1 dilim tam tahıllı ekmek|4–5 zeytin','Yumurtayı tamamen pişirin; sebze, peynir, ekmek ve zeytinle birlikte tabağa yerleştirin.','Protein, lif, kompleks karbonhidrat ve sağlıklı yağları aynı öğünde bir araya getirir.','Sabah tokluğunu ve gün içindeki öğün dengesini destekleyebilir; tek başına kilo verme veya hastalık tedavisi sağlamaz.'],
                ['Yoğurtlu Meyveli Yulaf Kasesi','LİFLİ ARA ÖĞÜN','4 yemek kaşığı yulaf|1 kâse yoğurt|1 küçük meyve|2 tam ceviz|Tarçın','Yulafı yoğurtla karıştırın; doğranmış meyve, ceviz ve tarçını ekleyin.','Yulaf ve meyve lif, yoğurt protein ve kalsiyum, ceviz sağlıklı yağ sağlar.','Tatlı isteğine daha dengeli bir alternatif olabilir; tokluk ve günlük lif alımını destekleyebilir.'],
                ['Mercimekli Bulgur Kasesi','BİTKİSEL PROTEİN','5 yemek kaşığı haşlanmış yeşil mercimek|4 yemek kaşığı bulgur|Maydanoz ve roka|Limon|1 tatlı kaşığı zeytinyağı','Pişmiş mercimek ve bulguru yeşilliklerle karıştırın; limon ve zeytinyağı ekleyin.','Baklagil ve tam tahılı birleştirerek bitkisel protein, lif, folat ve demir çeşitliliği sağlar.','Daha uzun tokluk ve bağırsak düzenine katkı sağlayabilir; gaz yakınmasında porsiyonu küçük tutun.'],
                ['Fırında Tavuk ve Renkli Sebzeler','PRATİK ANA ÖĞÜN','1 porsiyon tavuk göğsü|Kabak, biber ve havuç|1 tatlı kaşığı zeytinyağı|Kekik|Yanına yoğurt','Tavuk ve sebzeleri doğrayıp zeytinyağı ve kekikle fırında tamamen pişirin; yoğurtla servis edin.','Yağda kızartmadan protein ve sebze çeşitliliği sağlayan dengeli bir ana öğündür.','Kas dokusunu destekleyen protein alımına ve sebze tüketimini artırmaya yardımcı olabilir.'],
                ['Zeytinyağlı Nohut Salatası','HIZLI ÖĞLE ÖĞÜNÜ','5 yemek kaşığı haşlanmış nohut|Domates ve salatalık|Maydanoz|Limon|1 tatlı kaşığı zeytinyağı','Tüm malzemeleri karıştırın; limon ve zeytinyağıyla servis edin.','Nohut protein ve lif; sebzeler mikrobesin çeşitliliği; zeytinyağı doymamış yağ sağlar.','Öğle öğününde tokluk sağlayabilir ve ultra işlenmiş atıştırmalıklara yönelmeyi azaltmaya yardımcı olabilir.'],
                ['Fırında Balık ve Sebzeli Patates','HAFTALIK BALIK ÖĞÜNÜ','1 porsiyon balık|1 küçük patates|Brokoli veya kabak|Limon|1 tatlı kaşığı zeytinyağı','Balık, patates ve sebzeleri fırında tamamen pişirin; limonla servis edin.','Balık kaliteli protein, seçilen türe göre omega‑3; sebzeler lif ve vitamin çeşitliliği sağlar.','Haftalık protein çeşitliliğini artırabilir ve kızartma yerine daha dengeli bir pişirme yöntemi sunar.']
            ]
        },
        children: {
            label: 'BÜYÜME & GELİŞME • 6 ÇOCUK DOSTU TARİF',
            title: 'Çocuklarda Beslenme Tarifleri',
            intro: 'Yaşa uygun porsiyonlarla protein, demir, kalsiyum, sağlıklı yağ ve sebze-meyve çeşitliliğini artırmaya yardımcı olabilecek aile dostu tarifler.',
            note: 'Porsiyonlar çocuğun yaşına, gelişimine ve iştahına göre ayarlanmalıdır. Boğulma riski taşıyan kuruyemiş, üzüm ve sert besinleri yaşa uygun hazırlayın; alerji ve büyüme sorunu varsa çocuk hekimi ve diyetisyen görüşü alın.',
            recipes: [
                ['Muzlu Yulaflı Mini Pankek','ŞEKERSİZ KAHVALTI','1 küçük muz|1 yumurta|3 yemek kaşığı yulaf unu|2 yemek kaşığı yoğurt|Az tarçın','Malzemeleri ezin; küçük parçalar halinde tavada iki tarafını tamamen pişirin.','Yumurta protein, yulaf lif, muz enerji ve potasyum katkısı sağlar; ilave şeker gerektirmez.','Kahvaltıda daha dengeli tokluk sağlayabilir ve paketli tatlı alternatiflerine ihtiyacı azaltabilir.'],
                ['Sebzeli Kırmızı Mercimek Çorbası','YUMUŞAK VE BESLEYİCİ','Kırmızı mercimek|Havuç|Kabak|Az zeytinyağı|Su','Tüm malzemeleri iyice pişirin; yaşa uygun kıvam için ezin veya blenderdan geçirin.','Mercimek bitkisel protein, demir, folat ve lif; sebzeler vitamin çeşitliliği sağlar.','Sebzeyi doğrudan sevmeyen çocukların farklı tatlara alışmasına ve öğünün besin yoğunluğuna katkı sağlayabilir.'],
                ['Yoğurtlu Meyve ve Yulaf Kupası','PRATİK ARA ÖĞÜN','1 küçük kâse yoğurt|Mevsim meyvesi|1–2 yemek kaşığı yulaf|Öğütülmüş ceviz','Meyveyi küçük doğrayın; yoğurt ve yulafla karıştırın. Cevizi yaşa uygun şekilde çok ince öğütün.','Yoğurt protein ve kalsiyum; meyve ve yulaf lif; ceviz sağlıklı yağ sağlar.','Kemik gelişimini destekleyen besinlerin ve meyve çeşitliliğinin günlük plana eklenmesini kolaylaştırabilir.'],
                ['Fırında Sebzeli Mini Köfte','PROTEİNLİ ANA ÖĞÜN','Az yağlı kıyma|Rendelenmiş kabak ve havuç|Yumurta|Yulaf unu|Kimyon','Malzemeleri yoğurup küçük köfteler yapın; fırında içi tamamen pişene kadar pişirin.','Et protein, demir ve B12; sebzeler lif ve çeşitlilik sağlar.','Büyüme döneminde protein ve demir alımına katkı sağlayabilir; sebzeyi tanıdık bir formda sunar.'],
                ['Fırında Balık Çubukları','BALIKLA TANIŞMA','Kılçıksız balık fileto|Yulaf unu|Yumurta|Az zeytinyağı|Yoğurtlu dip sos','Balığı çubuk kesin; yumurta ve yulaf ununa bulayıp fırında tamamen pişirin. Kılçık kontrolü yapın.','Balık protein ve seçilen türe göre omega‑3 sağlar; fırınlama kızartmaya göre daha dengeli bir seçenektir.','Protein çeşitliliğini artırabilir; balığa alışmayı kolaylaştırabilir.'],
                ['Nohut Ezmesi ve Sebzeli Dürüm','BİTKİSEL ÖĞÜN','Haşlanmış nohut|Yoğurt veya tahin|Limon|İnce doğranmış sebzeler|Tam tahıllı lavaş','Nohudu ezip yoğurt veya az tahin ve limonla karıştırın; sebzelerle lavaşa ince sürüp sarın.','Nohut protein, lif, folat ve demir; tam tahıl ek enerji ve lif sağlar.','Okul öğününde daha dengeli tokluk sağlayabilir; baklagil tüketimini kolaylaştırabilir.']
            ]
        },
        autoimmune: {
            label: 'AS • RA • PsA • 6 AKDENİZ TİPİ TARİF',
            title: 'Otoimmün Hastalıklarda Beslenme Tarifleri',
            intro: 'Tek bir “mucize diyet” yerine sebze, baklagil, tam tahıl, zeytinyağı, kuruyemiş ve balık çeşitliliğini öne çıkaran Akdeniz tipi öğünler.',
            note: 'Bu tarifler AS, RA veya PsA tedavisinin ve ilaçların yerine geçmez. Glutensiz, süt ürünsüz veya başka eliminasyon diyetleri yalnızca tıbbi gerekçe ve profesyonel takip varsa uygulanmalıdır.',
            recipes: [
                ['Somonlu Yeşil Kase','OMEGA‑3 VE SEBZE','1 porsiyon somon|Roka ve ıspanak|Brokoli|Bulgur veya karabuğday|Zeytinyağı ve limon','Somonu tamamen pişirin; tahıl ve sebzelerle kaseye alıp zeytinyağı-limon ekleyin.','Balık omega‑3 ve protein; sebzeler lif ve polifenol; tahıl enerji çeşitliliği sağlar.','Genel beslenme kalitesini ve kalp-damar dostu yağ alımını destekleyebilir; hastalık alevlenmesini tek başına kontrol etmez.'],
                ['Zeytinyağlı Mercimek Salatası','BİTKİSEL ÇEŞİTLİLİK','Yeşil mercimek|Maydanoz ve roka|Kırmızı biber|Limon|Zeytinyağı','Haşlanmış mercimeği doğranmış sebzelerle karıştırıp limon ve zeytinyağı ekleyin.','Mercimek protein, lif, folat ve demir; renkli sebzeler antioksidan bileşen çeşitliliği sağlar.','Tokluk, bağırsak düzeni ve sürdürülebilir kilo yönetimine katkı sağlayabilir.'],
                ['Sebzeli Nohut Güveci','TEK TENCERE ÖĞÜNÜ','Haşlanmış nohut|Patlıcan, kabak ve biber|Domates|Sarımsak|Zeytinyağı','Tüm malzemeleri fırın kabında veya tencerede sebzeler yumuşayana kadar pişirin.','Baklagil ve farklı renk sebzeleri aynı öğünde birleştirir; lif ve bitkisel protein sağlar.','İşlenmiş et yerine bitkisel protein çeşitliliğini artırabilir.'],
                ['Cevizli Orman Meyveli Yulaf','ANTİOKSİDAN ÇEŞİTLİLİĞİ','Yulaf|Yoğurt veya uygun alternatif|Orman meyveleri|Ceviz|Tarçın','Yulafı yoğurtla karıştırın; meyve, ceviz ve tarçını ekleyin.','Meyveler polifenoller; yulaf lif; ceviz doymamış yağlar sağlar.','Kahvaltıda tokluk ve genel beslenme çeşitliliğini destekleyebilir; ağrıyı doğrudan tedavi etmez.'],
                ['Zerdeçallı Sebze Çorbası','SICAK SEBZE ÖĞÜNÜ','Kabak, havuç ve brokoli|Kırmızı mercimek|Az zerdeçal|Karabiber|Zeytinyağı','Sebze ve mercimeği pişirin; az miktarda zerdeçal ve karabiber ekleyip blenderdan geçirin.','Sebze, baklagil ve baharat çeşitliliği sağlar. Zerdeçal burada gıda miktarında kullanılır.','Lif ve bitkisel protein alımını artırabilir; takviye dozunda zerdeçal yerine geçmez ve ilaçlarla etkileşim konusu hekimle değerlendirilmelidir.'],
                ['Sardalyalı Tam Tahıllı Tost','KALSİYUM VE OMEGA‑3','Düşük tuzlu sardalya|Tam tahıllı ekmek|Domates|Roka|Limon','Sardalyayı ezip ekmek üzerine yayın; domates, roka ve limonla servis edin.','Sardalya protein, omega‑3 ve yenebilen kılçıklarıyla kalsiyum sağlayabilir.','Balık çeşitliliğini artırabilir; hipertansiyonda konserve ürünün tuz içeriğini kontrol edin.']
            ]
        },
        digestion: {
            label: 'BAĞIRSAK SAĞLIĞI • 6 HAFİF TARİF',
            title: 'Sindirim Sistemi İçin Tarifler',
            intro: 'Lif, sıvı ve tolere edilen fermente ürünleri öne çıkaran; kişisel hassasiyetlere göre uyarlanabilen yumuşak ve pratik öğünler.',
            note: 'Reflü, IBS, çölyak, inflamatuar bağırsak hastalığı veya gastritte tetikleyiciler kişiye göre değişir. Şikâyeti artıran besini zorlamayın; uzun süren yakınmalarda gastroenteroloji ve diyetisyen değerlendirmesi alın.',
            recipes: [
                ['Muzlu Tarçınlı Yulaf Lapası','YUMUŞAK KAHVALTI','4 yemek kaşığı yulaf|Su veya süt|Yarım muz|Tarçın|İsteğe göre yoğurt','Yulafı sıvıyla yumuşayana kadar pişirin; muz ve tarçın ekleyin.','Yulaf çözünür lif sağlar; pişmiş ve yumuşak kıvam bazı kişilerce daha kolay tolere edilebilir.','Dışkı kıvamı ve tokluk üzerinde destekleyici olabilir; şişkinlikte porsiyonu yavaş artırın.'],
                ['Yoğurtlu Kabak Çorbası','HAFİF SEBZE ÖĞÜNÜ','Kabak|Pirinç veya yulaf|Su|Yoğurt|Dereotu','Kabak ve tahılı pişirin. Ilıyınca yoğurdu ekleyin; dereotuyla servis edin.','Pişmiş kabak ve yumuşak tahıl hafif bir öğün; yoğurt tolere ediliyorsa protein ve fermente ürün çeşitliliği sağlar.','Hassas dönemlerde yağlı ve ağır öğünlere daha hafif alternatif olabilir.'],
                ['Kefirli Meyve Kasesi','FERMENTE ARA ÖĞÜN','Pastörize kefir|Muz veya çilek|Yulaf|Öğütülmüş ceviz','Meyveyi doğrayıp kefir ve yulafla karıştırın; ceviz ekleyin.','Kefir fermente süt ürünü, meyve ve yulaf lif kaynağıdır.','Tolere ediliyorsa besin ve lif çeşitliliğini artırabilir; laktoz hassasiyetinde uygun alternatif seçin.'],
                ['Havuçlu Patatesli Tavuk Çorbası','SADE ANA ÖĞÜN','Tavuk eti|Havuç|Patates|Pirinç|Su','Tavuğu tamamen pişirin; sebze ve pirinci ekleyip yumuşayana kadar kaynatın.','Protein ve iyi pişmiş sebzeleri yumuşak formda sunar.','İştahsız veya hassas sindirim dönemlerinde daha kolay tüketilen bir öğün olabilir; kalıcı şikâyette nedeni araştırılmalıdır.'],
                ['Zeytinyağlı Pişmiş Sebze Tabağı','LİFİ KADEMELİ ARTIRMA','Kabak|Havuç|Ispanak|Az zeytinyağı|Yoğurt veya uygun alternatif','Sebzeleri buharda ya da az suda iyice pişirin; zeytinyağı ve tolere ediliyorsa yoğurt ekleyin.','Pişirme sebzelerin dokusunu yumuşatır; lif ve mikrobesin alımına katkı sağlar.','Çiğ sebzeye göre bazı kişilerde daha iyi tolere edilebilir; kişisel tetikleyiciler değişir.'],
                ['Mercimekli Pirinç Çorbası','KÜÇÜK PORSİYON BAKLAGİL','Kırmızı mercimek|Pirinç|Havuç|Kimyon|Zeytinyağı','Mercimek ve pirinci çok iyi pişirin; az kimyon ve zeytinyağı ekleyin.','Baklagil protein ve lif, pirinç enerji sağlar; iyi pişirme daha yumuşak kıvam oluşturur.','Baklagil toleransını küçük porsiyonla denemeye yardımcı olabilir; gaz belirginse miktarı azaltın.']
            ]
        },
        heart: {
            label: 'KALP & DAMAR • 6 KALP DOSTU TARİF',
            title: 'Kalp ve Damar Sağlığı Tarifleri',
            intro: 'Sebze, meyve, tam tahıl, baklagil, balık, kuruyemiş ve zeytinyağını öne çıkaran; tuzu ve doymuş yağı azaltmaya yardımcı tarifler.',
            note: 'Hipertansiyon, kalp yetmezliği, böbrek hastalığı veya kan sulandırıcı kullanımı varsa tuz, sıvı, potasyum ve bazı yeşil yapraklı sebzelerin miktarı kişiye özel planlanmalıdır.',
            recipes: [
                ['Cevizli Elmalı Yulaf','LİFLİ KAHVALTI','Yulaf|Elma|Ceviz|Tarçın|Süt veya su','Yulafı pişirin; elma, ceviz ve tarçın ekleyin.','Yulaf çözünür lif; ceviz doymamış yağ; elma meyve lifi sağlar.','Doymuş yağdan düşük bir kahvaltı düzenine ve genel kolesterol yönetimine katkı sağlayabilir.'],
                ['Zeytinyağlı Kuru Fasulye Salatası','BAKLAGİL ÖĞÜNÜ','Haşlanmış kuru fasulye|Domates ve biber|Maydanoz|Limon|Zeytinyağı','Fasulyeyi sebzelerle karıştırıp limon ve ölçülü zeytinyağı ekleyin; tuz eklemeyin veya sınırlayın.','Baklagil lif ve bitkisel protein; zeytinyağı doymamış yağ sağlar.','Et ağırlıklı öğünlere alternatif olabilir ve toklukla birlikte kalp dostu beslenme çeşitliliğini destekleyebilir.'],
                ['Fırında Somon ve Sebze','OMEGA‑3 ANA ÖĞÜN','Somon|Brokoli|Kabak|Limon|Zeytinyağı','Somon ve sebzeleri fırında tamamen pişirin; limon ve az zeytinyağı ekleyin.','Somon protein ve omega‑3; sebzeler lif ve potasyum sağlar.','Balık tüketimini artırabilir ve kızartılmış ana öğünlere daha dengeli alternatif sunabilir.'],
                ['Tuzsuz Mercimek Sebze Çorbası','DASH UYUMLU SEÇENEK','Mercimek|Havuç ve kabak|Domates|Sarımsak|Baharatlar','Malzemeleri pişirin; tuz yerine kimyon, kekik ve limonla lezzetlendirin.','Lif, bitkisel protein ve sebze çeşitliliği sağlarken sodyumu sınırlamayı kolaylaştırır.','Tuzu azaltma alışkanlığına katkı sağlayabilir; tek başına tansiyon ilacının yerine geçmez.'],
                ['Avokadolu Tam Tahıllı Tost','DOYMAMIŞ YAĞ','Tam tahıllı ekmek|Çeyrek avokado|Domates|Limon|Karabiber','Avokadoyu limonla ezin; ekmeğe sürüp domates ekleyin.','Tam tahıl lif, avokado doymamış yağ sağlar.','Tereyağı veya işlenmiş et içeren kahvaltılara daha kalp dostu alternatif olabilir; porsiyon enerji ihtiyacına göre ayarlanmalıdır.'],
                ['Yoğurtlu Meyve ve Badem Kasesi','DENGELİ ARA ÖĞÜN','Yoğurt|Mevsim meyvesi|Tuzsuz badem|Yulaf|Tarçın','Meyveyi yoğurt ve yulafla karıştırın; tuzsuz badem ekleyin.','Protein, kalsiyum, lif ve doymamış yağları aynı ara öğünde buluşturur.','Şekerli paketli atıştırmalıklara daha dengeli alternatif olabilir.']
            ]
        },
        weight: {
            label: 'KİLO YÖNETİMİ • 6 TOK TUTAN TARİF',
            title: 'Kilo Kontrolü ve Formda Kalma Tarifleri',
            intro: 'Aşırı kısıtlamadan protein, lif, sebze ve porsiyon dengesini öne çıkaran; sürdürülebilir öğün planlamasını kolaylaştıran tarifler.',
            note: 'Kilo yönetiminde hızlı ve aşırı kısıtlayıcı diyetler yerine sürdürülebilir enerji dengesi, uyku ve fiziksel aktivite önemlidir. Diyabet, yeme bozukluğu veya kronik hastalıkta kişisel planlama gerekir.',
            recipes: [
                ['Proteinli Sebzeli Omlet','TOK TUTAN KAHVALTI','2 yumurta|Ispanak ve biber|1 tatlı kaşığı zeytinyağı|Yanına domates|1 dilim tam tahıllı ekmek','Sebzeleri kısa süre pişirin; yumurtayı ekleyip tamamen pişirin. Ekmek ve domatesle servis edin.','Protein ve sebzeyi aynı öğünde birleştirir; tam tahıl kontrollü karbonhidrat sağlar.','Sabah tokluğunu uzatabilir ve plansız atıştırmayı azaltmaya yardımcı olabilir.'],
                ['Yoğurtlu Yulaf ve Meyve','ÖLÇÜLÜ ARA ÖĞÜN','Yoğurt|3 yemek kaşığı yulaf|1 küçük meyve|Tarçın|2 tam ceviz','Tüm malzemeleri kâsede birleştirin.','Protein, lif ve sağlıklı yağ kombinasyonu sağlar.','Tatlı isteğini daha dengeli karşılayabilir; porsiyon fazlası yine toplam enerjiyi artırabilir.'],
                ['Tavuklu Büyük Salata','HACİMLİ ANA ÖĞÜN','Izgara tavuk|Bol yeşillik|Domates ve salatalık|1 tatlı kaşığı zeytinyağı|Limon','Tavuğu tamamen pişirin; sebzelerle birleştirip ölçülü yağ ve limon ekleyin.','Yüksek sebze hacmi ve protein, daha düşük enerji yoğunluğuyla dengeli tokluk sağlayabilir.','Porsiyon kontrolünü kolaylaştırabilir; sadece salata tüketmek yerine yeterli protein eklemek önemlidir.'],
                ['Mercimekli Sebzeli Bulgur','LİFLİ ÖĞÜN','Yeşil mercimek|Bulgur|Kabak ve biber|Domates|Zeytinyağı','Malzemeleri tek tencerede pişirin; yağı ölçülü kullanın.','Lif, bitkisel protein ve kompleks karbonhidrat sağlar.','Uzun süre tokluk ve düzenli öğün ritmine katkı sağlayabilir.'],
                ['Sebze Çorbası ve Yoğurt','HAFİF AKŞAM','Kabak, havuç ve brokoli|Kırmızı mercimek|Yoğurt|Baharat|Su','Sebzeleri mercimekle pişirip blenderdan geçirin; yoğurtla servis edin.','Sebze ve baklagil hacim, lif ve protein sağlar.','Akşam öğününü hafifletmeye yardımcı olabilir; tek başına çok düşük kalorili beslenme planına dönüşmemelidir.'],
                ['Elmalı Tarçınlı Yoğurt','TATLI ALTERNATİFİ','Yoğurt|Yarım elma|Tarçın|1 yemek kaşığı yulaf|2 tam ceviz','Elmayı doğrayıp yoğurt, tarçın ve yulafla karıştırın; ceviz ekleyin.','İlave şeker olmadan tatlı lezzet, protein, lif ve sağlıklı yağ sağlar.','Paketli tatlılara daha dengeli alternatif olabilir; kilo değişimi toplam beslenme ve hareket düzenine bağlıdır.']
            ]
        },
        detox: {
            label: 'KARACİĞER DOSTU • 6 DENGELİ TARİF',
            title: 'Karaciğer Dostu Beslenme Tarifleri',
            intro: '“Detoks” iddiası yerine sebze, baklagil, tam tahıl, balık ve doymamış yağları öne çıkaran; şekerli içecek ve aşırı doymuş yağı sınırlamaya yardımcı tarifler.',
            note: 'Karaciğer vücudun doğal işleme ve arındırma organıdır; hiçbir kür veya tek besin karaciğeri “temizlemez”. Yağlı karaciğer, hepatit, siroz veya ilaç kullanımı varsa beslenme planını hekiminizle oluşturun; bitkisel takviyeleri gelişigüzel kullanmayın.',
            recipes: [
                ['Zeytinyağlı Enginar ve Bezelye','SEBZE ANA ÖĞÜNÜ','Enginar|Bezelye|Havuç|Dereotu|Ölçülü zeytinyağı','Sebzeleri az suyla yumuşayana kadar pişirin; zeytinyağı ve dereotu ekleyin.','Sebze, lif ve doymamış yağ sağlar; kızartma içermeyen hafif bir öğündür.','Sebze çeşitliliğini artırabilir; karaciğeri tek başına temizlediği iddia edilmemelidir.'],
                ['Brokoli Karnabahar Çorbası','TURPGİL ÇEŞİTLİLİĞİ','Brokoli|Karnabahar|Soğan|Kırmızı mercimek|Zeytinyağı','Sebze ve mercimeği pişirip blenderdan geçirin; ölçülü zeytinyağı ekleyin.','Turpgiller, lif ve bitkisel bileşen çeşitliliği; mercimek protein sağlar.','Daha fazla sebze ve lif tüketimini kolaylaştırabilir; gaz yakınmasında porsiyonu azaltın.'],
                ['Sarımsaklı Yoğurtlu Pancar Salatası','RENKLİ YAN ÖĞÜN','Haşlanmış pancar|Pastörize yoğurt|Az sarımsak|Ceviz|Limon','Pancarı rendeleyip yoğurt, sarımsak ve limonla karıştırın; ceviz ekleyin.','Pancar ve ceviz farklı bitkisel bileşenler, yoğurt protein ve kalsiyum sağlar.','Renkli sebze tüketimini artırabilir; “toksin atma” veya hastalık tedavisi sağlamaz.'],
                ['Yeşillikli Mercimek Salatası','BİTKİSEL PROTEİN','Yeşil mercimek|Maydanoz ve roka|Kırmızı biber|Limon|Zeytinyağı','Haşlanmış mercimeği sebzelerle karıştırın; limon ve ölçülü zeytinyağı ekleyin.','Lif, bitkisel protein, folat ve demir çeşitliliği sağlar.','Tokluk ve sağlıklı kilo yönetimine katkı sağlayabilir; yağlı karaciğerde toplam enerji dengesi önemlidir.'],
                ['Fırında Balık ve Yeşil Sebzeler','DOYMAMIŞ YAĞ SEÇİMİ','Balık|Brokoli veya ıspanak|Kabak|Limon|Zeytinyağı','Balık ve sebzeleri fırında tamamen pişirin; limonla servis edin.','Balık protein ve doymamış yağ; sebzeler lif sağlar.','Doymuş yağ oranı yüksek işlenmiş et öğünlerine alternatif olabilir.'],
                ['Şekersiz Elmalı Yulaf','ŞEKERİ AZALTAN KAHVALTI','Yulaf|Elma|Tarçın|Yoğurt veya süt|Ceviz','Yulafı pişirin; elma, tarçın ve ceviz ekleyin. İlave şeker kullanmayın.','Tam tahıl, meyve, protein ve sağlıklı yağları birleştirir.','Şekerli kahvaltılık ve içecekleri azaltmaya yardımcı olabilir; karaciğer sağlığında sürdürülebilir kilo ve porsiyon dengesi belirleyicidir.']
            ]
        }
    };

    const safe = value => String(value).replace(/[&<>"']/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);

    Object.entries(sets).forEach(([key, set]) => {
        const detail = document.querySelector('[data-nutrition-detail="' + key + '"]');
        if (!detail || detail.querySelector('.nutrition-program-v385')) return;
        detail.classList.add('nutrition-recipes-converted-v385');
        const shell = detail.querySelector('.nutrition-detail-shell-v175');
        if (!shell) return;

        const list = set.recipes.map((recipe, index) => {
            const ingredients = recipe[2].split('|').map(item => '<li>' + safe(item) + '</li>').join('');
            const imageSrc = 'recipe-' + key + '-' + String(index + 1).padStart(2, '0') + '-v386.jpg';
            return '<article class="pregnancy-recipe-v384">' +
                '<div class="pregnancy-recipe-media-v384 has-recipe-image-v386"><img src="' + imageSrc + '" alt="' + safe(recipe[0]) + '" loading="lazy" decoding="async"></div>' +
                '<div class="pregnancy-recipe-content-v384">' +
                    '<span class="pregnancy-recipe-kicker-v384">' + safe(recipe[1]) + '</span><h2>' + safe(recipe[0]) + '</h2>' +
                    '<div class="pregnancy-recipe-columns-v384"><section><h3>Malzemeler</h3><ul>' + ingredients + '</ul></section><section><h3>Hazırlanışı</h3><p>' + safe(recipe[3]) + '</p></section></div>' +
                    '<div class="pregnancy-recipe-why-v384"><h3>Neden tüketeyim?</h3><p>' + safe(recipe[4]) + '</p><strong>Ne değişebilir?</strong><p>' + safe(recipe[5]) + '</p></div>' +
                '</div></article>';
        }).join('');

        const program = document.createElement('div');
        program.className = 'nutrition-program-v385';
        program.innerHTML =
            '<div class="nutrition-program-head-v385"><span>' + safe(set.label) + '</span><h2>' + safe(set.title) + '</h2><p>' + safe(set.intro) + '</p></div>' +
            '<div class="pregnancy-recipe-list-v384">' + list + '</div>' +
            '<aside class="pregnancy-recipes-note-v384"><strong>Kişiye özel güvenlik notu</strong><p>' + safe(set.note) + ' Bu içerik genel bilgilendirme amaçlıdır; kişisel diyet reçetesi değildir.</p></aside>';
        shell.prepend(program);
    });
})();
/* =========================================================
   V389 - SUPPLEMENT DETAYLARINI AC / KAPAT
========================================================= */
(function () {
    const initSupplementDetailsV389 = () => {
        document.querySelectorAll('[data-health-detail-view="supplementler"] .supplement-product-copy-v146').forEach((copy) => {
            if (copy.querySelector('.supplement-detail-v389')) return;
            const grid = copy.querySelector('.supplement-benefit-grid-v146');
            const note = copy.querySelector('.supplement-note-v146');
            if (!grid || !note) return;

            const details = document.createElement('details');
            details.className = 'supplement-detail-v389';
            const summary = document.createElement('summary');
            summary.innerHTML = '<span>Detaylı Bilgi</span><b aria-hidden="true">+</b>';
            const body = document.createElement('div');
            body.className = 'supplement-detail-body-v389';

            grid.before(details);
            body.append(grid, note);
            details.append(summary, body);
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSupplementDetailsV389, { once: true });
    } else {
        initSupplementDetailsV389();
    }
})();

// =========================================================
// V390 - DETOKS KÜRLERİ / 35 TARİF + ARAMA + KATEGORİ FİLTRE
// İlk 10 tarifin görselleri bu sürümde site kartlarına işlendi.
// Kalan tarifler için placeholder alanı korunur ve sonraki turda doldurulur.
// =========================================================
(function () {
    const recipes = [
        // MİDE
        {id:'mide-01',category:'mide',categoryLabel:'Mide',icon:'☕',name:'Zencefil & Limon Ilık Su',support:'Mide ferahlığı, hafif bulantı hissi ve sıcak sıvı desteği için sade bir başlangıç içeceği olarak değerlendirilebilir.',ingredients:['1 su bardağı ılık su','2–3 ince dilim taze zencefil','2 ince dilim limon'],prep:'Zencefili ılık suda 5–10 dakika bekletin; limon dilimlerini ekleyip ılık olarak tüketin.',note:'Reflü, safra taşı veya kan sulandırıcı kullanımı varsa zencefil miktarını kişisel uygunlukla değerlendirin.',tags:['zencefil','limon','ılık içecek'],keywords:'mide zencefil limon bulanti bulantı ferahlik ferahlık hazimsizlik hazımsızlık',image:'./detox-mide-01-zencefil-limon-v391.png?v=391',imageAlt:'Zencefil ve limon dilimleriyle hazırlanmış mide dostu ılık içecek'},
        {id:'mide-02',category:'mide',categoryLabel:'Mide',icon:'🌿',name:'Rezene & Nane Demlemesi',support:'Öğün sonrası gaz ve şişkinlik hissini azaltmaya yardımcı, sakin bir sindirim rutini oluşturmak için tercih edilebilir.',ingredients:['1 tatlı kaşığı rezene tohumu','5–6 taze nane yaprağı','1 su bardağı sıcak su'],prep:'Rezeneyi hafifçe ezin; nane ile birlikte 7–8 dakika demleyip süzün.',note:'Gebelik-emzirme döneminde ve yoğun bitkisel çay kullanımında hekim görüşü alın.',tags:['rezene','nane','şişkinlik'],keywords:'mide rezene nane gaz sislik şişkinlik sindirim',image:'./detox-mide-02-rezene-nane-v391.png?v=391',imageAlt:'Rezene tohumu ve taze nane ile hazırlanmış mide dostu demleme'},
        {id:'mide-03',category:'mide',categoryLabel:'Mide',icon:'🍎',name:'Elma & Papatya Demlemesi',support:'Mideyi rahatlatmaya yönelik yumuşak içerikli bir içecek alternatifi olup hafif hassasiyet dönemlerinde kullanılabilir.',ingredients:['2 ince elma dilimi','1 tatlı kaşığı papatya','1 su bardağı sıcak su'],prep:'Papatya ve elma dilimlerini 6–8 dakika demleyin; süzerek ılık için.',note:'Papatyagiller alerjisinde uygun değildir; düzenli uzun süreli kullanım öncesi danışın.',tags:['elma','papatya','mide rahatlatma'],keywords:'mide elma papatya hafif hassasiyet sakinlestirici sakinleştirici',image:'./detox-mide-03-elma-papatya-v391.png?v=391',imageAlt:'Elma dilimleri ve papatya çiçekleriyle hazırlanmış mide dostu demleme'},
        {id:'mide-04',category:'mide',categoryLabel:'Mide',icon:'🍐',name:'Tarçınlı Armut Kompostosu',support:'Hassas mide günlerinde sıcak ve yumuşak içerikli bir seçenek olarak sıvı desteğine eşlik edebilir.',ingredients:['1 küçük armut','1 küçük çubuk tarçın','1,5 su bardağı su'],prep:'Armut dilimleri ve tarçını 6–8 dakika hafifçe kaynatın; ılıtıp tüketin.',note:'Diyabette meyve porsiyonu ve toplam karbonhidrat planı göz önünde bulundurulmalıdır.',tags:['armut','tarçın','komposto'],keywords:'mide armut tarcin tarçın komposto hassas mide sindirim',image:'./detox-mide-04-tarcinli-armut-v391.png?v=391',imageAlt:'Armut ve tarçınla hazırlanmış mide dostu komposto'},
        {id:'mide-05',category:'mide',categoryLabel:'Mide',icon:'🌼',name:'Melisa & Limon Kabuğu Çayı',support:'Stres kaynaklı mide hassasiyetinde sakin bir akşam rutini ve hafif sıcak sıvı desteği için değerlendirilebilir.',ingredients:['1 tatlı kaşığı melisa','az miktarda limon kabuğu','1 su bardağı sıcak su'],prep:'Melisa ve limon kabuğunu 5–6 dakika demleyin; çok sıcak olmadan için.',note:'Sedatif ilaç kullananlar ve turunçgil hassasiyeti olanlar hekim görüşü almalıdır.',tags:['melisa','limon kabuğu','akşam rutini'],keywords:'mide melisa limon kabugu kabuğu stres hassasiyet sakin aksam akşam',image:'./detox-mide-05-melisa-limon-v391.png?v=391',imageAlt:'Melisa ve limon kabuğu ile hazırlanmış mide dostu bitki çayı'},

        // İNCE BAĞIRSAK
        {id:'ince-01',category:'ince-bagirsak',categoryLabel:'İnce Bağırsak',icon:'🌿',name:'Rezene & Anason Çayı',support:'Şişkinlik ve sindirim rahatlığı için sıcak sıvı desteği sağlayan klasik bir bitkisel demleme alternatifi olabilir.',ingredients:['1 çay kaşığı rezene','1 çay kaşığı anason','1 su bardağı sıcak su'],prep:'Rezene ve anasonu 7–8 dakika demleyin; süzüp ılık tüketin.',note:'Aşırı tüketimden kaçının; gebelik ve düzenli ilaç kullanımında hekim görüşü alın.',tags:['rezene','anason','şişkinlik'],keywords:'ince bagirsak bağırsak rezene anason sislik şişkinlik sindirim gaz',image:'./detox-ince-01-rezene-anason-v391.png?v=391',imageAlt:'Rezene ve anason ile hazırlanmış ince bağırsak dostu bitki çayı'},
        {id:'ince-02',category:'ince-bagirsak',categoryLabel:'İnce Bağırsak',icon:'🫚',name:'Nane & Zencefil Demlemesi',support:'Sindirimi rahatlatmaya, hafif gaz hissi ve bağırsak konforuna eşlik etmeye yönelik ılık bir seçenek sunar.',ingredients:['5–6 nane yaprağı','2–3 ince dilim zencefil','1 su bardağı sıcak su'],prep:'Nane ve zencefili 6–8 dakika demleyip süzün; ılık için.',note:'Safra taşı, reflü veya kan sulandırıcı kullanımında zencefil miktarını sınırlamak gerekebilir.',tags:['nane','zencefil','sindirim'],keywords:'ince bagirsak bağırsak nane zencefil gaz sislik şişkinlik rahatlik rahatlık',image:'./detox-ince-02-nane-zencefil-v391.png?v=391',imageAlt:'Nane ve zencefil ile hazırlanmış ince bağırsak dostu demleme'},
        {id:'ince-03',category:'ince-bagirsak',categoryLabel:'İnce Bağırsak',icon:'🥛',name:'Kefirli Probiyotik Karışım',support:'Bağırsak florasını destekleyen, sindirim dengesi için küçük porsiyonlu ve fermente bir içecek alternatifi olabilir.',ingredients:['1 su bardağı sade kefir','az miktarda tarçın','isteğe göre çok az muz'],prep:'Malzemeleri karıştırıp soğuk veya oda ısısında tüketin.',note:'Laktoz intoleransı veya süt alerjisinde uygun değildir; fermente ürün toleransı kişiden kişiye değişir.',tags:['kefir','probiyotik','fermente'],keywords:'ince bagirsak bağırsak kefir probiyotik flora sindirim denge',image:'./detox-ince-03-kefir-probiyotik-v391.png?v=391',imageAlt:'Kefir bazlı probiyotik içecek ve tarçın ile hazırlanmış ince bağırsak destek görseli'},
        {id:'ince-04',category:'ince-bagirsak',categoryLabel:'İnce Bağırsak',icon:'🍏',name:'Elma & Papatya İçeceği',support:'Hassas bağırsaklarda yumuşak içerik sunan ve sıcak sıvı rutiniyle sindirim rahatlığına eşlik eden bir seçenektir.',ingredients:['2 ince elma dilimi','1 tatlı kaşığı papatya','1 su bardağı sıcak su'],prep:'Elma ve papatyayı 6–8 dakika demleyin; süzüp ılık tüketin.',note:'Papatyagiller alerjisi olanlar kullanmamalıdır; şikâyet artırırsa bırakın.',tags:['elma','papatya','yumuşak içerik'],keywords:'ince bagirsak bağırsak elma papatya hassas bagirsak bağırsak sindirim',image:'./detox-ince-04-elma-papatya-v391.png?v=391',imageAlt:'Elma ve papatya ile hazırlanmış ince bağırsak dostu içecek'},
        {id:'ince-05',category:'ince-bagirsak',categoryLabel:'İnce Bağırsak',icon:'🫙',name:'Kimyonlu Ilık Su',support:'Gaz ve şişkinlik hissinde sıcak sıvı desteği arayanlar için sade bir kullanım alternatifi olabilir.',ingredients:['1 çimdik kimyon','1 su bardağı ılık su'],prep:'Kimyonu ılık suda 5–6 dakika bekletin; süzüp yudumlayarak için.',note:'Yoğun bitki-baharat kullanımı herkese uygun olmayabilir; düzenli ilaç kullanımında içerikleri gözden geçirin.',tags:['kimyon','ılık su','gaz'],keywords:'ince bagirsak bağırsak kimyon ilik ılık gaz sislik şişkinlik',image:'./detox-ince-05-kimyonlu-ilik-su-v391.png?v=391',imageAlt:'Kimyonla hazırlanmış ince bağırsak dostu ılık su'},

        // KALIN BAĞIRSAK
        {id:'kalin-01',category:'kalin-bagirsak',categoryLabel:'Kalın Bağırsak',icon:'🫘',name:'Chia & Limon Bekletme Suyu',support:'Yeterli sıvıyla birlikte tüketildiğinde günlük lif alımını artırmaya ve bağırsak düzenini desteklemeye yardımcı olabilir.',ingredients:['1 tatlı kaşığı chia tohumu','1 su bardağı su','1–2 ince limon dilimi'],prep:'Chia tohumunu suda en az 20–30 dakika şişirin; limon dilimi ekleyip karıştırın.',note:'Kuru chia yutmayın. Yutma güçlüğü veya bağırsak darlığı öyküsünde kullanmayın; lif artışını yavaş yapın.',tags:['chia','lif','su'],keywords:'kalin kalın bagirsak bağırsak chia lif kabizlik kabızlık',image:'./detox-kalin-01-limon-chia-v392.png?v=392',imageAlt:'Limon dilimleri ve chia tohumu ile hazırlanmış kalın bağırsak dostu bekletme suyu'},
        {id:'kalin-02',category:'kalin-bagirsak',categoryLabel:'Kalın Bağırsak',icon:'🫐',name:'Kuru Erik & Tarçın Kompostosu',support:'Kuru erik ve sıvı birlikteliği, bazı kişilerde dışkılama düzenini destekleyen besinsel bir seçenek olabilir.',ingredients:['3 adet kuru erik','1,5 su bardağı su','1 küçük parça çubuk tarçın'],prep:'Erikleri su ve tarçınla 6–8 dakika hafifçe kaynatın; ılık tüketin ve erikleri de yiyin.',note:'Diyabette kuru meyve porsiyonu önemlidir; ani veya açıklanamayan kabızlıkta tıbbi değerlendirme gerekir.',tags:['kuru erik','lif','bağırsak düzeni'],keywords:'kalin kalın bagirsak bağırsak kuru erik kabizlik kabızlık lif',image:'./detox-kalin-02-kuru-erik-tarcin-v392.png?v=392',imageAlt:'Kuru erik ve tarçın ile hazırlanmış kalın bağırsak dostu komposto'},
        {id:'kalin-03',category:'kalin-bagirsak',categoryLabel:'Kalın Bağırsak',icon:'🌾',name:'Öğütülmüş Keten Tohumlu Yoğurt',support:'Lif ve yağ asidi içeren keten tohumu ile fermente yoğurdu bir araya getiren küçük porsiyonlu bir ara öğündür.',ingredients:['4 yemek kaşığı sade yoğurt','1 tatlı kaşığı taze öğütülmüş keten tohumu','2 yemek kaşığı su'],prep:'Malzemeleri karıştırın ve 5–10 dakika bekletin; yanında ayrıca su için.',note:'Bağırsak darlığı, şiddetli karın ağrısı veya yeni başlayan kabızlıkta kendi kendine lif yüklemeyin.',tags:['keten tohumu','yoğurt','lif'],keywords:'kalin kalın bagirsak bağırsak keten tohumu yogurt yoğurt lif',image:'./detox-kalin-03-yogurt-keten-v392.png?v=392',imageAlt:'Yoğurt ve öğütülmüş keten tohumu ile hazırlanmış kalın bağırsak dostu ara öğün'},
        {id:'kalin-04',category:'kalin-bagirsak',categoryLabel:'Kalın Bağırsak',icon:'🍐',name:'Armut & Kivi Lif Smoothie',support:'Meyve posasını koruyan bir tarif olarak günlük lif çeşitliliğine katkı sağlayabilir.',ingredients:['½ armut','1 küçük kivi','½ su bardağı su','1 yemek kaşığı yulaf, isteğe bağlı'],prep:'Malzemeleri kabukları uygun şekilde temizlenmiş olarak blenderdan geçirin; süzmeden tüketin.',note:'Hassas bağırsakta kivi veya yüksek lifli porsiyonlar şişkinlik yapabilir; miktarı kişiselleştirin.',tags:['armut','kivi','lif'],keywords:'kalin kalın bagirsak bağırsak armut kivi lif posa',image:'./detox-kalin-04-armut-kivi-v392.png?v=392',imageAlt:'Armut, kivi ve yulaf ile hazırlanmış kalın bağırsak dostu smoothie'},
        {id:'kalin-05',category:'kalin-bagirsak',categoryLabel:'Kalın Bağırsak',icon:'🍎',name:'Elma & Yulaf Kefir Karışımı',support:'Fermente içecek, meyve ve yulafı bir araya getirerek lif ve protein içeren dengeli bir ara öğün oluşturur.',ingredients:['¾ su bardağı sade kefir','½ küçük elma','1 yemek kaşığı yulaf','1 tutam tarçın'],prep:'Elmayı küçük doğrayın; kefir ve yulafla blenderdan geçirin, tarçın ekleyin.',note:'Laktoz intoleransı ve süt alerjisinde uygun alternatif gerekir.',tags:['elma','yulaf','kefir'],keywords:'kalin kalın bagirsak bağırsak elma yulaf kefir lif',image:'./detox-kalin-05-elma-yulaf-kefir-v392.png?v=392',imageAlt:'Elma, yulaf ve kefir ile hazırlanmış kalın bağırsak dostu karışım'},

        // KARACİĞER
        {id:'karaciger-01',category:'karaciger',categoryLabel:'Karaciğer',icon:'🥬',name:'Yeşil Elma, Salatalık & Maydanoz',support:'Sebze-meyve çeşitliliğini ve sıvı tüketimini artıran hafif bir tarif; “karaciğer temizleme” iddiası taşımaz.',ingredients:['½ yeşil elma','½ salatalık','1 küçük avuç maydanoz','¾ su bardağı su'],prep:'Tüm malzemeleri iyi yıkayıp suyla blenderdan geçirin; süzmeden küçük porsiyon tüketin.',note:'Böbrek hastalığı, potasyum kısıtlaması veya warfarin kullanımı varsa içerik seçimini hekiminizle planlayın.',tags:['yeşillik','maydanoz','sebze'],keywords:'karaciger karaciğer yesil yeşil elma salatalik salatalık maydanoz',image:'./detox-karaciger-01-yesil-elma-salatalik-v392.png?v=392',imageAlt:'Yeşil elma, salatalık ve maydanoz ile hazırlanmış karaciğer dostu yeşil içecek'},
        {id:'karaciger-02',category:'karaciger',categoryLabel:'Karaciğer',icon:'🫜',name:'Pancar & Havuç Karışımı',support:'Renkli sebzelerden gelen çeşitli bitkisel bileşenleri günlük beslenmeye eklemek için kullanılabilecek küçük porsiyonlu bir seçenektir.',ingredients:['¼ küçük pancar','1 küçük havuç','½ küçük elma','¾ su bardağı su'],prep:'Malzemeleri blenderdan geçirin; posa kaybını azaltmak için süzmeden tüketin.',note:'Böbrek taşı eğilimi, potasyum kısıtlaması veya diyabette porsiyon kişiye göre ayarlanmalıdır.',tags:['pancar','havuç','renkli sebze'],keywords:'karaciger karaciğer pancar havuc havuç antioksidan sebze',image:'./detox-karaciger-02-pancar-havuc-v392.png?v=392',imageAlt:'Pancar, havuç ve elma ile hazırlanmış karaciğer dostu sebze karışımı'},
        {id:'karaciger-03',category:'karaciger',categoryLabel:'Karaciğer',icon:'🫚',name:'Zerdeçal & Zencefil Ilık Demleme',support:'Şekerli içecekler yerine baharat aromalı, kalorisi düşük sıcak bir içecek alternatifi sunar.',ingredients:['¼ çay kaşığı zerdeçal','1 ince dilim zencefil','1 su bardağı sıcak su','1–2 damla limon, isteğe bağlı'],prep:'Zerdeçal ve zencefili 5 dakika sıcak suda bekletin; karıştırarak ılık tüketin.',note:'Safra taşı, kanama riski veya kan sulandırıcı kullanımı varsa yoğun zerdeçal-zencefil kullanmayın.',tags:['zerdeçal','zencefil','ılık içecek'],keywords:'karaciger karaciğer zerdecal zerdeçal zencefil sıcak ilik ılık',image:'./detox-karaciger-03-zerdecal-zencefil-v392.png?v=392',imageAlt:'Zerdeçal ve zencefil ile hazırlanmış karaciğer dostu ılık bitki çayı'},
        {id:'karaciger-04',category:'karaciger',categoryLabel:'Karaciğer',icon:'🥦',name:'Brokoli & Salatalık Yeşil Karışımı',support:'Turpgil ve taze sebze tüketimini artırmaya yönelik, posa içeren tuzsuz bir sebze karışımıdır.',ingredients:['½ su bardağı kısa süre buharda pişmiş brokoli','½ salatalık','birkaç yaprak maydanoz','1 su bardağı su'],prep:'Brokoliyi soğuttuktan sonra diğer malzemelerle blenderdan geçirin; tuz eklemeyin.',note:'Gaz-şişkinlik eğiliminde brokoli miktarını düşük tutun.',tags:['brokoli','turpgil','posa'],keywords:'karaciger karaciğer brokoli salatalik salatalık turpgil posa',image:'./detox-karaciger-04-brokoli-salatalik-v392.png?v=392',imageAlt:'Brokoli ve salatalık ile hazırlanmış karaciğer dostu yeşil karışım'},
        {id:'karaciger-05',category:'karaciger',categoryLabel:'Karaciğer',icon:'☕',name:'Şekersiz Tarçınlı Kahve Rutini',support:'Şekerli kahve içecekleri yerine sade kahve tercih etmek, toplam şeker ve enerji alımını azaltmaya yardımcı olabilir.',ingredients:['1 küçük fincan filtre kahve veya Türk kahvesi','1 küçük tutam tarçın','şeker eklemeden'],prep:'Kahveyi normal şekilde hazırlayın; içmeden önce çok az tarçın ekleyin.',note:'Çarpıntı, kontrolsüz hipertansiyon, reflü, gebelik veya uyku sorunu varsa kafein miktarını sınırlayın.',tags:['kahve','şekersiz','ölçülü tüketim'],keywords:'karaciger karaciğer kahve tarcin tarçın kafein sekersiz şekersiz',image:'./detox-karaciger-05-tarcinli-kahve-v392.png?v=392',imageAlt:'Tarçınlı şekersiz kahve ile hazırlanmış karaciğer rutini görseli'},

        // KALP & DOLAŞIM
        {id:'kalp-01',category:'kalp',categoryLabel:'Kalp & Dolaşım',icon:'❤️',name:'Nar & Kırmızı Meyve Suyu',support:'Renkli meyveleri küçük porsiyonda bir araya getirerek günlük beslenme çeşitliliğine katkı sağlar.',ingredients:['2 yemek kaşığı nar tanesi','½ su bardağı çilek veya yaban mersini','¾ su bardağı su'],prep:'Meyveleri suyla blenderdan geçirin; posa kaybını azaltmak için süzmeden tüketin.',note:'Diyabet veya ilaç kullanımı varsa meyve porsiyonunu kişisel planınıza göre ayarlayın.',tags:['nar','kırmızı meyve','meyve çeşitliliği'],keywords:'kalp dolasim dolaşım nar kirmizi kırmızı meyve yaban mersini',image:''},
        {id:'kalp-02',category:'kalp',categoryLabel:'Kalp & Dolaşım',icon:'🌺',name:'Hibiskus & Tarçın Demlemesi',support:'Şeker eklemeden tüketilebilen aromatik bir bitki çayı alternatifi olarak günlük sıvı rutinine eşlik edebilir.',ingredients:['1 tatlı kaşığı kurutulmuş hibiskus','1 küçük parça çubuk tarçın','1 su bardağı sıcak su'],prep:'5–7 dakika demleyin, süzüp ılık veya soğuk tüketin.',note:'Düşük tansiyon, antihipertansif ilaç kullanımı, gebelik-emzirme döneminde düzenli kullanım öncesi hekim görüşü alın.',tags:['hibiskus','tarçın','şekersiz'],keywords:'kalp dolasim dolaşım hibiskus tarcin tarçın tansiyon',image:''},
        {id:'kalp-03',category:'kalp',categoryLabel:'Kalp & Dolaşım',icon:'🌾',name:'Yulaf & Yaban Mersini Smoothie',support:'Yulafın çözünür lifi ile meyve çeşitliliğini bir araya getiren dengeli bir ara öğün seçeneğidir.',ingredients:['2 yemek kaşığı yulaf','½ su bardağı yaban mersini','¾ su bardağı kefir veya sade yoğurt-su karışımı'],prep:'Tüm malzemeleri blenderdan geçirin; ilave şeker kullanmayın.',note:'Süt ürünleri uygun değilse şekersiz, uygun bir alternatif tercih edin.',tags:['yulaf','yaban mersini','çözünür lif'],keywords:'kalp dolasim dolaşım yulaf beta glukan yaban mersini lif',image:''},
        {id:'kalp-04',category:'kalp',categoryLabel:'Kalp & Dolaşım',icon:'🥜',name:'Ceviz & Kakao Kefir Karışımı',support:'Küçük porsiyonda ceviz, şekersiz kakao ve kefiri birleştiren doyurucu bir ara öğün alternatifi olabilir.',ingredients:['¾ su bardağı sade kefir','2 tam ceviz içi','1 çay kaşığı şekersiz kakao'],prep:'Malzemeleri blenderdan geçirin; şeker veya şurup eklemeyin.',note:'Kuruyemiş alerjisinde tüketilmemelidir; enerji yoğun olduğu için porsiyon önemlidir.',tags:['ceviz','kakao','kefir'],keywords:'kalp dolasim dolaşım ceviz kakao kefir ara ogun öğün',image:''},
        {id:'kalp-05',category:'kalp',categoryLabel:'Kalp & Dolaşım',icon:'🍅',name:'Domates & Salatalık Tuzsuz Ayran',support:'Tuzlu hazır içecekler yerine sebze ve sade yoğurtla hazırlanmış, tuzsuz bir seçenek sunar.',ingredients:['½ su bardağı yoğurt','½ su bardağı su','½ küçük domates','¼ salatalık','birkaç nane yaprağı'],prep:'Tüm malzemeleri blenderdan geçirin; tuz eklemeden soğuk tüketin.',note:'Potasyum kısıtlaması gereken böbrek hastalarında içerikler kişiye göre ayarlanmalıdır.',tags:['tuzsuz','yoğurt','sebze'],keywords:'kalp dolasim dolaşım tuzsuz ayran domates salatalik salatalık',image:''},

        // DALAK
        {id:'dalak-01',category:'dalak',categoryLabel:'Dalak',icon:'🍎',name:'Şekersiz Elma & Tarçın Kompostosu',support:'Dalak için özel bir “temizleme” etkisi iddia etmeden, sıcak ve kolay tüketilen bir meyve alternatifi sunar.',ingredients:['½ elma','1 küçük parça çubuk tarçın','1,5 su bardağı su'],prep:'Elmayı tarçınla 6–8 dakika hafifçe kaynatın; şeker eklemeden ılık tüketin.',note:'Dalak hastalıkları beslenme kürüyle tedavi edilmez; büyüme veya ağrı varsa tıbbi değerlendirme gerekir.',tags:['elma','tarçın','ılık tarif'],keywords:'dalak elma tarcin tarçın komposto sıcak ilik ılık',image:''},
        {id:'dalak-02',category:'dalak',categoryLabel:'Dalak',icon:'🎃',name:'Balkabağı & Yoğurt Karışımı',support:'Yumuşak dokulu, küçük porsiyonlu bir ara öğün olarak sebze çeşitliliği ve protein alımına katkı sağlayabilir.',ingredients:['3 yemek kaşığı pişmiş balkabağı','3 yemek kaşığı sade yoğurt','1 tutam tarçın'],prep:'Balkabağını ezin, yoğurtla karıştırın; şeker eklemeyin.',note:'Diyabette porsiyon planı; süt ürünlerine hassasiyette uygun alternatif gerekir.',tags:['balkabağı','yoğurt','yumuşak kıvam'],keywords:'dalak balkabagi balkabağı yogurt yoğurt tarcin tarçın',image:''},
        {id:'dalak-03',category:'dalak',categoryLabel:'Dalak',icon:'🥕',name:'Havuç & Armut Ilık Püresi',support:'Meyve-sebze içeriğini yumuşak kıvamda sunan küçük porsiyonlu bir beslenme alternatifi olabilir.',ingredients:['½ küçük havuç','½ armut','½ su bardağı su','1 tutam tarçın'],prep:'Havuç ve armudu az suyla yumuşatın; blenderdan geçirip ılık tüketin.',note:'Bu tarif bir organ tedavisi değildir; kişisel enerji ve karbonhidrat ihtiyacına göre porsiyon belirlenmelidir.',tags:['havuç','armut','ılık'],keywords:'dalak havuc havuç armut püre ilik ılık',image:''},
        {id:'dalak-04',category:'dalak',categoryLabel:'Dalak',icon:'🥣',name:'Kırmızı Mercimek & Havuç Mini Çorba',support:'Bitkisel protein, lif ve sebzeyi bir araya getiren küçük porsiyonlu sıcak bir tarif olarak genel beslenmeyi destekler.',ingredients:['2 yemek kaşığı kırmızı mercimek','½ küçük havuç','1,5 su bardağı su','kimyon, çok az'],prep:'Malzemeleri tamamen yumuşayana kadar pişirin; blenderdan geçirip tuzu sınırlı tutun.',note:'Gaz-şişkinlik eğiliminde porsiyonu küçük başlayın.',tags:['mercimek','bitkisel protein','sıcak tarif'],keywords:'dalak mercimek havuc havuç corba çorba protein lif',image:''},
        {id:'dalak-05',category:'dalak',categoryLabel:'Dalak',icon:'🍐',name:'Armut & Yulaf Ilık Karışımı',support:'Çözünür lif içeren yulaf ile meyveyi bir araya getiren sıcak ve yumuşak kıvamlı bir ara öğün seçeneğidir.',ingredients:['½ armut','1 yemek kaşığı yulaf','¾ su bardağı su','1 tutam tarçın'],prep:'Armut ve yulafı suyla 5–6 dakika pişirin; ılık tüketin.',note:'Dalakla ilgili özel bir “detoks” etkisi beklenmemelidir; bu tarif genel beslenme içindir.',tags:['armut','yulaf','lif'],keywords:'dalak armut yulaf lif sıcak ilik ılık',image:''},

        // KİLO KONTROLÜ
        {id:'kilo-01',category:'kilo',categoryLabel:'Kilo Kontrolü',icon:'🥒',name:'Salatalık, Nane & Limon Suyu',support:'Kalorili içecekler yerine şekersiz aromalı su tercih etmeyi kolaylaştırarak günlük enerji kontrolüne dolaylı katkı sağlayabilir.',ingredients:['½ salatalık','6–8 nane yaprağı','2 ince limon dilimi','1 litre su'],prep:'Malzemeleri suya ekleyin; 1–2 saat buzdolabında bekletin ve gün içinde tüketin.',note:'Tek başına yağ yakmaz veya kilo verdirmez; kilo kaybı toplam enerji dengesiyle ilişkilidir.',tags:['şekersiz','sıvı','düşük enerji'],keywords:'kilo verme zayiflama zayıflama salatalik salatalık nane limon sivi sıvı',image:''},
        {id:'kilo-02',category:'kilo',categoryLabel:'Kilo Kontrolü',icon:'🫘',name:'Yoğurt & Chia Tokluk Karışımı',support:'Protein ve lif içeren küçük porsiyonlu bir ara öğün olarak daha uzun süre tokluk hissine yardımcı olabilir.',ingredients:['4 yemek kaşığı sade yoğurt','1 tatlı kaşığı chia tohumu','2 yemek kaşığı su','1 tutam tarçın'],prep:'Karıştırıp chia tamamen şişene kadar en az 20 dakika bekletin.',note:'Enerjisi sıfır değildir; günlük toplam enerji planına dahil edilmelidir.',tags:['tokluk','chia','protein'],keywords:'kilo verme zayiflama zayıflama tokluk chia yogurt yoğurt protein lif',image:''},
        {id:'kilo-03',category:'kilo',categoryLabel:'Kilo Kontrolü',icon:'🍏',name:'Yeşil Elma & Yulaf Smoothie',support:'Meyve ve yulafı kontrollü porsiyonda birleştirerek lif içeren dengeli bir ara öğün alternatifi sunar.',ingredients:['½ yeşil elma','1 yemek kaşığı yulaf','¾ su bardağı kefir veya su','tarçın, isteğe bağlı'],prep:'Malzemeleri blenderdan geçirin; ilave şeker veya bal eklemeyin.',note:'Smoothie sıvı olduğu için hızlı tüketilebilir; yavaş içmek ve porsiyonu küçük tutmak önemlidir.',tags:['yulaf','elma','ara öğün'],keywords:'kilo verme zayiflama zayıflama elma yulaf smoothie lif',image:''},
        {id:'kilo-04',category:'kilo',categoryLabel:'Kilo Kontrolü',icon:'🥛',name:'Naneli Salatalıklı Ayran',support:'Şekerli içecekler yerine protein içeren, tuzu sınırlı bir içecek alternatifi olarak kullanılabilir.',ingredients:['½ su bardağı yoğurt','½ su bardağı su','¼ salatalık','4–5 nane yaprağı'],prep:'Tüm malzemeleri blenderdan geçirin; tuz eklemeyin veya çok az kullanın.',note:'Laktoz intoleransı veya süt alerjisinde uygun değildir.',tags:['ayran','protein','şekersiz'],keywords:'kilo verme zayiflama zayıflama ayran salatalik salatalık nane protein',image:''},
        {id:'kilo-05',category:'kilo',categoryLabel:'Kilo Kontrolü',icon:'🍫',name:'Kakao & Kefir Ara Öğünü',support:'Tatlı isteğinde ilave şeker içeren içecekler yerine kontrollü porsiyonlu bir alternatif oluşturabilir.',ingredients:['¾ su bardağı sade kefir','1 çay kaşığı şekersiz kakao','¼ küçük muz, isteğe bağlı','tarçın, isteğe bağlı'],prep:'Malzemeleri blenderdan geçirin; bal, şurup veya şeker eklemeyin.',note:'Muz eklenirse toplam karbonhidrat ve enerji miktarı artar; porsiyonu günlük plana göre ayarlayın.',tags:['kakao','kefir','tatlı isteği'],keywords:'kilo verme zayiflama zayıflama kakao kefir tatli tatlı istegi isteği',image:''}
    ];

    window.detoxRecipesV390 = recipes;
    window.detoxRecipesV391 = recipes;
    window.detoxRecipesV392 = recipes;

    const root = document.getElementById('detoxExplorerV390');
    const grid = document.getElementById('detoxRecipeGridV390');
    const tabs = document.getElementById('detoxCategoryTabsV390');
    const input = document.getElementById('detoxSearchInputV390');
    const searchButton = document.getElementById('detoxSearchButtonV390');
    const clearButton = document.getElementById('detoxSearchClearV390');
    const resetButton = document.getElementById('detoxResetV390');
    const empty = document.getElementById('detoxEmptyV390');
    const count = document.getElementById('detoxResultCountV390');
    const activeLabel = document.getElementById('detoxActiveCategoryV390');
    const totalCount = document.getElementById('detoxTotalCountV390');

    if (!root || !grid || !tabs || !input) return;
    if (totalCount) totalCount.textContent = String(recipes.length);

    let activeCategory = 'all';
    let query = '';

    const categoryLabels = {
        all:'Tüm kategoriler',
        mide:'Mide',
        'ince-bagirsak':'İnce Bağırsak',
        'kalin-bagirsak':'Kalın Bağırsak',
        karaciger:'Karaciğer',
        kalp:'Kalp & Dolaşım',
        dalak:'Dalak',
        kilo:'Kilo Kontrolü'
    };

    function normalize(value) {
        return String(value || '')
            .toLocaleLowerCase('tr-TR')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/ı/g, 'i')
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9\s-]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function escapeHtml(value) {
        return String(value || '').replace(/[&<>"']/g, ch => ({
            '&':'&amp;',
            '<':'&lt;',
            '>':'&gt;',
            '"':'&quot;',
            "'":'&#39;'
        })[ch]);
    }

    function searchable(recipe) {
        return normalize([
            recipe.name,
            recipe.categoryLabel,
            recipe.support,
            recipe.keywords,
            ...(recipe.tags || []),
            ...(recipe.ingredients || [])
        ].join(' '));
    }

    const indexed = recipes.map((recipe, index) => ({
        ...recipe,
        index,
        haystack: searchable(recipe)
    }));

    function matchesCurrent(recipe) {
        const categoryOkay = activeCategory === 'all' || recipe.category === activeCategory;
        const q = normalize(query);
        const queryOkay = !q || recipe.haystack.includes(q);
        return categoryOkay && queryOkay;
    }


    function renderCard(recipe, position) {
        const ingredients = (recipe.ingredients || [])
            .map(item => `<li>${escapeHtml(item)}</li>`)
            .join('');

        const hasImage = !!(recipe.image && String(recipe.image).trim());
        const media = hasImage
            ? `<div class="detox-card-media-v391"><img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.imageAlt || recipe.name)}" loading="lazy" decoding="async"><span class="detox-card-media-badge-v391">${escapeHtml(recipe.categoryLabel)}</span></div>`
            : `<div class="detox-card-media-v391"><div class="detox-card-media-placeholder-v391"><strong>${escapeHtml(recipe.icon || '•')}</strong><span>Görsel eklenecek</span></div><span class="detox-card-media-badge-v391">${escapeHtml(recipe.categoryLabel)}</span></div>`;

        const visualNote = hasImage
            ? `<div class="detox-card-visual-note-v391"><i aria-hidden="true">✓</i><span>Görsel hazır</span></div>`
            : `<div class="detox-card-visual-note-v391 is-pending"><i aria-hidden="true">○</i><span>Görsel sonraki turda eklenecek</span></div>`;

        return `
            <article class="detox-recipe-card-v390" data-category="${escapeHtml(recipe.category)}" data-detox-recipe-v390="${escapeHtml(recipe.id)}">
                <div class="detox-card-top-v390">
                    <span class="detox-card-icon-v390" aria-hidden="true">${escapeHtml(recipe.icon || '•')}</span>
                    <span class="detox-card-number-v390">${String(position + 1).padStart(2,'0')}</span>
                </div>
                ${media}
                <div class="detox-card-copy-v390">
                    ${visualNote}
                    <span class="detox-card-category-v390">${escapeHtml(recipe.categoryLabel)}</span>
                    <h3>${escapeHtml(recipe.name)}</h3>
                    <p class="detox-support-v390"><strong>Destek alanı:</strong> ${escapeHtml(recipe.support)}</p>
                    <div class="detox-tags-v390">
                        ${(recipe.tags || []).slice(0,3).map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}
                    </div>
                    <details class="detox-recipe-detail-v390">
                        <summary>Tarifi ve kullanım notunu gör</summary>
                        <div class="detox-detail-body-v390">
                            <strong>İçindekiler</strong>
                            <ul class="detox-ingredient-list-v390">${ingredients}</ul>
                            <p class="detox-prep-v390"><strong>Hazırlanışı:</strong> ${escapeHtml(recipe.prep)}</p>
                            <p class="detox-card-note-v390"><strong>Dikkat:</strong> ${escapeHtml(recipe.note)}</p>
                        </div>
                    </details>
                </div>
            </article>`;
    }

    function render() {
        const visible = indexed.filter(matchesCurrent);
        grid.innerHTML = visible.map((recipe, index) => renderCard(recipe, index)).join('');

        if (empty) empty.hidden = visible.length !== 0;
        if (grid) grid.hidden = visible.length === 0;
        if (count) count.textContent = `${visible.length} tarif gösteriliyor`;
        if (activeLabel) activeLabel.textContent = categoryLabels[activeCategory] || 'Seçili kategori';
        if (clearButton) clearButton.hidden = !input.value.trim();
        if (resetButton) resetButton.hidden = activeCategory === 'all' && !input.value.trim();

        tabs.querySelectorAll('[data-detox-category-v390]').forEach(button => {
            const isActive = button.dataset.detoxCategoryV390 === activeCategory;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
    }

    function applySearch() {
        query = input.value.trim();
        render();
    }

    tabs.addEventListener('click', event => {
        const button = event.target.closest('[data-detox-category-v390]');
        if (!button) return;
        activeCategory = button.dataset.detoxCategoryV390 || 'all';
        render();
        const y = root.getBoundingClientRect().top + window.scrollY - 110;
        if (window.scrollY > y + 420) window.scrollTo({top:y,behavior:'smooth'});
    });

    input.addEventListener('input', applySearch);
    input.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            applySearch();
        } else if (event.key === 'Escape') {
            input.value = '';
            query = '';
            render();
        }
    });

    searchButton?.addEventListener('click', () => {
        applySearch();
        const first = grid.querySelector('.detox-recipe-card-v390');
        if (first) first.scrollIntoView({behavior:'smooth',block:'nearest'});
    });

    clearButton?.addEventListener('click', () => {
        input.value = '';
        query = '';
        render();
        input.focus();
    });

    resetButton?.addEventListener('click', () => {
        activeCategory = 'all';
        input.value = '';
        query = '';
        render();
        input.focus({preventScroll:true});
    });

    // Genel sağlık sayfasından tekrar Detoks Kürleri'ne girildiğinde açık detayları kapat.
    document.addEventListener('click', event => {
        const trigger = event.target.closest?.('[data-health-detail="kurler"]');
        if (!trigger) return;
        grid.querySelectorAll('details[open]').forEach(detail => detail.removeAttribute('open'));
    });

    render();
})();

// V410 - Fitoterapi bitkiler üst alanı kompakt ve modern görünüme getirildi.
// V412 - Fitoterapi kartlarında 27 başlığa özel, sıfırdan üretilen doğru görseller kullanıldı.
// V413 - 48 fitoterapi kartı hastalığa özel içeriklerle detaylandırıldı ve kart iç tasarımları yenilendi.
// V414 - Ana sayfa alt kontrolleri ilk açılışta daha belirgin olacak şekilde yukarı alındı.
// V415 - Ağrı alanlarındaki Detayları İncele bağlantıları özgün ve kapsamlı içerik pencerelerine bağlandı.
// V416 - Ana Ağrı, Osteopati Ağrı ve tüm detay kartları ortak modern kart sistemiyle yenilendi.
// V417 - Ağrı detay sayfası dikey rehber ve klinik atlas bento düzeniyle baştan tasarlandı.
// V418 - Ağrı detay sayfasındaki diğer ağrılara hızlı geçiş şeridi kaldırıldı.

// =========================================================
// V419 - TÜM SİTEDE GERİ DÖNÜŞ GEÇMİŞİ
// ESC ve tarayıcı geri/ileri düğmeleri, kullanıcının geldiği gerçek
// önceki sekmeyi açar. Doğrudan alt sayfaya girişte önce ana sayfa eklenir.
// =========================================================
(function () {
    const nativePushStateV419 = history.pushState.bind(history);
    const nativeReplaceStateV419 = history.replaceState.bind(history);
    const homeUrlV419 = location.pathname + location.search;
    const initialHashV419 = location.hash;
    let restoringV419 = false;

    function stateWithDepthV419(state, depth) {
        return Object.assign({}, state && typeof state === 'object' ? state : {}, {
            siteNavigationV419: true,
            siteDepthV419: Math.max(0, Number(depth) || 0)
        });
    }

    if (!history.state || !history.state.siteNavigationV419) {
        const originalStateV419 = history.state;
        if (initialHashV419) {
            nativeReplaceStateV419(stateWithDepthV419({ page: 'home' }, 0), '', homeUrlV419);
            nativePushStateV419(stateWithDepthV419(originalStateV419, 1), '', homeUrlV419 + initialHashV419);
        } else {
            nativeReplaceStateV419(stateWithDepthV419(originalStateV419, 0), '', location.href);
        }
    }

    history.pushState = function (state, title, url) {
        const currentDepth = Number(history.state && history.state.siteDepthV419) || 0;
        const nextState = stateWithDepthV419(state, restoringV419 ? currentDepth : currentDepth + 1);
        if (restoringV419) {
            return nativeReplaceStateV419(nextState, title, url);
        }
        return nativePushStateV419(nextState, title, url);
    };

    history.replaceState = function (state, title, url) {
        const currentDepth = Number(history.state && history.state.siteDepthV419) || 0;
        return nativeReplaceStateV419(stateWithDepthV419(state, currentDepth), title, url);
    };

    function removeOpenPageClassesV419() {
        Array.from(document.body.classList).forEach(function (name) {
            if (
                /(?:page|detail|special|featured|standalone)-open/.test(name) ||
                /-nav-scrolled/.test(name) ||
                name === 'osteo-main-open-v356' ||
                name === 'osteo-main-fixed-v357'
            ) {
                document.body.classList.remove(name);
            }
        });
    }

    function showHomeV419() {
        removeOpenPageClassesV419();
        document.body.classList.add('global-home-open-v408');
        document.body.classList.remove('global-subpage-open-v405');

        document.querySelectorAll('section[aria-hidden]').forEach(function (section) {
            if (section.id !== 'anasayfa') section.setAttribute('aria-hidden', 'true');
        });
        document.querySelectorAll('.global-connected-menu-v402.open').forEach(function (menu) {
            menu.classList.remove('open');
            const button = menu.querySelector(':scope > .global-connected-item-v402');
            const panel = menu.querySelector(':scope > .global-connected-panel-v402');
            if (button) button.setAttribute('aria-expanded', 'false');
            if (panel) panel.setAttribute('aria-hidden', 'true');
        });
        document.querySelectorAll('.global-connected-item-v402[aria-current="page"]').forEach(function (button) {
            button.removeAttribute('aria-current');
        });
        const brand = document.getElementById('globalConnectedBrandV402');
        if (brand) brand.setAttribute('aria-current', 'page');
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }

    function clickRouteV419(selector) {
        const target = document.querySelector(selector);
        if (!target) return false;
        restoringV419 = true;
        try {
            target.click();
        } finally {
            restoringV419 = false;
        }
        return true;
    }

    const treatmentRoutesV419 = new Set([
        'osteopati', 'fitoterapi', 'damar-yolu', 'ozon-tedavisi', 'igne',
        'cihaz-uygulamalari', 'geleneksel-tedavi', 'estetik', 'diger-cihazlar', 'robotik-lazer'
    ]);
    const healthRoutesV419 = new Set(['beslenme', 'supplementler', 'kurler', 'egzersizler']);

    function routeAlreadyOpenV419(route) {
        if (treatmentRoutesV419.has(route)) {
            const view = document.querySelector('[data-treatment-detail-view="' + route + '"]');
            return document.body.classList.contains('treatment-detail-open-v71') && view && view.classList.contains('active');
        }
        if (healthRoutesV419.has(route)) {
            const view = document.querySelector('[data-health-detail-view="' + route + '"]');
            return document.body.classList.contains('general-health-detail-open-v75') && view && view.classList.contains('active');
        }
        if (route === 'agri') return document.body.classList.contains('pain-page-open');
        if (route === 'tedavi-alanlari') return document.body.classList.contains('treatment-page-open');
        if (route === 'medya') return document.body.classList.contains('media-page-open');
        return false;
    }

    function restoreRouteV419() {
        const route = decodeURIComponent(location.hash.replace(/^#/, ''));
        if (!route || route === 'ana-sayfa' || route === 'anasayfa') {
            showHomeV419();
            return;
        }
        if (routeAlreadyOpenV419(route)) return;

        if (treatmentRoutesV419.has(route)) {
            clickRouteV419('[data-v402-treatment="' + route + '"]');
            return;
        }
        if (healthRoutesV419.has(route)) {
            clickRouteV419('[data-v402-health="' + route + '"]');
            return;
        }
        if (route === 'agri') {
            clickRouteV419('[data-v402-route="pain"]');
            return;
        }
        if (route === 'tedavi-alanlari') {
            clickRouteV419('[data-v402-route="areas"]');
            return;
        }
        if (route === 'medya') {
            clickRouteV419('[data-v402-route="media"]');
            return;
        }
        if (route === 'hakkimda') {
            clickRouteV419('#heroAboutButton,[href="#hakkimda"]');
            return;
        }
        if (route.indexOf('kvkk-') === 0) {
            clickRouteV419('[data-v402-legal="' + route.slice(5) + '"]');
            return;
        }

        // Hastalık, ağrı detayı ve özel içerik sayfalarının kendi popstate
        // dinleyicileri önce çalışır. Gerekirse mevcut hash bağlantısını tetikle.
        window.setTimeout(function () {
            if (location.hash.replace(/^#/, '') !== route) return;
            const visibleSubpage = Array.from(document.body.classList).some(function (name) {
                return /(?:page|detail|special|featured|standalone)-open/.test(name);
            });
            if (visibleSubpage) return;
            const link = Array.from(document.querySelectorAll('a[href],button[data-disease],button[data-info-guide]')).find(function (item) {
                return item.getAttribute('href') === '#' + route ||
                    item.dataset.disease === route ||
                    item.dataset.infoGuide === route;
            });
            if (link) {
                restoringV419 = true;
                try {
                    link.click();
                } finally {
                    restoringV419 = false;
                }
            }
        }, 50);
    }

    function hasOpenOverlayV419() {
        if (document.body.classList.contains('site-search-modal-open-v400')) return true;
        if (document.body.classList.contains('pain-topic-open-v415')) return true;
        if (document.body.classList.contains('phyto-herb-detail-open-v351')) return true;
        if (document.querySelector('.global-connected-menu-v402.open')) return true;
        if (document.querySelector('[role="dialog"]:not([hidden])[aria-hidden="false"]')) return true;
        return false;
    }

    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape' || event.defaultPrevented) return;
        const active = document.activeElement;
        if (active && /^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName)) return;
        if (hasOpenOverlayV419()) return;

        const isHome = !location.hash && !Array.from(document.body.classList).some(function (name) {
            return /(?:page|detail|special|featured|standalone)-open/.test(name);
        });
        if (isHome) return;

        event.preventDefault();
        event.stopImmediatePropagation();
        const depth = Number(history.state && history.state.siteDepthV419) || 0;
        if (depth > 0) {
            history.back();
        } else {
            restoringV419 = true;
            showHomeV419();
            nativeReplaceStateV419(stateWithDepthV419({ page: 'home' }, 0), '', homeUrlV419);
            restoringV419 = false;
        }
    }, true);

    window.addEventListener('popstate', function () {
        window.setTimeout(restoreRouteV419, 0);
    });

    // Eski ağrı scroll sınıfının menüyü yeniden fixed yapmasını engelle.
    window.addEventListener('scroll', function () {
        if (document.body.classList.contains('pain-page-open')) {
            document.body.classList.remove('pain-nav-scrolled');
        }
    }, { passive: true });
})();

// V419 - Ağrı menüsü sayfa başında sabitlendi; ESC ve tarayıcı geri/ileri
// düğmeleri bütün ana sekmelerde gerçek geliş sırasını izler.

// =========================================================
// V420 - DAMAR YOLU İÇERİKLERİ / KLİNİK VE KANITA DAYALI DİL
// =========================================================
(function () {
    const vascularView = document.querySelector('[data-treatment-detail-view="damar-yolu"]');
    if (!vascularView) return;

    const grid = vascularView.querySelector('.serum-grid-modern-v307');
    if (grid && !vascularView.querySelector('.iv-clinic-note-v420')) {
        const note = document.createElement('section');
        note.className = 'iv-clinic-note-v420';
        note.innerHTML = `
            <span>BENİM YAKLAŞIMIM</span>
            <h2>Damar yolu uygulamasını hazır bir paket gibi görmüyorum.</h2>
            <p>Önce kişinin yakınmasını, tıbbi öyküsünü, kullandığı ilaçları, böbrek-karaciğer durumunu ve gerekiyorsa laboratuvar sonuçlarını değerlendiriyorum. Eksiklik ya da açık bir klinik gerekçe yoksa yalnızca “iyi hissettirsin” düşüncesiyle uygulama planlamıyorum. İçerik, doz ve süre kişiye özel belirlenir; standart tedaviler hiçbir zaman habersizce bırakılmaz.</p>
            <div>
                <strong>Önce değerlendirme</strong>
                <strong>Kişiye özel plan</strong>
                <strong>Steril uygulama</strong>
                <strong>Uygulama sonrası takip</strong>
            </div>`;
        grid.parentNode.insertBefore(note, grid);
    }

    const details = {
        karnitinDetailV243: {
            kicker: 'L-KARNİTİN • KLİNİK BİLGİ',
            title: 'L-Karnitin damar yolu uygulamasını nasıl değerlendiriyorum?',
            intro: 'L-karnitin, uzun zincirli yağ asitlerinin mitokondriye taşınmasında görev alan doğal bir bileşiktir. Ancak bu biyolojik görev, her yorgunluk ya da kilo verme isteğinde damar yoluyla L-karnitin gerektiği anlamına gelmez.',
            what: ['Benim için ilk soru “enerji verir mi?” değil, kişide gerçek bir eksiklik veya tanımlı bir tıbbi gereksinim olup olmadığıdır.', 'Karnitin eksikliği bazı kalıtsal metabolizma hastalıklarında, belirli ilaçların kullanımında ve bazı diyaliz hastalarında görülebilir. Uygulama kararı bu nedenle öykü, muayene ve gerekli tetkiklerle birlikte verilir.'],
            consider: ['Belgelenmiş ya da kuvvetle düşünülen karnitin eksikliği', 'Diyaliz veya özel metabolik hastalık gibi hekimce tanımlanmış durumlar', 'Ağızdan kullanımın uygun olmadığı ve parenteral yolun gerçekten gerekli görüldüğü durumlar'],
            before: ['Böbrek fonksiyonları ve diyaliz öyküsü', 'Valproat başta olmak üzere kullanılan ilaçlar', 'Nöbet öyküsü, gebelik-emzirme durumu ve önceki reaksiyonlar', 'Beklenen yararın ölçülebilir bir hedefe dayanıp dayanmadığı'],
            risks: ['Bulantı, karın krampları ve damar yolu bölgesinde rahatsızlık görülebilir.', 'Nöbet öyküsü olanlarda özel dikkat gerekir.', 'Kilo kaybı veya sportif performans için tek başına garantili sonuç vermez.'],
            evidence: 'Levokarnitinin tıbbi kullanım alanları tanımlıdır; buna karşılık genel “yağ yakma” ve zindelik amaçlı IV kullanım için kanıt düzeyi aynı güçte değildir. Bu yüzden vaat değil, endikasyon ve takip üzerinden konuşuyorum.',
            sources: [['NIH ODS: Karnitin – sağlık profesyonelleri için bilgi', 'https://ods.od.nih.gov/factsheets/Carnitine-HealthProfessional/'], ['DailyMed: Levokarnitin enjeksiyon ürün bilgileri', 'https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=levocarnitine%20injection']]
        },
        seleniumDetailV244: {
            kicker: 'SELENYUM • KLİNİK BİLGİ',
            title: 'Selenyum uygulamasında neden önce gereksinime bakıyorum?',
            intro: 'Selenyum; selenoproteinler, antioksidan enzimler ve tiroid hormon metabolizması için gerekli bir eser elementtir. Fakat gerekli olması, yüksek dozun daha iyi olduğu anlamına gelmez; güvenli aralık dardır.',
            what: ['Ben selenyumu rutin bir “bağışıklık serumu” olarak değerlendirmiyorum. Beslenme, emilim, laboratuvar bulguları ve klinik tablo birlikte anlamlıysa gündeme alıyorum.', 'Damar yolu yolu özellikle parenteral beslenme gibi belirli tıbbi durumlarda anlamlı olabilir. Sağlıklı bir kişide yalnızca genel zindelik amacıyla kullanılmasının yararı net değildir.'],
            consider: ['Belgelenmiş eksiklik veya emilim bozukluğu', 'Uzun süreli parenteral beslenmede eser element gereksinimi', 'Klinik ve laboratuvar verilerinin birlikte desteklediği özel durumlar'],
            before: ['Selenyum düzeyi ve toplam günlük alım', 'Tiroid hastalığı ve kullanılan tiroid ilaçları', 'Böbrek-karaciğer fonksiyonları', 'Saç-tırnak değişikliği, metalik tat veya önceki yüksek doz kullanımı'],
            risks: ['Fazla alım; bulantı, metalik tat, saç-tırnak değişiklikleri ve sinir sistemi belirtilerine yol açabilir.', 'Takviyelerle alınan toplam doz hesaba katılmalıdır.', 'Eksiklik gösterilmeden tekrarlayan uygulama planlamam.'],
            evidence: 'Selenyumun fizyolojik rolü iyi bilinmektedir; fakat normal düzeye sahip kişilerde IV uygulamanın hastalıkları önlediği veya enerjiyi belirgin artırdığı gösterilmiş değildir. Hedefim düzeyi “ne kadar yüksek o kadar iyi” yapmak değil, gereksinimi doğru karşılamaktır.',
            sources: [['NIH ODS: Selenyum – sağlık profesyonelleri için bilgi', 'https://ods.od.nih.gov/factsheets/Selenium-HealthProfessional/'], ['DailyMed: Selenyum içeren enjeksiyon ürün bilgileri', 'https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=selenious%20acid%20injection']]
        },
        nadDetailV242: {
            kicker: 'NAD+ • KLİNİK BİLGİ',
            title: 'IV NAD+ hakkında beklentiyi nasıl dengeliyorum?',
            intro: 'NAD+, hücrede enerji üretimi ve çok sayıda enzimatik süreçte görev alan bir koenzimdir. Bu temel biyolojik rol ilgi çekicidir; fakat damar yoluyla NAD+ uygulamasının “gençleştirme”, zihinsel performans veya kronik hastalık tedavisi sağladığı yönündeki klinik kanıtlar henüz sınırlıdır.',
            what: ['Kişi NAD+ istediğinde önce yorgunluğun daha sık görülen nedenlerini araştırıyorum: uyku, anemi, tiroid, enfeksiyon, ilaçlar, beslenme ve psikolojik yük bunların başında gelir.', 'Uygulamayı düşüneceksek, kanıtın sınırlarını, maliyeti, uygulama süresini ve beklenen hedefi açıkça konuşuyorum.'],
            consider: ['Standart değerlendirmede açıklanamayan yakınmaların dikkatle gözden geçirilmesi', 'Kişinin deneysel veya kanıtı sınırlı yaklaşım konusunda bilgilendirilmesi', 'Ölçülebilir bir takip hedefi ve gereksiz tekrardan kaçınma'],
            before: ['Kalp-damar, böbrek ve karaciğer hastalıkları', 'Gebelik-emzirme, düzenli ilaçlar ve alerji öyküsü', 'Uygulama sırasında göğüs sıkışması, bulantı veya kramp gelişme riski', 'Beklentinin gerçekçi olup olmadığı'],
            risks: ['Bulantı, karın krampları, baş ağrısı, flushing ve göğüste sıkışma hissi bildirilebilir.', 'Hız ve doz toleransı etkileyebilir; yakın izlem gerekir.', 'Uzun dönem yarar ve güvenlik verileri sınırlıdır.'],
            evidence: 'NAD biyolojisi güçlü bir araştırma alanıdır; ancak biyolojik olarak önemli olmak, IV uygulamanın klinik yararının kanıtlandığı anlamına gelmez. Bu ayrımı hastaya açıkça anlatıyorum.',
            sources: [['PubMed: IV NAD+ klinik araştırmaları', 'https://pubmed.ncbi.nlm.nih.gov/?term=intravenous+NAD%2B+clinical+trial'], ['PubMed: NAD metabolizması ve insan çalışmaları', 'https://pubmed.ncbi.nlm.nih.gov/?term=NAD+metabolism+human+clinical+trial']]
        },
        glutathioneDetailV241: {
            kicker: 'GLUTATYON • KLİNİK BİLGİ',
            title: 'Glutatyonu “detoks serumu”ndan daha doğru nasıl anlatıyorum?',
            intro: 'Glutatyon, hücrenin redoks dengesinde ve bazı yabancı maddelerin işlenmesinde görev alan önemli bir tripeptittir. Fakat vücudun doğal sistemlerinde yer alması, IV glutatyonun herkeste karaciğeri temizlediği veya hastalıkları tedavi ettiği anlamına gelmez.',
            what: ['Ben “detoks” kelimesini tek başına bir tanı gibi kullanmıyorum. Önce yakınmanın kaynağını, karaciğer-böbrek işlevlerini, beslenmeyi, ilaçları ve olası maruziyetleri değerlendiriyorum.', 'Glutatyonun belirli klinik alanlarda araştırmaları vardır; sonuçlar endikasyona göre değişir ve rutin zindelik kullanımı için kesin bir standart oluşmuş değildir.'],
            consider: ['Tanısı ve hedefi belirli, hekimce takip edilen destek planları', 'Oksidatif stresin rol oynayabileceği durumlarda mevcut tedaviye ek yaklaşımın tartışılması', 'Ağızdan seçenekler ve temel yaşam düzenlemeleri yetersiz ya da uygunsuzsa değerlendirme'],
            before: ['Astım ve ciddi alerji öyküsü', 'Gebelik-emzirme ve kullanılan ilaçlar', 'Karaciğer-böbrek fonksiyonları', 'Uygulamanın hangi ölçülebilir hedef için planlandığı'],
            risks: ['Alerjik reaksiyon, bronkospazm, bulantı veya damar yolu reaksiyonu gelişebilir.', 'Cilt rengini açma amacıyla kullanımın güvenliği ve etkinliği konusunda önemli belirsizlikler vardır.', 'Ürün kalitesi, hazırlanma ve sterilite en az içerik kadar önemlidir.'],
            evidence: 'Glutatyonun hücresel rolü iyi tanımlıdır; IV uygulamanın klinik sonuçları ise hastalığa ve protokole göre değişir. Bu nedenle genel bir “toksin temizleme” sözü vermiyorum.',
            sources: [['PubMed: İntravenöz glutatyon klinik araştırmaları', 'https://pubmed.ncbi.nlm.nih.gov/?term=intravenous+glutathione+clinical+trial'], ['FDA: Steril/kompoze enjeksiyon ürünlerinde güvenlik uyarıları', 'https://www.fda.gov/drugs/human-drug-compounding']]
        },
        vitaminCDetailV234: {
            kicker: 'C VİTAMİNİ • KLİNİK BİLGİ',
            title: 'Yüksek doz IV C vitaminini hangi çerçevede değerlendiriyorum?',
            intro: 'C vitamini kolajen sentezi, antioksidan savunma ve bazı enzimlerin çalışması için gereklidir. Damar yoluyla verildiğinde ağızdan alıma göre daha yüksek plazma düzeylerine ulaşabilir; ancak bu farmakokinetik fark tek başına hastalık tedavisi kanıtı değildir.',
            what: ['Ben uygulamayı planlamadan önce kişinin hedefini netleştiriyorum. Eksiklik, emilim sorunu veya belirli bir klinik destek amacı yoksa “yüksek doz daha iyidir” yaklaşımını kullanmıyorum.', 'Özellikle kanser tedavisi gören hastalarda onkoloji ekibinden bağımsız hareket etmiyorum; IV C vitamini standart tedavinin yerine geçmez ve bazı tedavilerle etkileşim konusu ayrıca değerlendirilir.'],
            consider: ['Belgelenmiş eksiklik veya ağızdan alımın yeterli olmadığı durumlar', 'Tedavi ekibiyle birlikte kararlaştırılmış destek planları', 'Yararın, riskin ve takip hedefinin kişiye özel olarak netleştirildiği durumlar'],
            before: ['Böbrek fonksiyonu, böbrek taşı ve oksalat öyküsü', 'Yüksek doz planlanıyorsa G6PD eksikliği riski', 'Demir yüklenmesi hastalıkları ve kullanılan ilaçlar', 'Bazı kan şekeri ölçüm cihazlarında yanlış sonuç riski'],
            risks: ['Damar yolu irritasyonu, sıvı yükü ve elektrolit sorunları görülebilir.', 'Böbrek hastalığı veya taş öyküsünde oksalatla ilişkili risk artabilir.', 'G6PD eksikliğinde yüksek doz hemoliz riski taşıyabilir; uygun tarama gerekir.'],
            evidence: 'C vitamininin eksiklik tedavisindeki yeri nettir. Yüksek doz IV kullanımın kanser, enfeksiyon, yorgunluk veya kronik ağrı üzerindeki sonuçları ise aynı kesinlikte değildir ve çalışma sonuçları karışıktır. Bu nedenle kanıtı, hedefi ve belirsizliği birlikte anlatıyorum.',
            sources: [['NIH ODS: C vitamini – sağlık profesyonelleri için bilgi', 'https://ods.od.nih.gov/factsheets/VitaminC-HealthProfessional/'], ['NCI: Yüksek doz C vitamini hakkında kanser bilgi özeti', 'https://www.cancer.gov/about-cancer/treatment/cam/patient/vitamin-c-pdq']]
        },
        ozoneDetailV239: {
            kicker: 'OZONLU SERUM • KLİNİK BİLGİ',
            title: 'Ozonlu serum uygulamasını nasıl değerlendiriyorum?',
            intro: 'Ozon güçlü bir oksidan gazdır. Tıbbi ozon uygulamalarında amaç, kontrollü bir işlemle biyolojik yanıt oluşturmaktır; fakat yöntem, konsantrasyon ve uygulama yolu güvenlik açısından kritik önemdedir.',
            what: ['Ben ozonu “kana oksijen yüklemek” veya her hastalığı iyileştirmek şeklinde anlatmıyorum. Araştırmalar çoğunlukla oksidatif sinyal, redoks yanıtı ve inflamasyonla ilişkili mekanizmaları inceliyor.', 'Klinik kanıt hastalığa ve yönteme göre değişir. Bu nedenle standart tedaviyi bırakmayı önermiyor; varsa kullanım amacını tamamlayıcı bir çerçevede ve açık risk konuşmasıyla ele alıyorum.'],
            consider: ['Tanısı belirlenmiş ve standart tedavisi sürdürülmekte olan kişide tamamlayıcı yaklaşımın tartışılması', 'Uygulama yolunun, konsantrasyonun ve protokolün açıkça tanımlanması', 'Yararın ölçülebilir hedeflerle ve düzenli yeniden değerlendirmeyle izlenmesi'],
            before: ['G6PD eksikliği ve ciddi anemi riski', 'Kanama-pıhtılaşma sorunları ve kan sulandırıcı ilaçlar', 'Gebelik, kontrolsüz tiroid hastalığı ve ciddi kardiyovasküler durumlar', 'Kullanılacak yöntemin sterilite ve cihaz güvenliği'],
            risks: ['Gazın doğrudan damar içine verilmesi güvenli bir yaklaşım değildir.', 'Damar yolu, enfeksiyon, reaksiyon ve dolaşım yükü riskleri yönteme göre değişir.', 'Kanıt düzeyi sınırlı alanlarda kesin sonuç veya hastalık tedavisi vaadi verilmemelidir.'],
            evidence: 'Ozonla ilgili mekanizma çalışmaları ve bazı klinik araştırmalar bulunsa da, sonuçların kalitesi ve genellenebilirliği uygulama alanına göre değişir. Düzenleyici kurumların yaklaşımı ülkeden ülkeye farklıdır; bu nedenle yöntemi kanıt ve güvenlik sınırlarıyla birlikte anlatıyorum.',
            sources: [['PubMed: Medikal ozon klinik araştırmaları', 'https://pubmed.ncbi.nlm.nih.gov/?term=medical+ozone+randomized+clinical+trial'], ['eCFR: Ozon için ABD düzenleyici güvenlik çerçevesi', 'https://www.ecfr.gov/current/title-21/chapter-I/subchapter-H/part-801/subpart-H/section-801.415']]
        },
        majorOzoneDetailV240: {
            kicker: 'MAJÖR OTOHEMOTERAPİ • KLİNİK BİLGİ',
            title: 'Majör ozon uygulamasında süreç ve güvenlik neden önemlidir?',
            intro: 'Majör otohemoterapide belirli miktarda kan kapalı bir sistemde alınır, tanımlı ozon-oksijen karışımıyla temas ettirilir ve yeniden dolaşıma verilir. Bu işlem “seruma ozon eklemekten” farklıdır ve eğitimli ekip, uygun cihaz, doğru konsantrasyon ve steril zincir gerektirir.',
            what: ['Ben yöntemi dolaşımı veya oksijenlenmeyi kesin artıran bir tedavi olarak sunmuyorum. Araştırılan konu; kan bileşenlerinde oluşan kontrollü redoks sinyalinin vücudun yanıt sistemleriyle ilişkili olup olmadığıdır.', 'Uygulama planlanırsa hastanın tanısı, standart tedavisi, kan değerleri ve damar yolu riski birlikte değerlendirilir.'],
            consider: ['Standart tedaviye alternatif olmadan tamamlayıcı yaklaşımın tartışıldığı durumlar', 'Protokol, konsantrasyon ve uygulama sayısının açıkça kayıt altına alınması', 'Her seans öncesinde toleransın ve klinik hedefin yeniden değerlendirilmesi'],
            before: ['Hemogram, anemi ve G6PD eksikliği riski', 'Kanama-pıhtılaşma öyküsü ve antikoagülan kullanımı', 'Ciddi kalp-akciğer hastalığı, gebelik ve aktif enfeksiyon', 'Damar erişimi, sıvı dengesi ve önceki seans reaksiyonları'],
            risks: ['Damar yolu komplikasyonu, enfeksiyon, baş dönmesi, tansiyon değişikliği veya vazovagal reaksiyon görülebilir.', 'Hatalı uygulama yolu ve uygun olmayan cihaz ciddi risk oluşturabilir.', 'Kanıtın sınırlı olduğu hastalıklarda sonuç garantisi verilmez.'],
            evidence: 'Majör otohemoterapi üzerine yayınlar vardır; ancak protokoller ve çalışma kalitesi değişkendir. Ben olası biyolojik mekanizmayı, gösterilmiş klinik yararla aynı şeymiş gibi anlatmıyorum.',
            sources: [['PubMed: Ozon otohemoterapi klinik araştırmaları', 'https://pubmed.ncbi.nlm.nih.gov/?term=ozone+autohemotherapy+clinical+trial'], ['eCFR: Ozon için ABD düzenleyici güvenlik çerçevesi', 'https://www.ecfr.gov/current/title-21/chapter-I/subchapter-H/part-801/subpart-H/section-801.415']]
        }
    };

    function list(items) {
        return `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
    }

    function renderSources(items) {
        return items.map(([label, url]) => `
            <a class="vitamin-c-link-card-v234 internal iv-source-card-v420" href="${url}" target="_blank" rel="noopener noreferrer">
                <span>GÜVENİLİR KAYNAK ↗</span>
                <strong>${label}</strong>
                <small>Kaynak metin birebir alınmamış; içerik klinik dilde yeniden yorumlanmıştır.</small>
            </a>`).join('');
    }

    Object.entries(details).forEach(([id, item]) => {
        const section = document.getElementById(id);
        if (!section) return;
        const intro = section.querySelector('.vitamin-c-special-intro-v235');
        const editorial = section.querySelector('.vitamin-c-editorial-v234');
        if (intro) {
            intro.innerHTML = `<span>${item.kicker}</span><h1>${item.title}</h1><p>${item.intro}</p>`;
        }
        if (editorial) {
            editorial.innerHTML = `
                <header class="vitamin-c-doc-head-v234">
                    <span class="vitamin-c-doc-kicker-v234">${item.kicker}</span>
                    <h2>${item.title}</h2>
                </header>
                <div class="iv-detail-grid-v420">
                    <section class="vitamin-c-doc-section-v234">
                        <h3>1. Hangi durumda gündeme alırım?</h3>
                        ${list(item.consider)}
                    </section>
                    <section class="vitamin-c-doc-section-v234">
                        <h3>2. Uygulama öncesinde nelere bakarım?</h3>
                        ${list(item.before)}
                    </section>
                    <section class="vitamin-c-doc-section-v234">
                        <h3>3. Riskler ve dikkat edilmesi gerekenler</h3>
                        ${list(item.risks)}
                    </section>
                    <section class="vitamin-c-doc-section-v234">
                        <h3>4. Bilimsel kanıtı nasıl yorumluyorum?</h3>
                        <p>${item.evidence}</p>
                    </section>
                </div>
                <div class="vitamin-c-links-head-v235 iv-source-head-v420">
                    <span>KAYNAK YAKLAŞIMI</span>
                    <h3>Okumayı derinleştirmek isteyenler için</h3>
                    <p>Metinleri kaynaklardan kopyalamadım. Güvenilir kurumların ürün bilgileri ve bilimsel yayınlarını okuyup, hastanın anlayacağı şekilde kendi klinik anlatım dilimle yeniden yazdım.</p>
                </div>
                <div class="vitamin-c-link-panel-v234" aria-label="Bilimsel ve resmi kaynaklar">
                    ${renderSources(item.sources)}
                </div>
                <p class="vitamin-c-final-note-v234"><strong>Benim temel kuralım:</strong> Damar yolu uygulaması muayenenin, tanının ve standart tedavinin yerine geçmez. Uygunluk, doz, içerik ve tekrar sıklığı kişiye özel belirlenir; uygulama steril klinik koşullarda ve sağlık ekibi gözetiminde yapılır.</p>`;
        }
    });
})();

// V420 - Damar yolu kartları ve yedi ayrıntı sekmesi; daha ölçülü,
// kaynak temelli ve Dr. Ceyhun Nuri'nin birinci tekil anlatım diliyle yenilendi.

// =========================================================
// V421 - HASTALIK SAYFALARI / AÇILIR HIZLI GEÇİŞ VE GÖRSELLİ SEKMELER
// =========================================================
(function () {
    const diseaseImagesV421 = {
        as: './disease-ankilozan-spondilit-v77.png?v=150',
        ra: './romatoid-artrit-hero-v199.png?v=202',
        'bas-agrisi-migren': './disease-bas-agrisi-migren-v77.png?v=150',
        'bel-sirt-agrisi': './disease-bel-sirt-agrisi-v77.png?v=150',
        fibromiyalji: './disease-fibromiyalji-v77.png?v=150',
        'huzursuz-bacak': './disease-huzursuz-bacak-v77.png?v=150',
        'iltihabi-bagirsak': './disease-iltihabi-bagirsak-v77.png?v=150',
        'kronik-yorgunluk': './disease-kronik-yorgunluk-v77.png?v=150'
    };

    const pageConfigsV421 = [
        {
            page: document.getElementById('ankilozanFaqSectionV85'),
            nav: '.ankilozan-page-nav-v87',
            switcher: '.disease-switcher-as-v250'
        },
        {
            page: document.getElementById('romatoidFaqSectionV198'),
            nav: '.ra-page-nav-v198',
            switcher: '.disease-switcher-ra-v250'
        },
        {
            page: document.getElementById('conditionDiseasePageV246'),
            nav: '.condition-page-nav-v249',
            switcher: '.disease-switcher-condition-v250'
        }
    ];

    function enhanceSwitcherV421(config) {
        const page = config.page;
        const nav = page?.querySelector(config.nav);
        const switcher = page?.querySelector(config.switcher);
        const grid = switcher?.querySelector('.disease-switch-grid-v250');
        if (!page || !nav || !switcher || !grid) return;

        switcher.classList.add('disease-switcher-collapsible-v421');

        let toggle = switcher.querySelector('.disease-switch-toggle-v421');
        if (!toggle) {
            toggle = document.createElement('button');
            toggle.type = 'button';
            toggle.className = 'disease-switch-toggle-v421';
            toggle.setAttribute('aria-expanded', 'false');
            toggle.innerHTML = `
                <span class="disease-switch-toggle-icon-v421" aria-hidden="true">⌘</span>
                <span class="disease-switch-toggle-copy-v421">
                    <small>TEDAVİ ALANLARI</small>
                    <strong>Diğer Hastalıklara Hızlı Ulaş</strong>
                </span>
                <span class="disease-switch-toggle-state-v421" aria-hidden="true">＋</span>`;
            switcher.insertBefore(toggle, switcher.firstChild);
        }

        const panelId = `${config.switcher.replace(/[^a-z0-9]/gi, '')}PanelV421`;
        grid.id = panelId;
        grid.hidden = true;
        grid.setAttribute('role', 'tablist');
        grid.setAttribute('aria-label', 'Hastalıklar arasında hızlı geçiş');
        toggle.setAttribute('aria-controls', panelId);

        grid.querySelectorAll('[data-disease-switch-v250]').forEach(button => {
            const key = button.dataset.diseaseSwitchV250;
            button.classList.add('disease-image-tab-v421');
            button.setAttribute('role', 'tab');
            button.setAttribute('aria-selected', button.classList.contains('is-active') ? 'true' : 'false');
            if (diseaseImagesV421[key]) {
                button.style.setProperty('--disease-tab-image-v421', `url("${diseaseImagesV421[key]}")`);
            }
        });

        function setOpenV421(open) {
            switcher.classList.toggle('is-open-v421', open);
            toggle.setAttribute('aria-expanded', String(open));
            grid.hidden = !open;
            const state = toggle.querySelector('.disease-switch-toggle-state-v421');
            if (state) state.textContent = open ? '−' : '＋';
        }

        toggle.onclick = () => setOpenV421(!switcher.classList.contains('is-open-v421'));
        grid.addEventListener('click', event => {
            const button = event.target.closest('[data-disease-switch-v250]');
            if (!button) return;
            grid.querySelectorAll('[data-disease-switch-v250]').forEach(item => {
                item.setAttribute('aria-selected', String(item === button));
            });
            window.setTimeout(() => setOpenV421(false), 80);
        });

        // Hızlı geçiş, üst menünün hemen altında sabit bir yer tutar.
        if (nav.nextElementSibling !== switcher) nav.insertAdjacentElement('afterend', switcher);
    }

    function placeAllSwitchersV421() {
        pageConfigsV421.forEach(enhanceSwitcherV421);
    }

    function enhanceDiseaseTopicTabsV421() {
        document.querySelectorAll('.treatment-launcher-v279 .as-launch-card-v274, #asLauncherV274 .as-launch-card-v274').forEach(button => {
            button.classList.add('disease-topic-tab-v421');
            button.setAttribute('aria-haspopup', 'true');
            button.setAttribute('aria-pressed', button.classList.contains('is-primary-v274') ? 'true' : 'false');
            button.addEventListener('click', () => {
                const group = button.closest('.as-launcher-grid-v274');
                group?.querySelectorAll('.disease-topic-tab-v421').forEach(item => {
                    item.classList.remove('is-selected-v421', 'is-primary-v274');
                    item.setAttribute('aria-pressed', 'false');
                });
                button.classList.add('is-selected-v421');
                button.setAttribute('aria-pressed', 'true');
            });
        });
    }

    placeAllSwitchersV421();
    enhanceDiseaseTopicTabsV421();

    // Önceki sürümlerin açılışta yaptığı yer değişikliklerinden sonra da
    // açılır menüyü yeniden üst navigasyonun altına getir.
    ['openAnkilozanPageV87', 'openRomatoidPageV198', 'openConditionDiseaseV249'].forEach(name => {
        const original = window[name];
        if (typeof original !== 'function' || original.__v421Wrapped) return;
        const wrapped = function (...args) {
            const result = original.apply(this, args);
            window.setTimeout(placeAllSwitchersV421, 180);
            return result;
        };
        wrapped.__v421Wrapped = true;
        window[name] = wrapped;
    });

    document.addEventListener('click', event => {
        if (event.target.closest('[data-disease-switch-v250], .disease-switch-toggle-v421')) return;
        document.querySelectorAll('.disease-switcher-collapsible-v421.is-open-v421').forEach(switcher => {
            switcher.classList.remove('is-open-v421');
            const toggle = switcher.querySelector('.disease-switch-toggle-v421');
            const grid = switcher.querySelector('.disease-switch-grid-v250');
            toggle?.setAttribute('aria-expanded', 'false');
            if (toggle?.querySelector('.disease-switch-toggle-state-v421')) {
                toggle.querySelector('.disease-switch-toggle-state-v421').textContent = '＋';
            }
            if (grid) grid.hidden = true;
        });
    });

    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        document.querySelectorAll('.disease-switcher-collapsible-v421.is-open-v421').forEach(switcher => {
            switcher.querySelector('.disease-switch-toggle-v421')?.click();
        });
    });

    window.addEventListener('popstate', () => window.setTimeout(placeAllSwitchersV421, 120));
})();

// V421 - Serum ayrıntı giriş paragrafları kaldırıldı; ana hero otomatik geçişi
// 10 saniyeye alındı; hastalıklar görsel sekmeli açılır hızlı menüye dönüştürüldü.

// =========================================================
// V422 - BÜTÜN HASTALIK SAYFALARINDA TEK ORTAK HIZLI ULAŞIM MENÜSÜ
// =========================================================
(function () {
    const diseasesV422 = [
        ['as', 'AS', 'Ankilozan Spondilit', './disease-ankilozan-spondilit-v77.png?v=150'],
        ['ra', 'RA', 'Romatoid Artrit', './romatoid-artrit-hero-v199.png?v=202'],
        ['bas-agrisi-migren', '01', 'Baş Ağrısı & Migren', './disease-bas-agrisi-migren-v77.png?v=150'],
        ['bel-sirt-agrisi', '02', 'Bel & Sırt Ağrısı', './disease-bel-sirt-agrisi-v77.png?v=150'],
        ['fibromiyalji', '03', 'Fibromiyalji', './disease-fibromiyalji-v77.png?v=150'],
        ['huzursuz-bacak', '04', 'Huzursuz Bacak', './disease-huzursuz-bacak-v77.png?v=150'],
        ['iltihabi-bagirsak', '05', 'İltihabi Bağırsak', './disease-iltihabi-bagirsak-v77.png?v=150'],
        ['kronik-yorgunluk', '06', 'Kronik Yorgunluk', './disease-kronik-yorgunluk-v77.png?v=150']
    ];

    const toolbar = document.createElement('section');
    toolbar.id = 'globalDiseaseSwitcherV422';
    toolbar.className = 'global-disease-switcher-v422 disease-switcher-collapsible-v421';
    toolbar.setAttribute('aria-label', 'Diğer hastalıklara hızlı ulaşım');
    toolbar.hidden = true;
    toolbar.innerHTML = `
        <button type="button" class="disease-switch-toggle-v421 global-disease-toggle-v422" aria-expanded="false" aria-controls="globalDiseaseGridV422">
            <span class="disease-switch-toggle-icon-v421" aria-hidden="true">⌘</span>
            <span class="disease-switch-toggle-copy-v421">
                <small>TEDAVİ ALANLARI</small>
                <strong>Diğer Hastalıklara Hızlı Ulaş</strong>
            </span>
            <span class="disease-switch-toggle-state-v421" aria-hidden="true">＋</span>
        </button>
        <div class="disease-switch-grid-v250 global-disease-grid-v422" id="globalDiseaseGridV422" role="tablist" aria-label="Hastalıklar arasında hızlı geçiş" hidden>
            ${diseasesV422.map(([key, code, title, image]) => `
                <button type="button" class="disease-switch-card-v250 disease-image-tab-v421" data-disease-switch-v250="${key}" role="tab" aria-selected="false" style="--disease-tab-image-v421:url('${image}')">
                    <span class="disease-switch-code-v250">${code}</span>
                    <strong>${title}</strong>
                    <span class="disease-switch-arrow-v250" aria-hidden="true">↗</span>
                </button>`).join('')}
        </div>`;

    const toggle = toolbar.querySelector('.global-disease-toggle-v422');
    const grid = toolbar.querySelector('.global-disease-grid-v422');

    function setOpenV422(open) {
        toolbar.classList.toggle('is-open-v421', open);
        toggle.setAttribute('aria-expanded', String(open));
        grid.hidden = !open;
        toggle.querySelector('.disease-switch-toggle-state-v421').textContent = open ? '−' : '＋';
    }

    toggle.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        setOpenV422(!toolbar.classList.contains('is-open-v421'));
    });

    grid.addEventListener('click', event => {
        if (!event.target.closest('[data-disease-switch-v250]')) return;
        window.setTimeout(() => setOpenV422(false), 100);
    });

    function activeContextV422() {
        if (document.body.classList.contains('ankilozan-page-open-v87')) {
            return {
                page: document.getElementById('ankilozanFaqSectionV85'),
                nav: document.querySelector('#ankilozanFaqSectionV85 .ankilozan-page-nav-v87'),
                key: 'as'
            };
        }
        if (document.body.classList.contains('romatoid-page-open-v198')) {
            return {
                page: document.getElementById('romatoidFaqSectionV198'),
                nav: document.querySelector('#romatoidFaqSectionV198 .ra-page-nav-v198'),
                key: 'ra'
            };
        }
        if (document.body.classList.contains('condition-disease-page-open-v246')) {
            const state = typeof window.getConditionDiseaseStateV279 === 'function'
                ? window.getConditionDiseaseStateV279()
                : null;
            const fallback = location.hash.replace('#', '').split('-overview')[0];
            return {
                page: document.getElementById('conditionDiseasePageV246'),
                nav: document.getElementById('conditionPageNavV249'),
                key: state?.key || fallback
            };
        }
        return null;
    }

    function mountV422() {
        const context = activeContextV422();
        if (!context?.page || !context.nav) {
            toolbar.hidden = true;
            setOpenV422(false);
            return;
        }

        toolbar.hidden = false;
        const heroAnchor = context.key === 'as'
            ? context.page.querySelector('#asMainHeroV275, .as-main-hero-v275')
            : context.key === 'ra'
                ? context.page.querySelector('.ra-hero-v280, .ra-hero-v198')
                : context.page.querySelector('.condition-hero-v280, .condition-overview-poster-v249');
        const anchor = heroAnchor || context.nav;
        if (anchor.nextElementSibling !== toolbar) {
            anchor.insertAdjacentElement('afterend', toolbar);
        }

        toolbar.querySelectorAll('[data-disease-switch-v250]').forEach(button => {
            const active = button.dataset.diseaseSwitchV250 === context.key;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-selected', String(active));
            if (active) button.setAttribute('aria-current', 'page');
            else button.removeAttribute('aria-current');
        });
    }

    // Sayfa sınıfı hangi yöntemle değişirse değişsin ortak menü aktif sayfaya taşınır.
    const observer = new MutationObserver(() => window.requestAnimationFrame(mountV422));
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    document.addEventListener('click', event => {
        if (event.target.closest('#globalDiseaseSwitcherV422')) return;
        if (toolbar.classList.contains('is-open-v421')) setOpenV422(false);
        window.setTimeout(mountV422, 220);
    }, true);

    window.addEventListener('popstate', () => window.setTimeout(mountV422, 180));
    window.setTimeout(mountV422, 0);
})();

// V422 - Hızlı hastalık menüsü artık Ankilozan, Romatoid ve altı dinamik
// hastalık sayfasında aynı ortak bileşen olarak görünür.

// V423 - Hastalık sayfalarının orta ekran açılışında içerik sekmeleri,
// hero görseli kısaltılarak ilk görünüm alanına taşındı.

// V424 - İçerik buton paneli tüm masaüstü genişliklerinde hero görselinin
// üst bölümüne sabitlendi; sayfa açılışında doğrudan görünür.

// =========================================================
// V425 - HASTALIK GİRİŞLERİ OSTEOPATİ VİTRİN DÜZENİ
// =========================================================
(function () {
    const summaries = {
        as: 'Omurga, sakroiliak eklemler, hareket kapasitesi ve günlük yaşam üzerindeki etkiler birlikte değerlendirilir.',
        ra: 'Eklem yakınmaları, hareket kapasitesi, günlük yaşam ve kişiye özgü bulgular birlikte değerlendirilir.'
    };

    function prepareLauncherV425(launcher, title, summary) {
        if (!launcher || !title) return;
        launcher.classList.add('disease-entry-launcher-v425');
        const kicker = launcher.querySelector('.as-launcher-head-v274 span');
        const heading = launcher.querySelector('.as-launcher-head-v274 h2');
        const description = launcher.querySelector('.as-launcher-head-v274 p');
        if (kicker) kicker.textContent = 'TEDAVİ ALANI • BÜTÜNCÜL DEĞERLENDİRME';
        if (heading) heading.textContent = title;
        if (description) description.textContent = summary || 'Belirtiler, günlük yaşam ve kişiye özgü değerlendirme başlıkları birlikte ele alınır.';
    }

    function refreshDiseaseEntriesV425() {
        prepareLauncherV425(
            document.getElementById('asLauncherV274'),
            'Ankilozan Spondilit',
            summaries.as
        );

        const raSummary = document.querySelector('#romatoidFaqSectionV198 .ra-hero-copy-v198 p')?.textContent?.trim();
        prepareLauncherV425(
            document.getElementById('raLauncherV279'),
            'Romatoid Artrit',
            raSummary || summaries.ra
        );

        const conditionTitle = document.getElementById('conditionTitleV249')?.textContent?.trim();
        const conditionSummary = document.getElementById('conditionSummaryV249')?.textContent?.trim();
        prepareLauncherV425(
            document.getElementById('conditionLauncherV279'),
            conditionTitle,
            conditionSummary
        );
    }

    const titleNode = document.getElementById('conditionTitleV249');
    if (titleNode) {
        new MutationObserver(() => window.requestAnimationFrame(refreshDiseaseEntriesV425))
            .observe(titleNode, { childList: true, subtree: true, characterData: true });
    }

    document.addEventListener('click', () => window.setTimeout(refreshDiseaseEntriesV425, 100), true);
    window.addEventListener('popstate', () => window.setTimeout(refreshDiseaseEntriesV425, 100));
    window.setTimeout(refreshDiseaseEntriesV425, 0);
})();

// V425 - Tüm hastalık girişleri sol metin + altı içerik kartı ve sağ medikal
// görselden oluşan Osteopati benzeri ortak vitrin düzenine geçirildi.

// V426 - Ozon sayfasındaki ek başlık giriş metni ve üst Minör Otohemoterapi
// bağlantı butonu kaldırıldı; ayrıntılı içerik korunmuştur.

// V427 - Ozon girişindeki tekrar eden üç bağlantı kaldırıldı; başlık ve kısa
// açıklama koyu panel içinde taşmadan görünecek şekilde yenilendi.


// =========================================================
// V428 - FİTOTERAPİ BİLGİ GÖRSELLERİNİ KOMPAKTLAŞTIR
// "Fitoterapi Nedir?" gibi bilgi blokları sonradan oluşturulsa bile
// görsel alanı ikinci örneğe yakın kompakt ölçüye çekilir.
// =========================================================
(function () {
    function normalizePhytoTextV428(value) {
        return String(value || '')
            .toLocaleLowerCase('tr-TR')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/ı/g, 'i')
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/\s+/g, ' ')
            .trim();
    }

    const targetTitlesV428 = [
        'fitoterapi nedir',
        'fitoterapide amac nedir',
        'bir bitki = tek etki degildir',
        'bir bitki tek etki degildir'
    ];

    function findImageAncestorV428(heading) {
        let node = heading.parentElement;
        let depth = 0;

        while (node && node !== document.body && depth < 7) {
            const image = node.querySelector(':scope > img, :scope > figure img, :scope > div img, img');
            if (image) return { block: node, image };
            node = node.parentElement;
            depth += 1;
        }

        return null;
    }

    function compactPhytoInfoV428() {
        const phytoRoot = document.querySelector('[data-treatment-detail-view="fitoterapi"], .phytotherapy-page-v127');
        if (!phytoRoot) return;

        phytoRoot.querySelectorAll('h1, h2, h3').forEach(heading => {
            const text = normalizePhytoTextV428(heading.textContent);
            if (!targetTitlesV428.some(title => text.includes(title))) return;

            const found = findImageAncestorV428(heading);
            if (!found) return;

            const { block, image } = found;
            block.classList.add('phyto-compact-info-v428');

            const media = image.parentElement;
            if (media) media.classList.add('phyto-compact-image-v428');
        });
    }

    compactPhytoInfoV428();

    const observerV428 = new MutationObserver(() => {
        window.requestAnimationFrame(compactPhytoInfoV428);
    });

    observerV428.observe(document.body, {
        childList: true,
        subtree: true
    });

    document.addEventListener('click', () => {
        window.setTimeout(compactPhytoInfoV428, 60);
    }, true);
})();

// V428 - Fitoterapi bilgi görselleri ikinci örneğe yakın, daha küçük ve dengeli ölçüye getirildi.


// V429 - Global tipografi: başlıklarda Sora, gövde metinlerinde Inter kullanılır.


// V430 - Sosyal Medya > TV Programları bölümüne Dr. Ceyhun Nuri TV Programları
// YouTube oynatma listesi vitrini eklendi. Mevcut tekil TV video kartları korunur.


// V431 - TV Programları oynatma listesi vitrini medya sayfasında
// YouTube panelinden TV Programları paneline taşındı; mevcut medya
// sekme davranışı değişmeden korunmaktadır.

// V432 - TV Programları bölümündeki eski iki tekil video kartı kaldırıldı;
// oynatma listesi vitrini tek ana TV içeriği olarak korunur.


// =========================================================
// V435 - AĞRI SAYFASI AÇILIŞINDA MEDYA KATMANINI KAPAT
// Farklı eski yönlendirme dinleyicileri çalışsa bile Ağrı ve Medya
// sayfalarının aynı anda açık kalmasını engeller.
// =========================================================
(function () {
    const body = document.body;
    const painPage = document.getElementById('agriPage');
    const mediaPage = document.getElementById('medyaPage');

    if (!body || !painPage || !mediaPage) return;

    let cleaningV435 = false;

    function isolatePainPageV435() {
        if (cleaningV435 || !body.classList.contains('pain-page-open')) return;

        cleaningV435 = true;
        // Yalnızca gerçekten değişiklik varsa DOM'u güncelle. Böylece
        // MutationObserver kendi yaptığı değişikliği tekrar tekrar tetiklemez.
        if (body.classList.contains('media-page-open') || body.classList.contains('media-nav-scrolled')) {
            body.classList.remove('media-page-open', 'media-nav-scrolled');
        }
        if (mediaPage.getAttribute('aria-hidden') !== 'true') {
            mediaPage.setAttribute('aria-hidden', 'true');
        }
        if (painPage.getAttribute('aria-hidden') !== 'false') {
            painPage.setAttribute('aria-hidden', 'false');
        }
        cleaningV435 = false;
    }

    // Eski click dinleyicilerinden önce Medya durumunu temizle.
    document.addEventListener('click', function (event) {
        const painTrigger = event.target.closest(
            '#heroPainButton, #treatmentPagePainButton, #painPageButton, ' +
            '#osteoGlobalPainButtonV107, #conditionPainV249, #ankilozanPainButtonV87, ' +
            '#romatoidPainButtonV198, [href="#agri"], [data-v402-route="pain"]'
        );

        if (!painTrigger) return;

        if (body.classList.contains('media-page-open') || body.classList.contains('media-nav-scrolled')) {
            body.classList.remove('media-page-open', 'media-nav-scrolled');
        }
        if (mediaPage.getAttribute('aria-hidden') !== 'true') {
            mediaPage.setAttribute('aria-hidden', 'true');
        }
        window.setTimeout(isolatePainPageV435, 0);
    }, true);

    // Sınıfları sonradan değiştiren eski kodlara karşı görünümü eşitle.
    const observerV435 = new MutationObserver(isolatePainPageV435);
    observerV435.observe(body, {
        attributes: true,
        attributeFilter: ['class']
    });

    if (location.hash === '#agri') {
        window.setTimeout(isolatePainPageV435, 0);
    }
})();

// V435 - Ağrı sekmesi açıldığında Sosyal Medya sayfası artık altta görünmez.

// V436 - Ağrı/Medya güvenlik kontrolündeki tekrar eden MutationObserver
// döngüsü kaldırıldı; yükleme ekranında takılma önlendi.

// V437 - Hastalık özel içerik başlıkları ortak düzene alındı; uzun
// "Ana Sayfa" dönüş metinleri minimal, erişilebilir geri kontrolüne çevrildi.


// =========================================================
// V438 - ANKİLOZAN ANA SAYFASINI VE 6 BUTONU KESİN GÖSTER
// Birikmiş eski sayfa sınıfları Ankilozan vitrininin görünürlüğünü kapatmasın.
// =========================================================
(function () {
    const body = document.body;
    const page = document.getElementById('ankilozanFaqSectionV85');
    const launcher = document.getElementById('asLauncherV274');

    if (!body || !page || !launcher) return;

    const competingClassesV438 = [
        'treatment-page-open',
        'treatment-nav-scrolled',
        'treatment-detail-open-v71',
        'treatment-detail-nav-scrolled-v71',
        'general-health-detail-open-v75',
        'general-featured-open-v124',
        'pain-page-open',
        'pain-nav-scrolled',
        'pain-full-detail-open-v215',
        'media-page-open',
        'media-nav-scrolled',
        'about-page-open',
        'about-nav-scrolled',
        'romatoid-page-open-v198',
        'condition-disease-page-open-v246'
    ];

    let syncingV438 = false;

    function syncAnkilozanLandingV438() {
        if (syncingV438 || !body.classList.contains('ankilozan-page-open-v87')) return;

        syncingV438 = true;
        competingClassesV438.forEach(className => {
            if (body.classList.contains(className)) body.classList.remove(className);
        });

        if (page.getAttribute('aria-hidden') !== 'false') {
            page.setAttribute('aria-hidden', 'false');
        }

        const hero = document.getElementById('asMainHeroV275');
        if (hero && launcher.parentElement !== hero) {
            hero.appendChild(launcher);
        }

        launcher.hidden = false;
        launcher.removeAttribute('aria-hidden');
        syncingV438 = false;
    }

    document.addEventListener('click', event => {
        const trigger = event.target.closest(
            '.ankilozan-card-link-v87, .js-open-ankilozan-v85, #ankilozanHeroButtonV85, ' +
            '[data-disease-switch-v250="as"], [data-condition-hero-open-v309="as"]'
        );
        if (!trigger) return;
        window.setTimeout(syncAnkilozanLandingV438, 0);
        window.setTimeout(syncAnkilozanLandingV438, 220);
    }, true);

    const observerV438 = new MutationObserver(syncAnkilozanLandingV438);
    observerV438.observe(body, { attributes:true, attributeFilter:['class'] });

    window.addEventListener('popstate', () => {
        if (location.hash === '#ankilozan-spondilit') {
            window.setTimeout(syncAnkilozanLandingV438, 0);
        }
    });

    window.setTimeout(syncAnkilozanLandingV438, 0);
})();

// V438 - Ankilozan Spondilit girişindeki altı içerik butonu tekrar görünür.
