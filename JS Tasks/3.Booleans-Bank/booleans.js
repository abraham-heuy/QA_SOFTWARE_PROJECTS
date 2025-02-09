import bcrypt from 'bcrypt';

// Step 1: Create function verifyPassword
async function verifyPassword(inputPassword, storedHashedPassword) {
    return await bcrypt.compare(inputPassword, storedHashedPassword);
}

// Step 2: Create function verifyMFA
function verifyMFA(inputMfacode, correctMfaCode) {
    return inputMfacode === correctMfaCode;
}

// Step 3: Create function checkBalance
function checkBalance(balance, withdrawalAmount) {
    return balance >= withdrawalAmount;
}

// Step 4: Create function checkDailyLimit
function checkDailyLimit(withdrawalAmount, dailyLimit) {
    return withdrawalAmount <= dailyLimit;
}

// Step 5: Create function processWithdrawal
async function processWithdrawal(user, inputPassword, inputMfaCode, withdrawalAmount) {
    if (!(await verifyPassword(inputPassword, user.hashedPassword))) {
        return "Transaction Failed: Incorrect password";
    }
    if (!verifyMFA(inputMfaCode, user.correctMfaCode)) {
        return "Transaction Failed: MFA Failed.";
    }
    if (!checkBalance(user.balance, withdrawalAmount)) {
        return "Transaction Failed: Insufficient balance.";
    }
    if (!checkDailyLimit(withdrawalAmount, user.dailyLimit)) { 
        return "Transaction Failed: Amount exceeds daily limit.";
    }

    // Deduct amount after all checks pass
    user.balance -= withdrawalAmount;
    return `Transaction Successful! New balance: ${user.balance}`;
}

// Export functions
export { verifyPassword, verifyMFA, checkBalance, checkDailyLimit, processWithdrawal };


/* //Challenge Questions:
1. Password Authentication:
○ Why is it important to store passwords in a hashed format? What security
advantage does this provide over plain text passwords?
    ....ANSWER:
    -> storing hashed passwords means that no plain text passwords in the database, and incase of 
    a breach, the unauthorised party is not able to determine what is the actual password. The hashed password is compared
    to the entered user password to determine if its correct.
2. Multi-Factor Authentication (MFA):
○ How does implementing MFA enhance the security of the transaction process?
What types of attacks does it help prevent?
  .....ANSWER:
  -> MFA is a type of authentication mechanism for users to provide more verifcation methods
  rather than the usual authentication mechanism.
  It helps prevent malicious attacks like:
     -phishing 
     -brute force 
     -Man in the middle attacks
3. Balance Verification:
○ Why is it necessary to check the account balance before allowing a withdrawal?
What risks are involved if this step is skipped?
.....ANSWER:
   -> Checking the account balance before transactions makes it easy to recover details and make it possible to 
   monitor your account and avoid transactions many times or other types of attacks. And also to make sure that no transaction is made with a zero or negative balance.
4. Daily Transaction Limit:
○ What purpose does the daily transaction limit serve? How does it help in
preventing fraudulent or excessive withdrawals?
.....ANSWER:
 -> this makes sure that the transactions are limited to a certain amount. Since some of the accounts may have 
 no fraud cases or transacting over the transaction limit.
5. Improvement:
○ If you were to add extra features, such as fraud detection (e.g., detecting
abnormal withdrawal patterns), how would you go about doing this? What
additional data would you track to detect fraud? 
 ....Answer:
 -Analyzing past deposits and withdrawal patterns to determine if the account user is able to reach those amounts.
 -Analyzing the daily transaction behaviour to determine any deviation.
 -Cheking logs for the account to detect any abnormal behaviour
 */

