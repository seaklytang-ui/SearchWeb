//const API_URL = "https://localhost:7142/api/Search/landno";
const API_URL = "https://searchinformationsystem-2.onrender.com/api/Search/landno";

function show(id) {
    document.getElementById(id).style.display = "block";
}

function hide(id) {
    document.getElementById(id).style.display = "none";
}

function setValue(field, value) {

    const element = document.querySelector(`[data-field="${field}"]`);

    if (!element) return;

    if (value === null || value === undefined || value === "") {
        element.innerText = "-";
        return;
    }

    element.innerText = value;
}

function formatDate(value) {

    if (!value) return "-";

    const d = new Date(value);

    if (isNaN(d)) return "-";

    return d.toLocaleDateString("en-GB");
}

async function searchLand() {

    hide("result");
    hide("notFound");
    show("loading");

    const keyword = document.getElementById("txtLandNo").value.trim();

    if (keyword === "") {

        hide("loading");

        alert("សូមបញ្ចូលលេខក្បាលដី");

        return;
    }

    try {

        const response =
            await fetch(API_URL + "?keyword=" + encodeURIComponent(keyword));

        const data = await response.json();

        hide("loading");

        if (data.length === 0) {

            show("notFound");

            return;
        }

        const x = data[0];

        // General

        setValue("landNo", x.landNo);
        setValue("propertyType", x.propertyType);
        setValue("areaSqm", x.areaSqm);
        setValue("legalStatus", x.legalStatus);
        setValue("certificateNo", x.certificateNo);
        setValue("landUseImage", x.landUseImage);
        setValue("landUseType", x.landUseType);
        setValue("disputedLand", x.disputedLand);
        setValue("ownershipSource", x.ownershipSource);
        setValue("recordDate", formatDate(x.recordDate));

        // Husband

        setValue("husbandName", x.husbandName);
        setValue("husbandOwnerStatus", x.husbandOwnerStatus);
        setValue("husbandDob", formatDate(x.husbandDob));
        setValue("husbandNationality", x.husbandNationality);
        setValue("husbandIdCard", x.husbandIdCard);
        setValue("husbandBirthPlace", x.husbandBirthPlace);
        setValue("husbandFatherName", x.husbandFatherName);
        setValue("husbandMotherName", x.husbandMotherName);
        setValue("husbandAddress", x.husbandAddress);

        // Wife

        setValue("wifeName", x.wifeName);
        setValue("wifeOwnerStatus", x.wifeOwnerStatus);
        setValue("wifeDob", formatDate(x.wifeDob));
        setValue("wifeNationality", x.wifeNationality);
        setValue("wifeIdCard", x.wifeIdCard);
        setValue("wifeBirthPlace", x.wifeBirthPlace);
        setValue("wifeFatherName", x.wifeFatherName);
        setValue("wifeMotherName", x.wifeMotherName);
        setValue("wifeAddress", x.wifeAddress);

        // Organization

        setValue("legalEntityType", x.legalEntityType);
        setValue("organizationName", x.organizationName);
        setValue("organizationAddress", x.organizationAddress);
        setValue("representativeName", x.representativeName);
        setValue("representativeIdCard", x.representativeIdCard);
        setValue("representativePosition", x.representativePosition);

        if (
            x.organizationName ||
            x.organizationAddress ||
            x.representativeName
        ) {
            show("organizationCard");
        } else {
            hide("organizationCard");
        }

        show("result");

    } catch (e) {

        hide("loading");

        alert("មិនអាចភ្ជាប់ទៅ API បាន");

        console.log(e);

    }
}

document.addEventListener("DOMContentLoaded", function () {

    const txt = document.getElementById("txtLandNo");

    txt.focus();

    txt.addEventListener("keypress", function (e) {

        if (e.key === "Enter") {

            searchLand();

        }

    });

});