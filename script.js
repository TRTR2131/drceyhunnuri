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
