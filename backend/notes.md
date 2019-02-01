- Postgrest Dev Instance
- Data Tracker Dev instance
- jupyter
- requirements.txt
    - knackpy
    - pypgrest
    - requests

# PostgREST Setup

Endpoint: http://18.213.113.105/

```sql
CREATE TABLE IF NOT EXISTS api.signal_requests (
    id SERIAL PRIMARY KEY,
    atd_eval_id TEXT NOT NULL,
    cross_st TEXT,
    cross_st_block TEXT,
    eval_rank TEXT,
    eval_score TEXT,
    eval_status TEXT,
    eval_type TEXT,
    funding_status TEXT,
    location_latitude DECIMAL,
    location_longitude DECIMAL,
    location_name TEXT,
    primary_st TEXT,
    primary_st_block TEXT,
    rank_round_mo TEXT,
    rank_round_yr TEXT,
    request_id TEXT,
    request_status TEXT
);

GRANT SELECT, UPDATE, INSERT, DELETE ON api.signal_requests TO super_user;
GRANT SELECT ON api.signal_requests TO web_anon;
```


```bash
$ conda create --name schoolofdata python=3
$ pip install --upgrade pip
$ pip install jupyter
```


        App A // App B // App C

    Knack Platform


            Scripts
        Docker
    Local Scripting Server 
Destination thigns on the internet




```python


# let's see what we've got
print(type(kn.data))
print(len(kn.data))

```








