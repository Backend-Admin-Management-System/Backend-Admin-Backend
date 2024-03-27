const coursecategoryservice = require("../service/coursecategoryservice");

const addCourseCategoryAsync = async (req, res) => {
    let queryResult = await coursecategoryservice.getCourseCategorybyNameAsync(req.body.categoryname);
    if (queryResult.isSuccess && queryResult.data.categoryid > 0 ) {
        res.sendCommonValue({}, "course category already exists", 400, 400);
        return;
    }

    let newCategory= {};
    newCategory.categoryname = req.body.categoryname;
    newCategory.categorylevel = req.body.categorylevel;
    newCategory.categoryparentid = req.body.categoryparentid;

    let result = await coursecategoryservice.addCourseCategoryAsync(newCategory);
    return result.isSuccess ? res.sendCommonValue(newCategory, "success", 1):
        res.sendCommonValue({},"failed",0);
};

const getCourseCategoryByNameAysnc= async (req, res) => {
    let dbResult = await coursecategoryservice.getCourseCategorybyNameAsync(req.query.categoryname);
    res.sendCommonValue(dbResult, "successful", "1");
};

const getCourseCategoryByIdAsync = async (req, res) => {
    let id = parseInt(req.query.id);
    let result = await coursecategoryservice.getCourseCategoryByIDAsync(id);
    return result.isSuccess ? res.sendCommonValue(result.data, "successful", "1"):
        res.sendCommonValue([], "failed", "0");
};

module.exports = {
    addCourseCategoryAsync,
    getCourseCategoryByNameAysnc,
    getCourseCategoryByIdAsync
}