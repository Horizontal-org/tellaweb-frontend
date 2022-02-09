import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { ReportPage } from "packages/ui";
import { toReport } from "../../common/toReport";
import { usePlocState } from "../../common/usePlocState";
import { usePloc } from "../_app";
import { useToast } from "../../components/ToastWrapper";
import { useAuthRequired } from "packages/state/features/auth/authHooks";
import {
  useDeleteMutation,
  useLazyGetByIdQuery,
  useEditReportMutation
} from "packages/state/services/reports";

export const ReportById = () => {
  useAuthRequired();

  const router = useRouter();

  const reportId = useMemo(() => {
    if (router.query?.reportId && typeof router.query.reportId !== "string")
      return router.query.reportId.toString();
    return router.query.reportId as string;
  }, [router.query?.reportId]);

  const { file: filePloc } = usePloc();
  const fileState = usePlocState(filePloc);
  const handleToast = useToast();

  const [loadReport, { data: currentReport }] = useLazyGetByIdQuery();
  const [deleteReport, {}] = useDeleteMutation();
  const [editReport, editReportResult] = useEditReportMutation()

  useEffect(() => {
    reportId && loadReport(reportId);
  }, [reportId, loadReport]);

  useEffect(() => {
    if (editReportResult.isSuccess) {
      handleToast("Title updated!", "info");
      loadReport(reportId)
    }
    if (editReportResult.error && "status" in editReportResult.error) {
      handleToast(editReportResult.error.data.message, "danger");
    }
  }, [editReportResult.status]);

  useEffect(() => {
    if (fileState.kind === "DeletedFileState") {
      loadReport(reportId);
    }
  }, [fileState.kind]);

  return currentReport ? (
    <ReportPage
      report={toReport(currentReport)}
      onDeleteFile={(_, file) => {
        if (file) {
          filePloc.delete(file);
          handleToast("File deleted");
        }
      }}
      onDownloadFile={(file) => {
        filePloc.donwload(file);
      }}
      onEditTitle={(title) => {
        editReport({
          id: currentReport.id,
          title: title,
          description: null
        })
      }}
      onDeleteReport={async (report) => {
        const result = await deleteReport(report.id);
        if ("data" in result) {
          handleToast("Report deleted");
          router.back();
        }
        //add error tast
      }}
      onClose={() => {
        router.back();
      }}
    />
  ) : null;
};

export default ReportById;
