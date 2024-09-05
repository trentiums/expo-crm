/* eslint-disable quotes */
const English = {
  common: {
    hello: 'Hello,',
    learnmore: 'LEARN MORE',
    or: 'OR',
    cancel: 'Cancel',
    add: 'Add',
    confirm: 'Confirm',
  },
  errors: {
    generic: 'Oops, something went wrong. Try again later.',
    form: {
      required: 'This field is required.',
      invalidEmail: 'Please enter a valid email address.',
      lowerCase: 'Fields must contain lowercase letters',
      badDigit: 'Field must contains a Number',
      maxLengthError: 'Exceeded maximum character limit.',
      websiteLink: 'Link is invalid',
      passwordError:
        'Password Must Contain 1 upper Case , 1Lower Case and 1 Number',
      passwordMissMatch: 'Passwords do not match',
    },
  },
  login: {
    signIn: 'Sign In',
    loginaccount: 'Log in to your account',
    username: 'Enter Username',
    usernamelabel: 'Enter your username',
    usernameforgot: 'Forgot your username?',
    login: 'SIGN IN',
    register: 'Register now',
    donthaveaccount: "Don't have an account?",
    privatekeylabel: 'Enter your private key',
    resetkey: 'Request your private key',
    loginbutton: 'Sign in',
    privatekey: 'Enter Private Key',
    errors: {
      userNotExists: 'User is not exists.',
      userExists: 'User is already exists.',
    },
    password: 'Enter Password',
    passwordLable: 'Enter your Password',
    email: 'Enter Email',
    emailLabel: 'Enter your Email',
    loginSuccess: 'Login Successfully',
  },
  forgot: {
    forgotusername: 'Forgot your username?',
    send: 'SEND',
    back: 'Back',
    recoveryemail: 'Your recovery e-mail',
  },
  signup: {
    createaccount: 'Create an account',
    back: 'Back',
    finish: 'Finish',
    next: 'Next',
    ihaveaccount: 'I already have an account',
    recoveryemail: 'Recovery e-mail',
    enterEmail: 'Enter Email',
    fname: 'First name',
    lname: 'Last name',
    username: 'Enter your username',
  },
  drawer: {
    logout: 'Log Out',
    dashboard: 'Dashboard',
    leads: 'Leads',
    users: 'Users',
    poweredByTrentiums: 'Powered By Trentiums Solutions',
    poweredBy: 'Powered By',
    products: 'Product / Services',
    trentiums: 'Trentiums Solutions',
    welcome: 'Welcome,',
    searchUsers: 'Search User',
    services: 'Services',
  },
  screenTitle: {
    notification: 'Notification',
    addLead: 'Add Lead',
    editLead: 'Edit Lead',
    addUser: 'Add User',
    editUser: 'Edit User',
    editLeadStatus: 'Edit Lead Status',
    editLeadStage: 'Edit Lead Stage',
    addProduct: 'Add Product / Services',
    products: 'Product / Services',
    editProducts: 'Edit Product / Services',
    leadStatusChange: 'Lead Status Change',
    leadStageChange: 'Lead Stage Change',
  },
  leadDetailList: {
    name: 'User Name',
    leadChannel: 'Lead Channel',
    leadChannelPlaceHolder: 'Channels',
    leadStatus: 'Lead Status',
    leadStatusPlaceHolder: 'Status List',
    LeadStage: 'Lead Stage',
    LeadStagePlaceHolder: 'Stage List',
    lead: 'Lead',
    selectAnOption: 'Select an option',
    list: 'List',
    assignTo: 'Assign To',
    channel: 'Channel',
    status: 'Status',
    stage: 'Stage',
  },
  errorMessage: {
    failedOpenURL: 'Failed to open URL:',
    failedToMakeCall: 'Failed to make a call',
    failedToMakeWhatsApp: 'Failed to open WhatsApp.',
    failedToMakeMailApp: 'Error opening mail app',
    copyText: 'Text Copied !',
    failedToCopy: 'Failed to copy text',
  },
  leadDetailCardDetails: {
    edit: 'Edit',
    delete: 'Delete',
    whatsapp: 'Whatsapp',
    canNotFindId: 'can not found id plz try again',
  },
  modalText: {
    disCardDescription: 'Are you sure want to delete?',
    discardMedia: 'Confirmation',
    yesDiscard: 'Delete',
    cancel: 'Cancel',
    searchLeads: 'Search Leads',
    addProduct: 'P/S',
    emailOpenFailed: 'Failed to open email client',
    emailNotAvailable: 'Email address is not available',
  },
  BasicInformation: {
    firstNameLabel: 'Full Name',
    lastNameLabel: 'Last Name',
    emailLabel: 'Email',
    phoneNumberLabel: 'Phone Number',
    uploadDocuments: 'Upload Documents',
    documents: 'Documents',
    attachments: 'Documents',
    storagePermission: 'Permission to access storage',
    storagePermissionDesc:
      'We need your permission to access your storage to pick files',
    askLater: 'Ask Me Later',
    cancel: 'Cancel',
    ok: 'Ok',
    fileSizeLimitExceed: 'File size must be less than 5 MB.',
    selectCountry: 'Country',
    countryCodeError: 'Please select country code',
    phoneNumberError: 'Please enter phone number',
    fileSizeExceeded: 'File size limit exceeded',
    samplePdf: 'This is a sample PDF generated using expo-print.',
    pdfContent: 'PDF Content',
  },
  formButtonName: {
    previous: 'Previous',
    next: 'Next',
    save: 'Save',
    cancel: 'Cancel',
  },
  companyInformation: {
    companyNameLabel: 'Company Name',
    industryLabel: 'Industry',
    companySizeLabel: 'Company Size',
    websiteLabel: 'Web Site',
  },
  leadDetails: {
    sourceLabel: 'Services',
    productLabel: 'Product',
    budgetLabel: 'Budget',
    budgetLabelPlaceholder: 'e.g 500 INR',
    timeFrameToPurchaseLabel: 'Timeframe to Purchase',
    commentsLabel: 'Comments',
    timeFrameToPurchaseEg: 'e.g 1 Month',
    description: 'Description',
    winCloseReason: 'Win Close Reason',
    dealAmount: 'Deal Amount',
    dealCloseDate: 'Deal Close Date',
    list: 'List',
  },
  addData: {
    lead: 'Lead',
    user: 'User',
  },
  notificationScreen: {
    notification: 'Notification',
    noNotification: 'No New Notifications',
  },
  UserInformation: {
    firstNameLabel: 'User Name',
    emailLabel: 'Email address',
    phoneNumberLabel: 'Phone Number',
    uploadProfileImage: 'Upload Profile Image',
    documents: 'Documents',
    profileImage: 'Profile Image',
    addProfile: 'Add Profile',
    editProfile: 'Edit Profile',
    password: 'Create password',
    confirmPassword: 'Confirm password',
  },
  dealWinClose: {
    dealAmount: 'Deal Amount',

    description: 'Description ',
    reason: 'Reason',
  },
  dashBoard: {
    newLeads: 'Leads',
    noLeadsFound: 'Oops ! No Leads Found',
    noLeadsDashboard:
      ' Oops ! No Leads Found want to add lead then click on add button',
    noUsersFound: 'Oops ! No Users Found',
    addLeads: 'Add Lead',
  },
  addProduct: {
    name: 'Name',
    description: 'Description',
    descriptionEg: 'Enter description here...',
    document: 'Documents',
    nameEg: 'Product or Services name',
    uploadDocuments: 'Upload Documents',
    uploadAnotherDocument: 'Upload another document',
  },
  leadsFilter: {
    startDate: 'Start Date',
    endDate: 'End Date',
    orderBy: 'Order By',
    sortOrder: 'Sort Order',
    status: 'Status',
    channel: 'Channel',
    conversion: 'Conversion',
    search: 'Search',
    list: 'List',
    applyFilter: 'Apply Filters',
    removeFilter: 'Clear All',
  },
  leadStatus: {
    new: 'New',
    contacted: 'Contacted',
    qualified: 'Qualified',
    unQualified: 'Unqualified',
  },
  tabs: {
    dashboard: 'Dashboard',
    leads: 'Leads',
    users: 'Users',
    services: 'Services',
  },
};

export default English;
