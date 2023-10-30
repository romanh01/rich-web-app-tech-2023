document.addEventListener("DOMContentLoaded", function ()
{
    // Storing key elements as vars
    const contactForm = document.getElementById("contact-form");
    const contactTable = document.getElementById("contact-table");
    const errorDiv = document.getElementById("error");
    const noResultDiv = document.getElementById("noResult");
    const addContactButton = document.getElementById("add-contact");
    const nameHeader = contactTable.querySelector("th:first-child");

    let contacts = []; // Hold contact details - each contact is an obj
    let nameSortOrder = 1; // To keep track of sort order (asc or desc)

    addContactButton.addEventListener("click", function () 
    {
        const name = document.getElementById("name").value;
        const mobile = document.getElementById("mobile").value;
        const email = document.getElementById("email").value;

        if (!validateContact(name, mobile, email)) 
        {
            return;
        }

        const timestamp = new Date().getTime(); // PK is timestamp - to add contacts sequentially
        contacts.push({ timestamp, name, mobile, email });

        refreshContactTable();
        contactForm.reset();
    });

    // Form validation for adding contacts
    function validateContact(name, mobile, email) 
    {
        if (!name.match(/^[A-Za-z]+\s[A-Za-z]+$/) || name.length > 20) 
        {
            showError("Invalid Name");
            return false;
        }
        if (!mobile.match(/^\d{10}$/)) 
        {
            showError("Invalid Mobile Number");
            return false;
        }
        if (!email.includes("@") || email.length > 40) 
        {
            showError("Invalid Email");
            return false;
        }
        return true;
    }

    function showError(message) 
    {
        errorDiv.textContent = message;
        errorDiv.classList.remove("hidden");
    }

    // Update table with newly added contact
    function refreshContactTable(filteredContacts) 
    {
        errorDiv.classList.add("hidden");
        noResultDiv.classList.add("hidden");
        contactTable.querySelector("tbody").innerHTML = ""; // clearing table first

        let sortedContacts = [...contacts];

        if (nameSortOrder === -1) 
        {
            sortedContacts.sort((a, b) => b.name.localeCompare(a.name));
        } 
        else 
        {
            sortedContacts.sort((a, b) => a.name.localeCompare(b.name));
        }

        // Checking if user entered mobile first exists
        if (filteredContacts) 
        {
            sortedContacts = sortedContacts.filter(contact => contact.mobile.includes(filteredContacts));
            if (sortedContacts.length === 0)
            {
                noResultDiv.classList.remove("hidden");
            }
        }

        sortedContacts.forEach(contact => {
            const row = contactTable.querySelector("tbody").insertRow();
            row.insertCell(0).textContent = contact.name;
            row.insertCell(1).textContent = contact.mobile;
            row.insertCell(2).textContent = contact.email;
        });
    }

    document.getElementById("search").addEventListener("input", function () 
    {
        const searchValue = document.getElementById("search").value;
        refreshContactTable(searchValue);
    });

    // Changing sort order (asc or desc)
    nameHeader.addEventListener("click", function () 
    {
        nameSortOrder *= -1;
        refreshContactTable();
    });
});