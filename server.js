// expressモジュールを読み込む
const express = require('express');

// expressアプリを生成する
const app = express();

// ルート（http://localhost/）にアクセスしてきたときに「Hello」を返す
//app.get('/', (req, res) => res.send('Hello'));


// http://localhost:3000/api/v1/list にアクセスしてきたときに
// TODOリストを返す
app.get('/api/K61_0', (req, res) => {
//app.get('/', (req, res) => {
    // クライアントに送るJSONデータ
//    const todoList = [
//        { title: 'JavaScriptを勉強する', done: true },
//        { title: 'Node.jsを勉強する', done: false },
//        { title: 'Web APIを作る', done: false }
//    ];
    // URLパラメータ取得
    var param_company_cd = req.query.company_cd;
    var param_employee   = req.query.employee;
    var param_date       = req.query.date;
    var param_session_id = req.query.session_id;
    var param_timestamp  = req.query.timestamp;

    if (param_company_cd == undefined || 
        param_employee   == undefined ||
        param_date       == undefined ||
        param_session_id == undefined ||
        param_timestamp  == undefined)
    {
        // URLパラメータエラー
        // JSONを送信する
        res.json(error_401);
        return;
    }
    else if (param_date.length != 8)
    {
        // URLパラメータエラー
        // JSONを送信する
        res.json(error_401);
        return;
    }
    else if (param_timestamp.length != 14)
    {
        // URLパラメータエラー
        // JSONを送信する
        res.json(error_401);
        return;
    }
    else if (param_company_cd != "11111")
    {
        // 認証エラー
        // JSONを送信する
        res.json(error_402);
        return;
    }
    else if (param_date == "20200101")
    {
        // status ok 0件
        // JSONを送信する
        res.json(ok_0);
        return;
    }
    else
    {
        var num_param_timestamp = parseInt(param_timestamp.substr(0,4)) + 
                                  parseInt(param_timestamp.substr(4,2)) + 
                                  parseInt(param_timestamp.substr(6,2)) + 
                                  parseInt(param_timestamp.substr(8,2)) + 
                                  parseInt(param_timestamp.substr(10,2)) + 
                                  parseInt(param_timestamp.substr(12,2));
        var date = new Date();
        var ts_yyyy = date.getFullYear();
        var ts_MM = date.getMonth() + 1;
        var num_now_timestamp = date.getFullYear() +
                                date.getMonth() + 1 +
                                date.getDate() +
                                date.getHours() +
                                date.getMinutes() +
                                date.getSeconds();
        // Date()の秒が  10秒くらい遅れているので加算
        num_now_timestamp = num_now_timestamp + 10;
      
        var is_error_timestamp = false;
        //console.log("num_param_timestamp:"+num_param_timestamp);
        //console.log("num_now_timestamp:"+num_now_timestamp);
        if (num_param_timestamp > num_now_timestamp)
        {
            is_error_timestamp = true;
        }
        else if (num_param_timestamp < (num_now_timestamp - 60))
        {
            is_error_timestamp = true;
        }
        
        if (is_error_timestamp == true)
        {
            // URLパラメータエラー
            // JSONを送信する
            res.json(error_401);
            return;
        }
      
        var param_date_yMd = param_date.substr(0,4) + param_date.substr(4,2) + param_date.substr(6,2);
        var param_ts_yMd = param_timestamp.substr(0,4) + param_timestamp.substr(4,2) + param_timestamp.substr(6,2);
      
        var param_date_yyyy = param_date.substr(0,4);
        //console.log(yyyy);
        var param_date_MM = param_date.substr(4,2);
        //console.log(MM);
        var param_date_dd = param_date.substr(6,2);
        //console.log(dd);

        // 今日の情報を要求された時
        if (param_date_yMd == param_ts_yMd)
        {
            const assessment_schedule_now = 
                {
                    "status": 200,
                    "assessment_schedule_total": 3,
                    "assessment_schedule_data": [
                        {
                            "assessment_schedule_no": 1,
                            "business_discussion_id": 20255571,
                            "startdate": param_date_yyyy + "%2F" + param_date_MM + "%2F" + param_date_dd + "+07%3A00%3A00",
                            "enddate": param_date_yyyy + "%2F" + param_date_MM + "%2F" + param_date_dd + "+09%3A30%3A00",
                            "customer_name": "%E7%B9%94%E7%94%B0+%E4%BF%A1%E9%95%B7",
                            "tel": "09011111111",
                            "zip_code": "111-1111",
                            "address": "%E6%9D%B1%E4%BA%AC%E9%83%BD%E5%A2%A8%E7%94%B0%E5%8C%BA%E6%8A%BC%E4%B8%8A1-1-2",
                            "model_year": "H30",
                            "car_name": "%EF%BC%91%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA",
                            "model": "DBA-1A16",
                            "grade": "%EF%BC%91%EF%BC%91%EF%BC%96%EF%BD%89+%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AB",
                            "total_distance": 26565,
                            "confirm_note": "%E9%A7%90%E8%BB%8A%E5%A0%B4%E9%81%A0%E3%81%84",
                            "contact_information": "%EF%BC%A2%EF%BC%91%E6%9F%BB",
                            "business_discussion_result": ""
                        },
                        {
                            "assessment_schedule_no": 2,
                            "business_discussion_id": 20255639,
                            "startdate": param_date_yyyy + "%2F" + param_date_MM + "%2F" + param_date_dd + "+11%3A30%3A00",
                            "enddate": param_date_yyyy + "%2F" + param_date_MM + "%2F" + param_date_dd + "+15%3A30%3A00",
                            "customer_name": "%E8%B1%8A%E8%87%A3+%E7%A7%80%E5%90%89",
                            "tel": "09022222222",
                            "zip_code": "222-2222",
                            "address": "%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%96%B0%E5%AE%BF%E5%8C%BA%E5%86%85%E8%97%A4%E7%94%BA%EF%BC%91%EF%BC%91",
                            "model_year": "R02",
                            "car_name": "%E3%83%91%E3%83%AC%E3%83%83%E3%83%88",
                            "model": "CBA-MK21S",
                            "grade": "%EF%BC%B4",
                            "total_distance": 753,
                            "confirm_note": "",
                            "contact_information": "A1",
                            "business_discussion_result": ""
                        },
                        {
                            "assessment_schedule_no": 3,
                            "business_discussion_id": 20255752,
                            "startdate": param_date_yyyy + "%2F" + param_date_MM + "%2F" + param_date_dd + "+17%3A00%3A00",
                            "enddate": param_date_yyyy + "%2F" + param_date_MM + "%2F" + param_date_dd + "+20%3A30%3A00",
                            "customer_name": "%E5%BE%B3%E5%B7%9D+%E5%AE%B6%E5%BA%B7",
                            "tel": "09033333333",
                            "zip_code": "333-3333",
                            "address": "%E6%9D%B1%E4%BA%AC%E9%83%BD%E5%A2%A8%E7%94%B0%E5%8C%BA%E6%A8%AA%E7%B6%B2%EF%BC%91%E4%B8%81%E7%9B%AE%EF%BC%94%E2%88%92%EF%BC%91",
                            "model_year": "S53",
                            "car_name": "%E3%82%B8%E3%83%BC%E3%83%97%E3%83%BB%E3%83%A9%E3%83%B3%E3%82%B0%E3%83%A9%E3%83%BC%E3%82%A2%E3%83%B3%E3%83%AA%E3%83%9F%E3%83%86%E3%83%83%E3%83%89",
                            "model": "ABA-JK36L",
                            "grade": "%E3%83%AB%E3%83%93%E3%82%B3%E3%83%B3+%E3%83%8F%E3%83%BC%E3%83%89%E3%83%AD%E3%83%83%E3%82%AF",
                            "total_distance": 102537,
                            "confirm_note": "%E5%9C%B0%E4%B8%8B2%EF%BC%A6",
                            "contact_information": "",
                            "business_discussion_result": ""
                        }
                    ]
                }
            ;
            // JSONを送信する
            res.json(assessment_schedule_now);
            return;
        }
      
        // status ok 2件
        const assessment_schedule = 
            {
                "status": 200,
                "assessment_schedule_total": 2,
                "assessment_schedule_data": [
                    {
                        "assessment_schedule_no": 1,
                        "business_discussion_id": 20255267,
                        "startdate": param_date_yyyy + "%2F" + param_date_MM + "%2F" + param_date_dd + "+09%3A00%3A00",
                        "enddate": param_date_yyyy + "%2F" + param_date_MM + "%2F" + param_date_dd + "+12%3A00%3A00",
                        "customer_name": "%E5%B1%B1%E7%94%B0+%E5%A4%AA%E9%83%8E",
                        "tel": "11111111111",
                        "zip_code": "111-1111",
                        "address": "%E6%9D%B1%E4%BA%AC%E9%83%BD%E5%8D%83%E4%BB%A3%E7%94%B0%E5%8C%BA%E7%B4%80%E5%B0%BE%E4%BA%95%E7%94%BA4%E7%95%AA1%E5%8F%B7%E6%96%B0%E7%B4%80%E5%B0%BE%E4%BA%95%E7%94%BA%E3%83%93%E3%83%AB2F",
                        "model_year": "H23",
                        "car_name": "%E3%83%97%E3%83%AA%E3%82%A6%E3%82%B9",
                        "model": "DBA-QNC20",
                        "grade": "%EF%BC%B3%E3%80%80%E3%82%AC%E3%83%BC%E3%83%8D%E3%83%83%E3%83%88%E3%82%A8%E3%83%87%E3%82%A3%E3%82%B7%E3%83%A7%E3%83%B3",
                        "total_distance": 38888,
                        "confirm_note": "%E7%95%AA%E7%8A%AC%E6%B3%A8%E6%84%8F",
                        "contact_information": "%EF%BC%A1%E8%B2%A9%E5%A3%B2",
                        "business_discussion_result": "%E6%88%90%E7%B4%84"
                    },
                    {
                        "assessment_schedule_no": 2,
                        "business_discussion_id": 20255380,
                        "startdate": param_date_yyyy + "%2F" + param_date_MM + "%2F" + param_date_dd + "+13%3A30%3A00",
                        "enddate": param_date_yyyy + "%2F" + param_date_MM + "%2F" + param_date_dd + "+16%3A00%3A00",
                        "customer_name": "%E9%88%B4%E6%9C%A8+%E8%8A%B1%E5%AD%90",
                        "tel": "22222222222",
                        "zip_code": "222-2222",
                        "address": "%E6%9D%B1%E4%BA%AC%E9%83%BD%E5%8F%B0%E6%9D%B1%E5%8C%BA%E6%B5%85%E8%8D%89%EF%BC%92%E4%B8%81%E7%9B%AE%EF%BC%93-%EF%BC%91",
                        "model_year": "R01",
                        "car_name": "%E3%82%A2%E3%83%AB%E3%83%95%E3%82%A1%E3%83%BC%E3%83%89",
                        "model": "CQ1",
                        "grade": "%E4%B8%8D%E6%98%8E",
                        "total_distance": 813,
                        "confirm_note": "",
                        "contact_information": "%E3%83%89%E3%82%A2%E3%83%9F%E3%83%A9%E3%83%BC%E9%9B%BB%E5%8B%95%E8%AA%BF%E7%AF%80%EF%BC%AE%EF%BC%A7",
                        "business_discussion_result": "%E4%BF%9D%E7%95%99"
                    }
                ]
            }
        ;

        // JSONを送信する
        res.json(assessment_schedule);
    }
});

// ポート3000でサーバを立てる
app.listen(3000, () => console.log('Listening on port 3000'));


const error_401 = 
    {
        "status": 401,
        "assessment_schedule_total": 0,
        "assessment_schedule_data": [
            {
                "assessment_schedule_no": null,
                "business_discussion_id": null,
                "startdate": null,
                "enddate": null,
                "customer_name": null,
                "tel": null,
                "zip_code": null,
                "address": null,
                "model_year": null,
                "car_name": null,
                "model": null,
                "grade": null,
                "total_distance": null,
                "confirm_note": null,
                "contact_information": null,
                "business_discussion_result": null
            }
        ]
    }
;
const error_402 = 
    {
        "status": 402,
        "assessment_schedule_total": 0,
        "assessment_schedule_data": [
            {
                "assessment_schedule_no": null,
                "business_discussion_id": null,
                "startdate": null,
                "enddate": null,
                "customer_name": null,
                "tel": null,
                "zip_code": null,
                "address": null,
                "model_year": null,
                "car_name": null,
                "model": null,
                "grade": null,
                "total_distance": null,
                "confirm_note": null,
                "contact_information": null,
                "business_discussion_result": null
            }
        ]
    }
;
const error_500 = 
    {
        "status": 500,
        "assessment_schedule_total": 0,
        "assessment_schedule_data": [
            {
                "assessment_schedule_no": null,
                "business_discussion_id": null,
                "startdate": null,
                "enddate": null,
                "customer_name": null,
                "tel": null,
                "zip_code": null,
                "address": null,
                "model_year": null,
                "car_name": null,
                "model": null,
                "grade": null,
                "total_distance": null,
                "confirm_note": null,
                "contact_information": null,
                "business_discussion_result": null
            }
        ]
    }
;
const ok_0 = 
    {
        "status": 200,
        "assessment_schedule_total": 0,
        "assessment_schedule_data": [
            {
                "assessment_schedule_no": null,
                "business_discussion_id": null,
                "startdate": null,
                "enddate": null,
                "customer_name": null,
                "tel": null,
                "zip_code": null,
                "address": null,
                "model_year": null,
                "car_name": null,
                "model": null,
                "grade": null,
                "total_distance": null,
                "confirm_note": null,
                "contact_information": null,
                "business_discussion_result": null
            }
        ]
    }
;
