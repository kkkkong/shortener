const mongoose = require("mongoose");
const validUrl = require("valid-url");
const UrlShorten = mongoose.model("UrlShorten");
const crc32 = require("crc32");
const errorUrl='http://localhost/error';

exports.get_item_code = async (req, res) => {
    const urlCode = req.params.code;
    const item = await UrlShorten.findOne({ urlCode: urlCode });
    if (item) {
        return res.redirect(item.originalUrl);
    } else {
        return res.redirect(errorUrl);
    }
};

exports.save_url_shorten = async (req, res) => {
    console.log(req.body);
    
    const { originalUrl, customshortUrl, shortBaseUrl } = req.body;

    // validate is uri or not
    if (validUrl.isUri(shortBaseUrl)) {
    } else {
      return res
        .status(401)
        .json(
          "Invalid Base Url"
        );
    }


    // if have cusom url will keep custom if not will encode original url
    let urlCode = '';
    if (customshortUrl != '') {
      urlCode = customshortUrl;
    }else {
      urlCode = crc32(originalUrl);
    }
    
    const updatedAt = new Date();

    // validation check and save
    if (validUrl.isUri(originalUrl)) {
        try {
            let item;
            let pattern = /^[a-zA-Z0-9]*$/
            if (customshortUrl != '') {

                // validation
                if (customshortUrl.length < 8) {
                    throw "Custom Short Url should be more than 8 charactor";
                }
                if (!pattern.test(customshortUrl)) {
                    throw "Allow Only a-z A-Z 0-9";
                }

                // find custom url
                item = await UrlShorten.findOne({ urlCode: customshortUrl });
                if(item) {
                    if(item.originalUrl != originalUrl) {
                        throw "Custom Short Url is Already in Databeses";
                    } 
                }
                
            }else {
                item = await UrlShorten.findOne({ originalUrl: originalUrl });
            }

            // if found on db
            if (item) {
                res.status(200).json(item);
            } else {
                shortUrl = shortBaseUrl + "/" + urlCode;

                // set data for save
                const item = new UrlShorten({
                    originalUrl,
                    shortUrl,
                    urlCode,
                    updatedAt
                });
                await item.save();
                res.status(200).json(item);
            }
            
        } catch (err) {
            res.status(401).json(err);
        }
    } else {
        return res
            .status(401)
            .json(
                "Invalid Original Url"
            );
    }
};