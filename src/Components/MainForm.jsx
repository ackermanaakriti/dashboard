import React from "react";
import * as Yup from "yup";
import '../Styles/MainForm.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
const MainForm = ({ initial, schema, submit, formName ,settings }) => {
  return (
    <section className="form-section">
        <h2>Add {formName}</h2>
      <div className="form-wrapper">
        <Formik
          initialValues={initial}
          validationSchema={schema}
          onSubmit={submit}
        >
          {(formik) => (
            <Form className="form" onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-2 gap-8">
             
                <div>
                  <div className="grid grid-cols-2 gap-[20px]">
                {settings.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className={`col-span-${item?.class}`}>
                      <div className="form-group" key={index}>
                        <label htmlFor="" className="form-label block text-[20px]">
                          {item?.label}
                        </label>
                        {item?.as === "select" && item?.option && (<Field 
                            as={item?.as || null}
                            type={item?.type || null}
                            className="form-control "
                            onChange={formik.handleChange}
                            placeholder={item?.name}
                            name={item?.name}
                            defaultValue="DEFAULT"
                          >
                            <>
                            <option value="DEFAULT" disabled>Selected</option>
                              {item?.option?.map((item, index) => (
                                <option value={item?.name} key={index}>
                                  {item?.name}
                                </option>
                              ))}
                            </>
                          </Field>)
                           ||
                           (item?.as === 'radio' && <Field />) 
                           ||  
                        
                        (item?.type === 'file' && <Field as={item?.as || null}
                        type={item?.type}
                       
                        className="form-control fileinput  "
                        onChange={formik.handleChange}
                        placeholder={item?.name}
                        name={item?.name} />) 
                        || 
                        (item?.as === 'input' || (item?.as === 'textarea') && <Field as={item?.as || null}
                        type={item?.type || null}
                       
                        className="form-control inputfield "
                        onChange={formik.handleChange}
                        placeholder={item?.name}
                        name={item?.name} />) 
                                        
}
                        

                        <ErrorMessage
                          component="div"
                          name={item?.name}
                          className="error"
                          Style="color:red;"
                        />
                      </div>
                    </div>
                  </React.Fragment>
                ))}
                </div>
                </div>
                <div></div>
             
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default MainForm;
