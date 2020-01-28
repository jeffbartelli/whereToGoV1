import {metricDetails} from './data.js';

// TOP30 LIST
let cityRankings = () => {
  const rankSet = document.createElement('div');
  const rankItem = document.createElement('div');
  for (let j=1;j<4;j++) {
    rankSet.setAttribute('id',"rank"+j*10);
    document.getElementById('rankings').appendChild(rankSet.cloneNode(true));
    for (let i=1; i<11; i++) {
      rankItem.setAttribute('id',(j*10-10) + i);
      rankItem.innerHTML = (j*10-10) + i + '. ';
      document.getElementById("rank"+j*10).appendChild(rankItem.cloneNode(true));
    }
  }
}
cityRankings();

// INDIVIDUAL METRIC NODE FOR CLONING
let metric = document.createElement('div');
metric.setAttribute('class','metric');
let metricForm = document.createElement('form');
metricForm.setAttribute('action','');
metricForm.setAttribute('class','metricForm');
metric.appendChild(metricForm);
const top1 = document.createElement('div');
top1.setAttribute('class','top');
metricForm.appendChild(top1);
const expand = document.createElement('span');
expand.setAttribute('class','expand');
expand.innerHTML = '+';
top1.appendChild(expand);
const name = document.createElement('label');
name.setAttribute('class','name');
name.innerHTML = '[Metric Name]';
top1.appendChild(name);
const switcher = document.createElement('label');
switcher.setAttribute('class','switch');
top1.appendChild(switcher);
const checkbox = document.createElement('input');
checkbox.setAttribute('type','checkbox');
checkbox.setAttribute('class','checker');
checkbox.setAttribute('onchange','#');// update this to point to a function that adjusts this value in dataSources.
checkbox.setAttribute('value','1');
checkbox.checked = true;
switcher.appendChild(checkbox);
const slider = document.createElement('span');
slider.setAttribute('class','slider round');
switcher.appendChild(slider);
const number = document.createElement('input');
number.setAttribute('type','number');
number.setAttribute('value','0');
number.setAttribute('max','100');
number.setAttribute('min','0');
number.setAttribute('maxlength','3');
number.setAttribute('onchange','');//update this to point to the appropriate function
number.setAttribute('class','weight');
number.setAttribute('required','');
top1.appendChild(number);
const mid = document.createElement('div');
mid.setAttribute('class','mid');
metricForm.appendChild(mid);
const description = document.createElement('label')
description.setAttribute('class','description');
description.innerHTML = 'Description: []';
mid.appendChild(description);
const bottom = document.createElement('div');
bottom.setAttribute('class','bottom');
metricForm.appendChild(bottom);
const source = document.createElement('label');
source.setAttribute('class','source');
bottom.appendChild(source);
let sourceLink = document.createElement('a');
sourceLink.setAttribute('href','#');
sourceLink.setAttribute('target','_blank');
sourceLink.innerHTML = 'Source';
source.appendChild(sourceLink);
const top10 = document.createElement('span');
top10.setAttribute('class','top10');
top10.innerHTML = '?';
bottom.appendChild(top10);
const rank = document.createElement('label');
rank.setAttribute('class','rank');
rank.innerHTML = 'Rank: '
bottom.appendChild(rank);
const rankVal = document.createElement('span');
rankVal.innerHTML = '[]';
rank.appendChild(rankVal);
const score = document.createElement('label');
score.setAttribute('class','score');
score.innerHTML = '[score]';
bottom.appendChild(score);
const scoreLabel = document.createElement('div');
scoreLabel.setAttribute('class','scoreLabel');
bottom.appendChild(scoreLabel);

// INSERT CODE FOR TOP OF PROFILE SECTION HERE

// POPULATE THE METRICS
let sectionPopulator = () => {
  let sectionList = Array.from(document.getElementById('metricContainer').children);
  for (let j=0;j<sectionList.length;j++){
    let metricItem = Array.from(document.getElementById(sectionList[j]['id']).children);
    let i;
    sectionList[j]['id'] == 'profile' ? i=6 : i=1;
    for (i; i<metricItem.length; i++) {
      metricItem[i].appendChild(metric.cloneNode(true));
      let newArray = metricDetails.filter((el)=>{
        return el.section == sectionList[j]['id'] &&
        el.id == metricItem[i]['id'];
      });
      metricItem[i].querySelector('.name').innerHTML = newArray[0]['metricName'];
      metricItem[i].querySelector('.weight').value = newArray[0]['weight'];
      metricItem[i].querySelector('.checker').value = newArray[0]['active'];
      metricItem[i].querySelector('.description').innerHTML = newArray[0]['description'];
      metricItem[i].querySelector('.source > a').setAttribute('href',newArray[0]['source']);
      metricItem[i].querySelector('.scoreLabel').innerHTML = newArray[0]['scoreLabel'];
      metricItem[i].querySelector('.top10').setAttribute('title',newArray[0]['metricName'] + " Top 10");
    };
  };
}
sectionPopulator();