import {metricDetails, cityList} from './data.js';
import {data, weightUpdate, weightedCalc, overallScore, overallRank, dataKeys} from './rankings.js';

// TOP30 LIST
let cityRankings = () => {
  const rankSet = document.createElement('div');
  const rankItem = document.createElement('div');
  for (let j=1;j<4;j++) {
    rankSet.setAttribute('id',"rank"+j*10);
    document.getElementById('rankings').appendChild(rankSet.cloneNode(true));
    for (let i=1; i<11; i++) {
      rankItem.setAttribute('id',((j*10-10) + i));
      rankItem.innerHTML = (j*10-10) + i + '. ';
      document.getElementById("rank"+j*10).appendChild(rankItem.cloneNode(true));
    }
  }
}

let metric;
// INDIVIDUAL METRIC NODE FOR CLONING
let sectionNode = () => {
  metric = document.createElement('div');
  metric.setAttribute('class','metric');
  const top1 = document.createElement('div');
  top1.setAttribute('class','top');
  metric.appendChild(top1);
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
  checkbox.setAttribute('onchange','toggleFunction(this)');
  checkbox.setAttribute('value','1');
  checkbox.checked = true;
  switcher.appendChild(checkbox);
  const slider = document.createElement('span');
  slider.setAttribute('class','slider round');
  switcher.appendChild(slider);
  const number = document.createElement('input');
  number.setAttribute('type','number');
  number.setAttribute('value','');
  number.setAttribute('max','100');
  number.setAttribute('min','0');
  number.setAttribute('maxlength','3');
  number.setAttribute('onchange','weightFunction(this)');
  number.setAttribute('class','weight');
  number.setAttribute('required','');
  top1.appendChild(number);
  const mid = document.createElement('div');
  mid.setAttribute('class','mid');
  metric.appendChild(mid);
  const description = document.createElement('label')
  description.setAttribute('class','description');
  description.innerHTML = 'Description: []';
  mid.appendChild(description);
  const bottom = document.createElement('div');
  bottom.setAttribute('class','bottom');
  metric.appendChild(bottom);
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
  const top10List = document.createElement('ul');
  top10List.setAttribute('class','top10List');
  const popUpTitle = document.createElement('li');
  popUpTitle.innerHTML = 'Top 10';
  popUpTitle.setAttribute('class','popUpTitle');
  top10List.appendChild(popUpTitle);
  for(let i=0;i<10;i++){
    let x =document.createElement('li');
    x.setAttribute('class','top10Item'+(i+1));
    x.innerHTML = 'text';
    top10List.appendChild(x);
  };
  top10.appendChild(top10List);
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
}

// INSERT CODE FOR TOP OF PROFILE SECTION HERE

// POPULATE THE METRICS
let sectionPopulator = () => {
  let sectionList = Array.from(document.getElementById('metricContainer').children);
  for (let j=0;j<sectionList.length;j++){
    let metricItem = Array.from(document.getElementById(sectionList[j]['id']).children);
    if(sectionList[j]['id'] == 'profile'){
      for(let i=1;i<6;i++){
        metricItem[i].innerHTML = metricDetails.filter((el)=>{
          return el.id == metricItem[i]['id'];
        })[0]['metricName'] + ': ';
      }
    }
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
      let rankArray = [];
      for(let n=0; n<data.length;n++){
        let newArray2 = [];
        newArray2.push(data[n][metricItem[i]['id']][1]);
        // newArray2.push(data[n][metricItem[i]['id']][0]);
        newArray2.push(data[n].city[0]);
        newArray2.push(data[n].state[0]);
        rankArray.push(newArray2);
      };
      rankArray.sort((a,b)=>{
        return a[0] - b[0];
      });
      rankArray = rankArray.slice(0,10);
      for(let m=0;m<10; m++){
        metricItem[i].querySelector('.top10Item'+(m+1)).innerHTML = rankArray[m][0] + ". " + rankArray[m][1] + ", " + rankArray[m][2];
      };
      rankArray = [];
    };
  };
  const profileTop = document.createElement('div');
  profileTop.setAttribute('id','profileTop');
  document.getElementById('profile').insertBefore(profileTop, document.getElementById('profile').childNodes[2]);
  profileTop.appendChild(document.querySelector('#city'));
  profileTop.appendChild(document.querySelector('#state'));
  profileTop.appendChild(document.querySelector('#cityPop'));
  profileTop.appendChild(document.querySelector('#metroPop'));
  profileTop.appendChild(document.querySelector('#popDensity'));
  let dropdown = document.createElement('div');
  dropdown.setAttribute('class','dropdown');
  document.querySelector('#city').appendChild(dropdown);
  let dropdownContent = document.createElement('select');
  dropdownContent.setAttribute('id','cityDropdown');
  dropdownContent.setAttribute('onchange','dropdownChange()');// Enter dropdown function here.
  document.querySelector('.dropdown').appendChild(dropdownContent);
  let dropdownPrompt = document.createElement('option');
  dropdownPrompt.innerHTML = 'Select A City';
  dropdownContent.appendChild(dropdownPrompt);
  let dropdownItems = document.getElementById('cityDropdown');
  for(let i =0;i<cityList.length;i++){
    let cities = cityList[i];
    var el = document.createElement('option');
    el.textContent = cities;
    el.value = cities;
    dropdownItems.appendChild(el);
  }

  let switches = document.querySelectorAll('.checker');
  let weights = document.querySelectorAll('.weight');
  for (let i=0; i<switches.length; i++){
    switches[i].setAttribute('id',document.querySelectorAll('.checker')[i].parentNode.parentNode.parentNode.parentNode.id + (i+1));
    weights[i].setAttribute('id',document.querySelectorAll('.checker')[i].parentNode.parentNode.parentNode.parentNode.id + (i+1));
  }
}



// var coll = document.getElementsByClassName('expand');

// for (let i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.display === "block") {
//       content.style.display = "none";
//     } else {
//       content.style.display = "block";
//     }
//   });
// }

window.dropdownChange = function() {
  let e = document.getElementById('cityDropdown');
  let g = e.value;
  console.log(g);
}

cityRankings();
sectionNode();
sectionPopulator();

window.toggleFunction = function(e) {
  if(e.checked === true) {
    metricDetails.filter((f)=>{
      return f.section == e.parentNode.parentNode.parentNode.parentNode.parentNode.id &&
      f.id == e.parentNode.parentNode.parentNode.parentNode.id;
    })[0]['active'] = 1;
  } else {
    metricDetails.filter((f)=>{
      return f.section == e.parentNode.parentNode.parentNode.parentNode.parentNode.id &&
      f.id == e.parentNode.parentNode.parentNode.parentNode.id;
    })[0]['active'] = 0;
  };
  overallScore();
  overallRank();
  topRanks();
};

window.weightFunction = function(e) {
  metricDetails.filter((f)=>{
    return f.section == e.parentNode.parentNode.parentNode.parentNode.id &&
    f.id == e.parentNode.parentNode.parentNode.id;
  })[0]['weight'] = parseInt(e.value,10);
  weightUpdate(e);
};

let topRanks = () => {
  let rankFill = [];
  let finalRank = [];
  for(let i=0;i<data.length;i++){
    rankFill.push(data[i][dataKeys[0]][0]);
    rankFill.push(data[i][dataKeys[1]][0]);
    rankFill.push(data[i][dataKeys[0]][2]);
    finalRank.push(rankFill);
    rankFill = [];
  }
  finalRank.sort((a,b)=>{
    if ( a[2] == b[2]) return 0;
    return a[2] < b[2] ? -1 : 1;
  });
  for(let i=0;i<30;i++){
    document.getElementById(i+1).innerHTML = (i+1) + ". " + finalRank[i][0] + ", " + finalRank[i][1];
  }
}
topRanks();

export {metricDetails} from './data.js';
export {topRanks};