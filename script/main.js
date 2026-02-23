let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

let totalCount = document.getElementById('total-count');
let interviewCount = document.getElementById('interview-count');
let rejectedCunt = document.getElementById('rejected-count');

const allFilterBtn = document.getElementById('btn-all-filter');
const interviewFilterBtn = document.getElementById('btn-interview-filter');
const rejectedFilterBtn = document.getElementById('btn-rejected-filter');

const allJobsSection = document.getElementById('all-jobs');
const mainSection = document.querySelector('main');
const filterSection = document.getElementById('filtered-section');

function calculateCount() {
    totalCount.innerText = allJobsSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCunt.innerText = rejectedList.length;
}

calculateCount();


function toggleStyle(id) {
    // adding background gray for all tabs
    allFilterBtn.classList.add('bg-gray-300', 'text-black');
    interviewFilterBtn.classList.add('bg-gray-300', 'text-black');
    rejectedFilterBtn.classList.add('bg-gray-300', 'text-black');

    // if any button has blue then remove
    allFilterBtn.classList.remove('bg-blue-500', 'text-white');
    interviewFilterBtn.classList.remove('bg-blue-500', 'text-white');
    rejectedFilterBtn.classList.remove('bg-blue-500', 'text-white');

    const selected = document.getElementById(id);
    currentStatus = id;

    // adding blue for current btn
    selected.classList.remove('bg-gray-300', 'text-black');
    selected.classList.add('bg-blue-500', 'text-white');


    // filtering while clicking the filter button (All, Thriving, Struggling)
    if (id === 'btn-interview-filter') {
        allJobsSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    }
    else if (id === 'btn-all-filter') {
        allJobsSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }
    else if (id == 'btn-rejected-filter') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderRejected();
    }

}


// delegation
mainSection.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-interview')) {
        const parenNode = event.target.parentNode.parentNode;

        const jobTitle = parenNode.querySelector('.job-title').innerText
        const position = parenNode.querySelector('.position').innerText
        const facilities = parenNode.querySelector('.facilities').innerText
        // const status = parenNode.querySelector('.status').innerText Eikhan obdi updated
        const notes = parenNode.querySelector('.notes').innerText

        parenNode.querySelector('.status').innerText = 'Thrive'

        const cardInfo = {
            plantName,
            light,
            water,
            status: 'Thrive',
            notes
        }

        const plantExist = thrivingList.find(item => item.plantName == cardInfo.plantName)

        if (!plantExist) {
            thrivingList.push(cardInfo)
        }

        // step 2 finish
        // removing the plant from struggling list
        strugglingList = strugglingList.filter(item => item.plantName != cardInfo.plantName)

        // after remove rerender the html
        if (currentStatus == 'struggling-filter-btn') {
            renderStruggling()
        }

        calculateCount()


    } else if (event.target.classList.contains('struggling-btn')) {
        const parenNode = event.target.parentNode.parentNode;

        const plantName = parenNode.querySelector('.plantName').innerText
        const light = parenNode.querySelector('.light').innerText
        const water = parenNode.querySelector('.water').innerText
        const status = parenNode.querySelector('.status').innerText
        const notes = parenNode.querySelector('.notes').innerText

        parenNode.querySelector('.status').innerText = 'Struggle'

        const cardInfo = {
            plantName,
            light,
            water,
            status: 'Struggle',
            notes
        }

        const plantExist = strugglingList.find(item => item.plantName == cardInfo.plantName)

        if (!plantExist) {
            strugglingList.push(cardInfo)
        }

        // removing the plant from thriving list
        thrivingList = thrivingList.filter(item => item.plantName != cardInfo.plantName)

        // console.log(thrivingList);

        // after remove rerender the html
        if (currentStatus == "thriving-filter-btn") {
            renderThriving();
        }
        calculateCount()

    }

})