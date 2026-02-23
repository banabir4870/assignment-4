let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

let totalCount = document.getElementById('total-count');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');

const allFilterBtn = document.getElementById('btn-all-filter');
const interviewFilterBtn = document.getElementById('btn-interview-filter');
const rejectedFilterBtn = document.getElementById('btn-rejected-filter');

const allJobsSection = document.getElementById('all-jobs');
const mainSection = document.querySelector('main');
const filterSection = document.getElementById('filtered-section');

function calculateCount() {
    totalCount.innerText = allJobsSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}

calculateCount();
updateAvailableJobsCount();


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


    // filtering buttons
    if (id === 'btn-interview-filter') {
        allJobsSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    }
    else if (id === 'btn-all-filter') {
        allJobsSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }
    else if (id === 'btn-rejected-filter') {
        allJobsSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderRejected();
    }
    updateAvailableJobsCount();

}


// delegation
mainSection.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-interview')) {
        const parenNode = event.target.parentNode.parentNode;

        const jobTitle = parenNode.querySelector('.job-title').innerText
        const position = parenNode.querySelector('.position').innerText
        const facilities = parenNode.querySelector('.facilities').innerText
        const status = parenNode.querySelector('.status').innerText
        const description = parenNode.querySelector('.description').innerText

        parenNode.querySelector('.status').innerText = 'Interview'

        const cardInfo = {
            jobTitle,
            position,
            facilities,
            status: 'Interview',
            description
        }

        const jobExist = interviewList.find(item => item.jobTitle == cardInfo.jobTitle)

        if (!jobExist) {
            interviewList.push(cardInfo)
        }
        rejectedList = rejectedList.filter(item => item.jobTitle != cardInfo.jobTitle)

        if (currentStatus == 'btn-rejected-filter') {
            renderRejected()
        }

        calculateCount()


    } else if (event.target.classList.contains('btn-rejected')) {
        const parenNode = event.target.parentNode.parentNode;

        const jobTitle = parenNode.querySelector('.job-title').innerText
        const position = parenNode.querySelector('.position').innerText
        const facilities = parenNode.querySelector('.facilities').innerText
        const description = parenNode.querySelector('.description').innerText

        parenNode.querySelector('.status').innerText = 'Rejected'

        const cardInfo = {
            jobTitle,
            position,
            facilities,
            status: 'Rejected',
            description
        }

        const jobExist = rejectedList.find(item => item.jobTitle == cardInfo.jobTitle)

        if (!jobExist) {
            rejectedList.push(cardInfo)
        }

        interviewList = interviewList.filter(item => item.jobTitle != cardInfo.jobTitle)
        if (currentStatus == "btn-interview-filter") {
            renderInterview();
        }
        calculateCount()

    }

    // delete job button
    if (event.target.closest('.delete-btn')) {
        const parentCard = event.target.closest('.cards');
        const jobTitle = parentCard.querySelector('.job-title').innerText;
        if (currentStatus === 'btn-all-filter' || currentStatus === 'all') {
            parentCard.remove();
        }
        interviewList = interviewList.filter(item => item.jobTitle !== jobTitle);
        rejectedList = rejectedList.filter(item => item.jobTitle !== jobTitle);
        if (currentStatus === 'btn-interview-filter') {
            renderInterview();
        } else if (currentStatus === 'btn-rejected-filter') {
            renderRejected();
        }
        calculateCount();
        updateAvailableJobsCount();
    }

})


// Render Functions
function renderInterview() {
    filterSection.innerHTML = ''
    if (interviewList.length === 0) {
        showEmptyMessage();
        return;
    }

    for (let interview of interviewList) {
        let div = document.createElement('div');
        div.className = 'border-2 border-gray-200 my-4 p-6 rounded-lg space-y-5'
        div.innerHTML = `
        <div class="flex justify-between items-center">
            <div>
                <h1 class="job-title text-xl font-bold text-blue-950">${interview.jobTitle}</h1>
                <p class="position text-sm text-neutral/70">${interview.position}</p>
            </div>
            <div>
                <button class="delete-btn border-2 rounded-full p-1 border-gray-200"><i class="fa-regular fa-trash-can"></i></button>
            </div>
        </div>
        <p class="facilities text-[12px] text-neutral/70">${interview.facilities}</p>
        <p class="status px-3 py-2 bg-[#EEF4FF] w-28 h-10 text-success">${interview.status}</p>
        <p class="description text-[12px] text-neutral">${interview.description}</p>
        <div class="flex gap-2">
            <button class="btn-interview btn btn-outline btn-success">Interview</button>
            <button class="btn-rejected btn btn-outline btn-error">Rejected</button>
        </div>
        `
        filterSection.appendChild(div)
    }
}

function renderRejected() {
    filterSection.innerHTML = ''
    if (rejectedList.length === 0) {
        showEmptyMessage();
        return;
    }
    for (let rejected of rejectedList) {

        let div = document.createElement('div');
        div.className = 'border-2 border-gray-200 my-4 p-6 rounded-lg space-y-5'
        div.innerHTML = `
        <div class="flex justify-between items-center">
            <div>
                <h1 class="job-title text-xl font-bold text-blue-950">${rejected.jobTitle}</h1>
                <p class="position text-sm text-neutral/70">${rejected.position}</p>
            </div>
            <div>
                <button class="delete-btn border-2 rounded-full p-1 border-gray-200"><i class="fa-regular fa-trash-can"></i></button>
            </div>
        </div>
        <p class="facilities text-[12px] text-neutral/70">${rejected.facilities}</p>
        <p class="status px-3 py-2 bg-[#EEF4FF] w-28 h-10 text-error">${rejected.status}</p>
        <p class="description text-[12px] text-neutral">${rejected.description}</p>
        <div class="flex gap-2">
            <button class="btn-interview btn btn-outline btn-success">Interview</button>
            <button class="btn-rejected btn btn-outline btn-error">Rejected</button>
        </div>
        `;
        filterSection.appendChild(div)
    }
}


// updating count function
function updateAvailableJobsCount() {
    const availableJobsCount = document.getElementById('available-jobs-count');
    const totalJobs = allJobsSection.children.length;

    if (currentStatus === 'btn-all-filter' || currentStatus === 'all') {
        availableJobsCount.innerText = `${totalJobs}`;
    } else if (currentStatus === 'btn-interview-filter') {
        availableJobsCount.innerText = `${interviewList.length} of ${totalJobs}`;
    } else if (currentStatus === 'btn-rejected-filter') {
        availableJobsCount.innerText = `${rejectedList.length} of ${totalJobs}`;
    }
}

// Empty Message
function showEmptyMessage() {
    const div = document.createElement('div');
    div.className = 'py-14 px-12 border-2 border-gray-200 rounded-lg text-center space-y-3 mt-4';
    div.innerHTML = `
        <div class="flex justify-center">
            <img src="jobs.png" alt="" class="mx-auto">
        </div>
        <h1 class="text-xl font-bold text-blue-950">No Jobs Available</h1>
        <p>Check Back Soon For New Job Opportunities</p>
    `;
    filterSection.appendChild(div);
}