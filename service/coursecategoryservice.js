const courseCategoryModel = require("../model/coursecategory");

var getCourseCategorybyNameAsync = async (name) => {
    let queryCategory = await courseCategoryModel.findAll({where:{categoryname: name}});
    let category = {};

    if (queryCategory != null && queryCategory.length > 0) {
        let result = queryCategory[0];
        category.categoryid = result.categoryid;
        category.categoryname = result.categoryname;
        category.categorylevel = result.categorylevel;
        category.categoryparentid = result.categoryparentid;
    }
    return {isSuccess: true, message:"", data: category};
};

var addCourseCategoryAsync = async (coursecat) => {
    await courseCategoryModel.create({
        categoryname: coursecat.categoryname,
        categorylevel: coursecat.categorylevel,
        categoryparentid: coursecat.categoryparentid,
    });

    return {isSuccess: true, message:""};
}

var getCourseCategoryByIDAsync = async (id) => {
    let dbResult = await  courseCategoryModel.findAll({where: {categoryid: id }});
    let category = {};
    if (dbResult != null && dbResult.length > 0) {
        category.categoryid = dbResult[0].categoryid;
        category.categoryname = dbResult[0].categoryname;
        category.categorylevel = dbResult[0].categorylevel;
        category.categoryparentid = dbResult[0].categoryparentid;
    }
    return {isSuccess: true, message: "", data: category};
};

module.exports = {
    getCourseCategorybyNameAsync,
    addCourseCategoryAsync,
    getCourseCategoryByIDAsync
};