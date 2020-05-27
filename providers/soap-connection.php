<?php 
    include('nusoap/lib/nusoap.php');
    $soapClient = new nusoap_client('http://3.15.219.220:8080/aerolinea.wsdl','wsdl'); 
    $data = json_decode(file_get_contents('php://input'), true);
    

    switch ($data['metodo']){
        case 0:
            getVuelos(json_decode($data['json']));
        break;
        case 1:
            getAsientos($data['id']);
        break;
    }


    function getVuelos($data){
        global $soapClient;
        $parametros = array('origin' => $data->{'origin'} ,'destination' => $data->{'destino'}, 'date' => getFechaSql($data->{'fecha'}));
        $response = $soapClient->call("Vuelos", array($parametros));
        if (!isset($response['alert'])){
            $dataResponse = array('message'=>'correct', 'data'=>$response['vuelo']);
        }else{
            $dataResponse = array('message'=>'fail', 'data'=>$response['alert']);
        }
		header('Content-type: application/json; charset=utf-8');
		echo json_encode($dataResponse);
    }

    function getAsientos($id){
        global $soapClient;
        $parametros = array('idVuelo' => $id);;
        $response = $soapClient->call("Asientos", array($parametros));
        if (!isset($response['alert'])){
            $dataResponse = array('message'=>'correct', 'data'=>$response['asiento']);
        }else{
            $dataResponse = array('message'=>'fail', 'data'=>$response['alert']);
        }
		header('Content-type: application/json; charset=utf-8');
		echo json_encode($dataResponse);

    }


    function getFechaSql($fecha){
        $date = str_replace('/', '-', $fecha);
        $fecha = date('Y-m-d', strtotime($date));
        return $fecha;
    }
?>