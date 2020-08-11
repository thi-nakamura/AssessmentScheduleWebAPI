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
    var param_employee = req.query.employee;
    var param_date = req.query.date;
    var param_session_id = req.query.session_id;
    var param_timestamp  = req.query.timestamp;

    if (param_company_cd == undefined || 
        param_employee == undefined ||
        param_date == undefined ||
        param_session_id == undefined ||
        param_timestamp == undefined)
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
        
        var is_error_timestamp = false;
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
      
        var param_date_yyyy = param_date.substr(0,4);
        //console.log(yyyy);
        var param_date_MM = param_date.substr(4,2);
        //console.log(MM);
        var param_date_dd = param_date.substr(6,2);
        //console.log(dd);

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
                        "tel": 11111111111,
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
                        "tel": 22222222222,
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
