const initArtCateList = () => {
  $.ajax({
    type: "GET",
    url: "/my/article/cates",
    data: null,
    success: (res) => {
      const htmlStr = template("tpl-table", res);
      $("tbody").empty().html(htmlStr);
    },
  });
};

initArtCateList();

const form = layui.form;
let indexAdd = null;
$("#addCateBtn").click(function () {
  indexAdd = layer.open({
    type: 1,
    area: ["500px", "250px"],
    title: "添加文章分类",
    content: $("#dialog-add").html(),
  });
});

$("body").on("submit", "#form-add", function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/my/article/addcates",
    data: $(this).serialize(),
    success: (res) => {
      if (res.status !== 0) return layer.msg("新增分类失败！");
      initArtCateList();
      layer.msg("新增分类成功！");
      layer.close(indexAdd);
    },
  });
});


let index = null
$("#tb").on("click", ".btn-edit", function () {
  index = layer.open({
    type: 1,
    area: ["500px", "250px"],
    title: "添加文章分类",
    content: $("#dialog-edit").html(),
  });
  let id = $(this).attr("data-id");
  console.log(id);
  $.ajax({
    type:'GET',
    url:'/my/article/cates/'+id,
    success:res => {
      console.log(res.data);
      form.val("form-edit", res.data);
    }
  })
});

$('body').on('submit','#form-edit',function(e){
  e.preventDefault()
  $.ajax({
    type:'POST',
    url:'/my/article/updatecate',
    data:form.val('form-edit'),
    success:res =>{
      const {message,status} = res
      layer.msg(message)
      if(status!==0) return
      layer.close(index)
      initArtCateList()
    }
  })
})

$("#tb").on("click", ".btn-delete", function () {
  const id = $(this).attr("data-id");
  // 提示用户是否删除
  layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
          method: "GET",
          url: "/my/article/deletecate/" + id,
          success: function (res) {
              if (res.status !== 0) {
                  return layer.msg("删除分类失败！");
              }
              layer.msg("删除分类成功！");
              layer.close(index);
              initArtCateList();
          },
      });
  });
});