import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Loading from "../loading";
import { Form, Card } from "react-bootstrap";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

import { Modal, Pagination, Button, Select, Spin } from "antd";
import ButtonLoading from "../../partials/common/ButtonLoading";
import makeRequest from "../../libs/request";
import ShowFormAnswer from "./ShowFormAnswer";
import "../form/table.css";
import "../form/Form.scss";
import "../form/ShowFormSurvey.scss";

const { Option } = Select;

const useStyles1 = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
}));

const ListAnswers = (props) => {
  const classes1 = useStyles1();
  const rowsPerPage = 10;
  const [page, setPage] = useState(1);
  const [rows, setRow] = useState([]);
  const [dataSearch, setDataSearch] = useState({});
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [isSearchRound, setIsSearchRound] = useState(false);
  const [listRound, setListRound] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const [isSearchForm, setIsSearchForm] = useState(false);
  const [listForm, setListForm] = useState([]);
  const [textSearchForm, setTextSearchForm] = useState('');
  const [isLoadDetail, setLoadDetail] = useState(false);

  useEffect(() => {
    searchSurveyRound('');
  }, []);

  const handleChangePage = (newPage) => {
    setPage(newPage);
    searchUserForm({ ...dataSearch, page: newPage, limit: rowsPerPage });
  };
  const searchUserForm = (dataSearch = {}) => {
    setLoading(true);
    makeRequest("get", `userform/getAll`, dataSearch)
      .then(({ data }) => {
        if (data.signal) {
          const { count, rows } = data.data.rows;
          setRow(rows);
          setTotal(count);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const detailAnswer = (e, organization_id, survey_round_id, user_id) => {
    setShowDetail(true);
    setLoadDetail(true);
    e = window.event || e;
    e.preventDefault();
    makeRequest("get", `userform/getUserAnswerForm`, { organization_id, survey_round_id, user_id })
      .then(({ data }) => {
        if (data.data) {
          let dataObj = data.data.organization;
          dataObj.survey_headers.survey_sections =
            dataObj.survey_headers.survey_sections.sort((a, b) => { return a.index - b.index });

          dataObj.survey_headers.survey_sections = dataObj.survey_headers.survey_sections.map(item => {
            item.questions = item.questions.sort((a, b) => { return a.index - b.index });

            item.questions = item.questions.map(itemQuestion => {
              if (itemQuestion.question_choice && itemQuestion.question_choice.length > 0) {
                itemQuestion.question_choice = itemQuestion.question_choice.sort((a, b) => { return a.index - b.index });
              }
              return itemQuestion;
            });

            item.questions = item.questions.map(itemQuestion => {
              if (itemQuestion.question_columns && itemQuestion.question_columns.length > 0) {
                itemQuestion.question_columns = itemQuestion.question_columns.sort((a, b) => { return a.index - b.index });
              }
              return itemQuestion;
            });

            item.questions = item.questions.map(itemQuestion => {
              if (itemQuestion.question_row && itemQuestion.question_row.length > 0) {
                itemQuestion.question_row = itemQuestion.question_row.sort((a, b) => { return a.index - b.index });
              }
              return itemQuestion;
            });
            return item;
          });

          dataObj.survey_sections = dataObj.survey_headers.survey_sections;
          dataObj.survey_headers.survey_sections = null;
          let dataForm = { organization: dataObj };
          let position = JSON.parse(dataForm.organization.survey_headers.position);
          dataForm.organization.survey_headers.position = position;
          dataForm.listOptions = data.data.listOptions;
          dataForm.listAnswers = data.data.listAnswers;
          setDataDetail(dataForm);
          setLoadDetail(false);
        }
      })
      .catch((err) => {
        setLoadDetail(false);
      });
  };

  const searchSurveyRound = (value) => {
    setListRound([]);
    setIsSearchRound(true);
    makeRequest("get", `surveyrounds/searchSurRounds`, {
      title: value,
      limit: 10,
    })
      .then(({ data }) => {
        if (data.signal) {
          let arrSurRound = data.data.rows.map((it) => {
            return {
              label: `${it.title}`,
              value: it.id,
            };
          });

          setListRound(arrSurRound);
          setIsSearchRound(false);
          setTextSearch(value);
        }
      })
      .catch((err) => {

      });
  };

  const searchForm = (value) => {
    setListForm([]);
    setIsSearchForm(true);
    makeRequest("get", `userform/getFormByRound`, {
      survey_round_id: dataSearch.survey_round_id,
      title: value,
      limit: 10
    })
      .then(({ data }) => {
        if (data.signal) {
          let arrForm = data.data.rows.map((it) => {
            return {
              label: `${it.title}`,
              value: it.id,
            };
          });

          setListForm(arrForm);
          setIsSearchForm(false);
          setTextSearchForm(value);
        }
      })
      .catch((err) => {

      });
  };

  const onChangeSurveyRound = (value) => {
    setDataSearch({
      ...dataSearch,
      survey_round_id: value,
      form_id: ''
    });

    searchUserForm({ survey_round_id: value, page: 1, limit: rowsPerPage });
  };

  const onChangeForm = (value) => {
    setDataSearch({
      ...dataSearch,
      form_id: value
    });

    searchUserForm({ survey_round_id: dataSearch.survey_round_id, form_id: value, page: 1, limit: rowsPerPage });
  };

  const unfilteredData = (e) => {
    setDataSearch({});
    setPage(1);
    setRow([]);
  };

  const onChangeValue = (e) => {
    e = window.event || e;
    e.preventDefault();

    setDataSearch({
      ...dataSearch,
      name: e.target.value
    })
  }

  const searchByNameUser = (e) => {
    e = window.event || e;
    e.preventDefault();
    searchUserForm({ survey_round_id: dataSearch.survey_round_id, form_id: dataSearch.form_id, name: dataSearch.name, page: 1, limit: rowsPerPage });
  }

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="kt-section">
            <div className="kt-section__content border-table-default">
              <Paper className={classes1.root}>
                <div className="col-md-12">
                  <Form>
                    <div className="form-row">
                      <div className="form-group col-md-3">
                        <div className="form-group">
                          <Select
                            showSearch
                            value={dataSearch.survey_round_id || "Nhập và chọn tên đợt"}
                            notFoundContent={
                              isSearchRound ? (
                                <Spin size="small" />
                              ) : textSearch ? (
                                "Không có dữ liệu"
                              ) : null
                            }
                            filterOption={false}
                            onSearch={searchSurveyRound}
                            onChange={onChangeSurveyRound}
                            style={{ width: "100%" }}
                          >
                            {listRound.map((u) => (
                              <Option
                                key={`child-distri-${u.value}`}
                                value={u.value}
                              >
                                {u.label}
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </div>
                      {dataSearch.survey_round_id && <div className="form-group col-md-3">
                        <div className="form-group">
                          <Select
                            showSearch
                            value={dataSearch.form_id || "Nhập và chọn tên form"}
                            notFoundContent={
                              isSearchForm ? (
                                <Spin size="small" />
                              ) : textSearchForm ? (
                                "Không có dữ liệu"
                              ) : null
                            }
                            filterOption={false}
                            onSearch={searchForm}
                            onChange={onChangeForm}
                            style={{ width: "100%" }}
                          >
                            {listForm.map((u) => (
                              <Option
                                key={`child-distri-${u.value}`}
                                value={u.value}
                              >
                                {u.label}
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </div>}
                      {dataSearch.form_id && <div className="form-group col-md-3">
                        <div className="form-group">
                          <Form.Control
                            type="text"
                            placeholder="Tên người trả lời"
                            value={dataSearch.name || ""}
                            focus={true}
                            onChange={e => onChangeValue(e)}
                          />
                        </div>
                      </div>}
                      <div className="form-group col-md-3">
                        <div className="form-group" style={{ display: "flex" }}>
                          <button
                            className="btn btn-label-primary btn-bold btn-sm btn-icon-h kt-margin-l-10"
                            onClick={unfilteredData}
                            style={{ marginLeft: 10, marginTop: 3 }}
                            type="button"
                          >
                            <span>Bỏ lọc</span>
                          </button>

                          <ButtonLoading
                            type="submit"
                            className="btn btn-label-primary btn-bold btn-sm btn-icon-h kt-margin-l-10"
                            loading={isLoading}
                            style={{ marginLeft: 10, marginTop: 3 }}
                            onClick={e => searchByNameUser(e)}
                          >
                            <span>Tìm kiếm</span>
                          </ButtonLoading>
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
                {isLoading ? (
                  <Loading />
                ) : (
                    <Table className={classes1.table} style={{ marginLeft: '10px' }}>
                      <TableHead>
                        <TableRow>
                          <TableCell className="fixed_col_table">Tên người trả lời </TableCell>
                          <TableCell>Đợt khảo sát </TableCell>
                          <TableCell>Form </TableCell>
                          <TableCell style={{ width: 150 }}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows && rows.length ? (
                          rows.map((row, key) => (
                            <TableRow key={`answers-${key}`}>
                              <TableCell>{row.users.name}</TableCell>
                              <TableCell>
                                {row.survey_round && row.survey_round.title}
                              </TableCell>
                              <TableCell>
                                {row.organization && row.organization.title}
                              </TableCell>
                              <TableCell>
                                <div className="mg-b5">
                                  <span
                                    style={{ cursor: "pointer" }}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Xem chi tiết"
                                  >
                                    <Icon
                                      className="fa fa-info-circle"
                                      onClick={(e) => {
                                        detailAnswer(e, row.organization.id, row.survey_round.id, row.users.id);
                                      }}
                                      style={{
                                        color: "#0000ff",
                                        fontSize: 15,
                                        marginLeft: 15,
                                      }}
                                    />
                                  </span>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                            <TableRow>
                              <TableCell colSpan={10} align="center">
                                Không có dữ liệu
													</TableCell>
                            </TableRow>
                          )}
                      </TableBody>
                    </Table>
                  )}
                {total > rowsPerPage && (
                  <div className="custom-svg customSelector">
                    <Pagination
                      className="pagination-crm"
                      current={page}
                      pageSize={rowsPerPage}
                      total={total}
                      onChange={(p, s) => handleChangePage(p)}
                    />
                  </div>
                )}
              </Paper>
            </div>

            <Modal
              title="Chi tiết answers"
              visible={showDetail}
              width="280mm"
              style={{ top: 20 }}
              onCancel={() => setShowDetail(false)}
              footer={[
                <Button type="primary" key={`btn-answers-modal`} onClick={() => setShowDetail(false)}>
                  OK
								</Button>
              ]}
              className="modal-model-detail-form"
            >
              {isLoadDetail ? (
                <Loading />
              ) : (
                  <div className="form-group form-view-detail">
                    <Card>
                      <ShowFormAnswer dataDetail={dataDetail} />
                    </Card>
                  </div>
                )}
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

export default connect(mapStateToProps, null)(ListAnswers);
