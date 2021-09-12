console.log( 'Starting automated send' );

// # DEV
const CARBON_HOST = 'https://cms.dev.carbon.motortrend.com/';

// # STG
// #CARBON_HOST=https://cms.stg.carbon.motortrend.com/

// # PREPROD
// #CARBON_HOST=https://cms.preprod.carbon.motortrend.com/

// # PROD
// #CARBON_HOST=https://cms.carbon.motortrend.com/

// #LOCAL
// const CARBON_HOST = 'http://motortrend.carbon.test/';

// GO BAY GO!!!!
(async () => {
    // Prevent form submit
    const form = document.querySelector('form')
    form.addEventListener('submit', event => {
    event.preventDefault()
    })

    // Listen for click on submit
    const submitBtn = document.getElementById('submit')
    submitBtn.addEventListener( 'click', async e => {
        await run();
    })
 })()

const run = async () => {
    const csvInput = document.getElementById('csv')
    let csvList = [];
    csvList = csvInput.files;

    // Loop through files
    for (let i = 0; i < csvList.length; i++) {
        let file = csvList.item(i);
        await sendFile(file);
    }
}

function delay(delayInms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }

const sendFile = async (csvFile) => { 
    const formData = new FormData()
    formData.set('csv', csvFile);
    axios.defaults.withCredentials = false;
    try{
        const url = CARBON_HOST + 'wp-json/mt/v1/test/pushToActiveMQCreateQueue'

        console.log(url);
        const res = await axios.post(url, formData )
        console.log(res);
        await delay(20000);

    } catch (err) {
        console.log(err);
    }
}