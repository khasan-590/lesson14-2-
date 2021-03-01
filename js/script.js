"use strict";

function isNumbers(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
function isString(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}


let start = document.getElementById('start'),
		cancel = document.getElementById('cancel'),
		btnPlus = document.getElementsByTagName('button'),
		incomePlus = btnPlus[0],
		expensesPlus = btnPlus[1],
		getCheckBox = document.querySelector('#deposit-check'),
		additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
		budgetMonthValue = document.querySelector('.result-budget_month input'),
		budgetDayValue = document.querySelector('.result-budget_day input'),
		expensesMonthValue = document.querySelector('.result-expenses_month input'),
		additionalIncomevalue = document.querySelector('.result-additional_income input'),
		additionalExpensesvalue = document.querySelector('.result-additional_expenses input'),
		additionalExpensesItem = document.querySelector('.additional_expenses-item'),
		incomePeriodValue = document.querySelector('.result-income_period input'),
		targetMonthValue = document.querySelector('.result-target_month input'),
		salaryAmount = document.querySelector('.salary-amount'),
		getExpenseName = document.getElementsByClassName('expenses-title'),
		expensesItems = document.querySelectorAll('.expenses-items'),
		getTargetAmount = document.querySelector('.target-amount'),
		getSum = document.querySelector('.deposit-amount'),
		additionalExpenses = document.querySelector('.additional_expenses'),
		getProcent = document.querySelector('.deposit-percent'),
		incomeItems = document.querySelectorAll('.income-items'),
		periodSelect = document.querySelector('.period-select'),
		periodAmount = document.querySelector('.period-amount');
		

		let Appdata = function (){
			this.income = {};
			this.addIncome = [];
			this.expenses = {};
			this.deposit = false;
			this.incomeMonth = 0;
			this.precentDeposit = 0;
			this.moneyDeposit = 0;
			this.addExpenses = [];
			this.budget = 0;
			this.budgetDay = 0;
			this.budgetMonth = 0;
			this.expensesMonth = 0;
		};
		Appdata.prototype.check = function (){
			if (salaryAmount.value !== ''){
				start.removeAttribute('disabled');
			}
		};

		Appdata.prototype.start = function() {
			const _this = this;
			if (salaryAmount.value === ''){
				start.setAttribute('disabled' , 'true');
				return;
			}
			let allInput = document.querySelectorAll('.data input[type = text]');
			allInput.forEach(function (item) { 
				item.setAttribute('disabled' , 'true');
			 });

			 incomePlus.setAttribute('disabled', 'true');
			 expensesPlus.setAttribute('disabled', 'true');
			 start.style.display ='none';
			 cancel.style.display = 'block';

				
			this.budget = +salaryAmount.value;
			
			this.getIncome();
			this.getExpenses();
			this.getExpensesMonth();
			this.getAddExpenses();
			this.getAddIncome();
			this.getBudget();
			this.calcPeriod();
			
			this.showResult();
			
		};

		Appdata.prototype.showResult = function() {
			const _this = this;
			budgetMonthValue.value = this.budgetMonth;
			budgetDayValue.value = this.budgetDay;
			expensesMonthValue.value = this.expensesMonth;
			additionalExpensesvalue.value = this.addExpenses.join(', ');
			additionalIncomevalue.value = this.addIncome.join(', ');
			targetMonthValue.value = this.getTargetMonth();
			incomePeriodValue.value = this.calcPeriod();
			// 
			periodSelect.addEventListener('input', function () {
				incomePeriodValue.value = _this.calcPeriod();
			});
		};
		Appdata.prototype.addExpensesBlock = function(){
			let cloneExpensesItem = expensesItems[0].cloneNode(true);
			cloneExpensesItem.querySelector('.expenses-title').value = '';
			cloneExpensesItem.querySelector('.expenses-amount').value = '';
			expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
			expensesItems = document.querySelectorAll('.expenses-items');
			if(expensesItems.length === 3) {
				expensesPlus.style.display = 'none';
			}
		};
		Appdata.prototype.getExpenses = function(){
			const _this = this;
			expensesItems.forEach(function(item){
				let itemExpenses = item.querySelector('.expenses-title').value;
				let cashExpenses = item.querySelector('.expenses-amount').value;
				if(itemExpenses !== '' && cashExpenses !== '') {
					_this.expenses[itemExpenses] = +cashExpenses;
				}
			});
			
		};
		Appdata.prototype.addIncomeBlock = function () {
			let cloneIncomeItem = incomeItems[0].cloneNode(true);
			incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
			incomeItems = document.querySelectorAll('.income-items');
			if(incomeItems.length === 3) {
				incomePlus.style.display = 'none';
			}
			// 
		};
		Appdata.prototype.getIncome = function(){
			const _this = this;
				incomeItems.forEach(function(item){
				let itemIncome = item.querySelector('.income-title').value;
				let cashIncome = item.querySelector('.income-amount').value;
				if(itemIncome !== '' && cashIncome !== '') {
					_this.income[itemIncome] = cashIncome;
				}
			});
			// 
			for (let key in _this.income) {
				_this.incomeMonth += +_this.income[key];
			}
			// 
		};
		Appdata.prototype.getAddExpenses = function(){
			let addExpenses = additionalExpensesItem.value.split(", ");
			const _this = this;
			addExpenses.forEach(function(item){
				item = item.trim();
				if (item !== '' ){
					_this.addExpenses.push(item);
				}
			});
		};

		Appdata.prototype.getAddIncome = function(){
			const _this = this;
			 additionalIncomeItem.forEach(function(item) {
				let itemValue = item.value.trim();
				if (itemValue !== '' ) {
					_this.addIncome.push(itemValue);
				}
			});
		};
		Appdata.prototype.reset = function (){
			let inputText = document.querySelectorAll('.data input[type=text]');
			let resultInputAll = document.querySelectorAll('.result input[type=text]');

			inputText.forEach(function(elem){
				elem.value = '';
				elem.removeAttribute('disabled');
				periodSelect.value = '0' ;
				periodAmount.innerHTML = periodSelect.value;
			});
			resultInputAll.forEach(function(elem){
				elem.value = '';
			});

			for (let i = 1; i < incomeItems.length; i++){
				incomeItems[i].parentNode.removeChild(incomeItems[i]);
				incomePlus.style.display = 'block';
			}
			for (let i = 1; i < expensesItems.length; i++){
				expensesItems[i].parentNode.removeChild(expensesItems[i]);
				expensesPlus.style.display = 'block';
			}
			
			this.budget = 0;
			this.budgetDay = 0;
			this.budgetMonth = 0;
			this.income = {};
			this.incomeMonth = 0;
			this.addIncome = [];
			this.expenses = {};
			this.expensesMonth = 0;
			this.precentDeposit = 0;
			this.moneyDeposit = 0;
			this.addExpenses = [];
			

			cancel.style.display = 'none';
			start.style.display = 'block';
			incomePlus.removeAttribute('disabled');
			expensesPlus.removeAttribute('disabled');
			getCheckBox.checked = false;
		};
		Appdata.prototype.getExpensesMonth = function (){
			for ( let key in this.expenses) {
				this.expensesMonth += this.expenses[key];
			}
		};
		Appdata.prototype.getBudget = function () {
			this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
			this.budgetDay = Math.floor(this.budgetMonth / 30);
			return;
		};

		Appdata.prototype.getTargetMonth = function (){
			return Math.ceil(getTargetAmount.value / this.budgetMonth);
		};
	
		 Appdata.prototype.getStatusIncome =  function () {
			if (this.budgetDay >= 1200) {
				return("У вас высокий уровень дохода");
			} else if (this.budgetDay > 600 && this.budgetDay < 1200) {
				return('У вас средний уровень дохода');
			} else if (this.budgetDay <=600 && this.budgetDay  > 0) {
				return('К сожалению у вас уровень дохода ниже среднего');
			} else if (this.budgetDay < 0) {
				return('Что то пошло не так');
			}
		};
		// Appdata.prototype.getInfoDeposit = function () {
		// 	if(this.deposit){
		// 		do{
		// 			this.precentDeposit = +prompt('Какой годовой процент?' , "10");
		// 			 } while (!isNumbers(this.precentDeposit));//пока пользователь не введёт число
		// 			 do{
		// 				appData.moneyDeposit = +prompt('Какая сумма заложена?' , 10000);
		// 				 } while (!isNumbers(this.moneyDeposit));//пока пользователь не введёт число
		// 	}
		// };
		Appdata.prototype.calcPeriod = function () {
			return  this.budgetMonth * periodSelect.value;
		};
		Appdata.prototype.eventListeners = function (){
			const _this = this;
			start.addEventListener('click',  _this.start.bind( _this));
			expensesPlus.addEventListener('click' ,  _this.addExpensesBlock);
			incomePlus.addEventListener('click' ,  _this.addIncomeBlock);
			salaryAmount.addEventListener('keyup',  _this.check);
			cancel.addEventListener('click' ,  _this.reset);
			periodSelect.addEventListener('input', function () {
				periodAmount.innerHTML = periodSelect.value;
			});
			
		};
		
		const appdata = new Appdata();
		console.log(appdata);
		appdata.eventListeners();
		
			// start.addEventListener('click', appData.start.bind(appData));
			// expensesPlus.addEventListener('click' , appData.addExpensesBlock);
			// incomePlus.addEventListener('click' , appData.addIncomeBlock);
			// salaryAmount.addEventListener('keyup', appData.check);
			// cancel.addEventListener('click' , appData.reset.bind(appData));
			
			
			
	// 				});
			// appData.getInfoDeposit();
			// appData.calcPeriod();
						
			// for (let keys in appData) {
			// 	console.log("Наша программа    включает в себя данные." + keys + " = " + appData[keys] + []);
			// }
			
