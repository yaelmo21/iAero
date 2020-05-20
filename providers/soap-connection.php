<?php 
    $soapClient = new SoapClient("http://3.15.219.220:8080/aerolinea.wsdl"); 
    $data = json_decode(file_get_contents('php://input'), true);
    

    switch ($data['metodo']){
        case 0:
            getVuelos(json_decode($data['json']));
        break;
    }


    function getVuelos($data){
        global $soapClient;
        $param = json_decode($data);
        $param->{'fecha'} = getFechaSql($param->{'fecha'});
        $parametros = array('origin' => $param->{'origin'},'destination' => $param->{'destino'}, 'date' => $param->{'fecha'});

        $response = $soapClient->__soapCall("Vuelos", array($parametros));
        if (!isset($response->{'alert'})){
            $dataResponse = array('message'=>'correct', 'data'=>$response->{'vuelo'});
        }else{
            $dataResponse = array('message'=>'fail', 'data'=>$response->{'alert'});
        }
        
		header('Content-type: application/json; charset=utf-8');
		echo json_encode($dataResponse);
    }


    function getFechaSql($fecha){
        $date = new DateTime($fecha);
        return $date->format('Y-m-d');
    }
?>