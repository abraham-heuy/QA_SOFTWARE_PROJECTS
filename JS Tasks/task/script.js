const user = {
    id: "USER-123456",
    name: {
        first: "Alice",
        last: "Liddell"
    },
    email: "alice@example.com",
    address: {
        shipping: {
            street: "123 Rabbit Hole",
            city: "Wonderland",
            state: "Fantasy",
            postalCode: "12345",
            country: "WL"
        },
        billing: {
            street: "456 Mad Hatter Lane",
            city: "Tea Party",
            state: "Fantasy",
            postalCode: "67890",
            country: "WL"
        }
    },
    payment: {
        total: "100.00",
        currency: "USD",
        details: {
            subtotal: "75.00",
            tax: "15.00",
            shipping: "10.00"
        },
        transactions: [
            {
                id: "TXN-123", amount: "50.00", description: "Magic Potion"
            },

            { id: "TXN-456", amount: "50.00", description: "EnchantedSword" }
        ]
    }
};

//extract data for the personal info
    const {id, name:{first, last}, email} = user
    const userInfo = document.getElementById("personal-info")
    const createParagraph = (label, value) => `<p><strong>${label}:</strong> ${value}</p>`;
    userInfo.innerHTML = `
    <h2>Personal Information</h2>
    ${createParagraph("ID", id)}
    ${createParagraph("Name", `${first} ${last}`)}
    ${createParagraph("Email", email)}`
//extract information for the shipping address
 const {address:{shipping:{street: shipStreet, city: shipCity, state: shipState, postalCode: shipPostalCode, country: shipCountry}}} = user
 const shippingInfo = document.getElementById("shipping-address")
 shippingInfo.innerHTML = `
  <h2>Shipping Address</h2>
    ${createParagraph("Street", shipStreet)}
    ${createParagraph("City", shipCity)}
    ${createParagraph("State", shipState)}
    ${createParagraph("Postal Code", shipPostalCode)}
    ${createParagraph("Country", shipCountry)}
 `
 //extract information for the billing address
 const {address:{billing:{street: billStreet, city: billCity, state: billState, postalCode: billPostalCode, country: billCountry}}} = user
 const billingInfo = document.getElementById("billing-address")
 billingInfo.innerHTML = `
    <h2>Billing Address</h2>
    ${createParagraph("Street", billStreet)}
    ${createParagraph("City", billCity)}
    ${createParagraph("State", billState)}
    ${createParagraph("Postal Code", billPostalCode)}
    ${createParagraph("Country", billCountry)}
 `
//extract information for the transactions
 

const { payment: { transactions } } = user;
const transactionInfo = document.getElementById("transactions");
const createParagraph2 = (desc, details) => `<p><strong>${desc}:</strong> ${details}</p>`;

transactionInfo.innerHTML = `
  <h2>Transactions</h2>
  <ul>
    ${transactions.map(({ id, amount, description }) => 
      `<li>${createParagraph2(description, `$${amount} (ID: ${id})`)}</li>`).join('')}
  </ul>
`;
