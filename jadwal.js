var url_jadwal=base_url+"admin_jadwal/";
myApp.controller("jadwalCtrl",function($scope,$http){
	
	$scope.dataJadwal={};
	$scope.tempJadwal={};
	$scope.page=0;
	$scope.prevStatus=true;
	$scope.nextStatus=true;
	$scope.labelPage="";
	$scope.limit=10;
	$scope.aksi="";
	$scope.panelInput=false;
	$scope.dataInput={};
	$scope.checkStatus=false;
	$scope.load=function(){
		$http.get(url_jadwal+"load/"+$scope.page)
                  .success(function(response) {
                   $scope.dataJadwal=response.konten;
                   	$scope.page=response.page;
                   	$scope.limit=response.limit;
					$scope.prevStatus=response.prev;
					$scope.nextStatus=response.next;
					$scope.labelPage=response.labelPage;

					$scope.tempJadwal={};	
					$scope.dataInput={};
        });
	}
	$scope.btnPrev=function(){
		$scope.page=(parseInt($scope.page)-parseInt($scope.limit));
		$scope.load();
	}

	$scope.btnNext=function(){
		$scope.page=(parseInt($scope.page)+parseInt($scope.limit));
		$scope.load();
	}

	$scope.select=function(kondisi,item){
		if(kondisi){
			$scope.tempJadwal=angular.copy(item);
		}else{
			$scope.tempJadwal={};
			if($scope.aksi=="edit"){
				$scope.btnEdit();
			}
		}

	}
	$scope.selectAll=function(){

		if($scope.checkStatus){
			$scope.checkStatus=false;
		}else{
			$scope.checkStatus=true;
		}
		angular.forEach($scope.dataJadwal, function (item,key) {
				$scope.dataJadwal[key].check=$scope.checkStatus;
				$scope.tempJadwal=angular.copy(item);
		});
	}

	$scope.btnAdd=function(){
		if($scope.panelInput){
			$scope.aksi="";
			$scope.panelInput=false;
		}else{
			$scope.aksi="add";
			$scope.panelInput=true;
		}
		$scope.dataInput={};
	}
	$scope.btnEdit=function(){
		if($scope.panelInput){
			$scope.aksi="";
			$scope.panelInput=false;
		}else{
			if($scope.tempJadwal.check){
				$scope.aksi="edit";
				$scope.panelInput=true;
				$scope.dataInput=angular.copy($scope.tempJadwal);
			}else{
				$scope.aksi="";
				$scope.panelInput=false;
				$scope.dataInput={};
			}

		}
	}

	$scope.btnSimpan=function(){
		if($scope.aksi=="add"){
			$http.post(url_jadwal+"add",{konten:$scope.dataInput})
                  .success(function(response) {
                  	$scope.page=0;
                  	$scope.load();  
        	});
		}else if($scope.aksi=="edit"){
			$http.post(url_jadwal+"edit",{konten:$scope.dataInput})
                  .success(function(response) {
                  	$scope.load();  
        	});
		}
	}

	$scope.btnDelete=function(){
		$scope.idJadwal=[];
		$scope.deleteStatus=false;
		angular.forEach($scope.dataJadwal, function (item,key) {
				if($scope.dataJadwal[key].check){
					$scope.idJadwal.push(item.id_jadwal);
					$scope.deleteStatus=true;
				}
		});
		if($scope.deleteStatus){
			$http.post(url_jadwal+"delete",{konten:$scope.idJadwal})
                  .success(function(response) {
                    $scope.load();
              });
		}
		

	}


});